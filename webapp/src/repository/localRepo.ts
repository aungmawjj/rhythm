import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Routine, RoutineRecord, User } from '../types';

const StoreKeyValue = 'KeyValue';
const StoreRoutine = 'Routine';
const StoreRoutineRecord = 'RoutineRecord';

const IndexUserId = 'UserId';
const IndexUserIdDateTime = 'UserIdDateTime';

const KeyCurrentUser = 'CurrentUser';

interface RhythmDBSchema extends DBSchema {
  [StoreKeyValue]: { key: string; value: unknown };
  [StoreRoutine]: {
    key: string;
    value: Routine;
    indexes: { [IndexUserId]: [string] };
  };
  [StoreRoutineRecord]: {
    key: string;
    value: RoutineRecord;
    indexes: { [IndexUserIdDateTime]: [string, number] };
  };
}

function putCurrentUser(user: User): Promise<void> {
  return withDB(async (db) => {
    await db.put(StoreKeyValue, user, KeyCurrentUser);
  });
}

function getCurrentUser(): Promise<User | undefined> {
  return withDB((db) => {
    return db.get(StoreKeyValue, KeyCurrentUser) as Promise<User | undefined>;
  });
}

function deleteCurrentUser(): Promise<void> {
  return withDB((db) => {
    return db.delete(StoreKeyValue, KeyCurrentUser);
  });
}

function putRoutine(routine: Routine): Promise<void> {
  return withDB(async (db) => {
    await db.put(StoreRoutine, routine);
  });
}

function getRoutines(userId: string): Promise<Routine[]> {
  return withDB(async (db) => {
    return db.getAllFromIndex(
      StoreRoutine,
      IndexUserId,
      IDBKeyRange.only(userId)
    );
  });
}

function putRoutineRecord(record: RoutineRecord): Promise<void> {
  return withDB(async (db) => {
    await db.put(StoreRoutineRecord, record);
  });
}

function getRoutineRecords(
  userId: string,
  start: number,
  end: number
): Promise<RoutineRecord[]> {
  return withDB(async (db) => {
    return db.getAllFromIndex(
      StoreRoutineRecord,
      IndexUserIdDateTime,
      IDBKeyRange.bound([userId, start], [userId, end])
    );
  });
}

async function withDB<R>(
  cb: (_: IDBPDatabase<RhythmDBSchema>) => Promise<R>
): Promise<R> {
  const db = await openDB<RhythmDBSchema>('Rhythm', 1, {
    upgrade: onUpgradeDB,
  });
  try {
    return cb(db);
  } finally {
    db.close();
  }
}

function onUpgradeDB(db: IDBPDatabase<RhythmDBSchema>) {
  db.createObjectStore(StoreKeyValue);
  const routineStore = db.createObjectStore(StoreRoutine, { keyPath: 'Id' });
  const recordStore = db.createObjectStore(StoreRoutineRecord, {
    keyPath: 'Id',
  });
  routineStore.createIndex(IndexUserId, 'UserId', { unique: false });
  recordStore.createIndex(IndexUserIdDateTime, ['UserId', 'DateTime'], {
    unique: false,
  });
}

export default {
  putCurrentUser,
  getCurrentUser,
  deleteCurrentUser,
  putRoutine,
  getRoutines,
  putRoutineRecord,
  getRoutineRecords,
};
