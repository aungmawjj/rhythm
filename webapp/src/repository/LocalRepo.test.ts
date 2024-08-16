import { Routine, RoutineRecord, User } from '../types';
import LocalRepo from './LocalRepo';

const mockUser: User = {
  Id: '123',
  Name: 'Jhon',
  Email: 'fake@example.com',
};

const mockRoutines: Routine[] = [
  {
    Id: '1',
    UserId: mockUser.Id,
    Name: 'exercise',
    LastUpdate: 1,
  },
  {
    Id: '2',
    UserId: mockUser.Id,
    Name: 'sleep',
    LastUpdate: 2,
  },
];

const mockRecords: RoutineRecord[] = [
  {
    Id: '1',
    UserId: mockUser.Id,
    RoutineId: '1',
    RoutineName: 'r1',
    DateTime: 1,
    Timestamp: 1,
  },
  {
    Id: '2',
    UserId: mockUser.Id,
    RoutineId: '2',
    RoutineName: 'r2',
    DateTime: 2,
    Timestamp: 2,
  },
];

describe('CurrentUser', () => {
  test('Get undefined', async () => {
    const user = await LocalRepo.getCurrentUser();
    expect(user).toBeUndefined();
  });

  test('Put User', async () => {
    await LocalRepo.putCurrentUser(mockUser);
    const user = await LocalRepo.getCurrentUser();
    expect(user).toEqual(mockUser);
  });

  test('Delete User', async () => {
    await LocalRepo.deleteCurrentUser();
    const user = await LocalRepo.getCurrentUser();
    expect(user).toBeUndefined();
  });
});

describe('Routine', () => {
  test('No Routines', async () => {
    const routines = await LocalRepo.getRoutines(mockUser.Id);
    expect(routines).toEqual([]);
  });

  test('Put Routine', async () => {
    await LocalRepo.putRoutine(mockRoutines[0]);
    await LocalRepo.putRoutine(mockRoutines[1]);

    const routines = await LocalRepo.getRoutines(mockUser.Id);
    expect(routines.length).toBe(2);
    expect(routines).toContainEqual(mockRoutines[0]);
    expect(routines).toContainEqual(mockRoutines[1]);
  });

  test('Different User', async () => {
    const routines = await LocalRepo.getRoutines('different_user');
    expect(routines).toEqual([]);
  });

  test('Update Routine', async () => {
    const update: Routine = { ...mockRoutines[0], Note: 'some update' };
    await LocalRepo.putRoutine(update);

    const routines = await LocalRepo.getRoutines(mockUser.Id);
    expect(routines.length).toBe(2);
    expect(routines).not.toContainEqual(mockRoutines[0]);
    expect(routines).toContainEqual(mockRoutines[1]);
    expect(routines).toContainEqual(update);
  });
});

describe('Routine Record', () => {
  test('No Records', async () => {
    const records = await LocalRepo.getRoutineRecords(mockUser.Id, 1, 2);
    expect(records).toEqual([]);
  });

  test('Put Record', async () => {
    await LocalRepo.putRoutineRecord(mockRecords[0]);
    await LocalRepo.putRoutineRecord(mockRecords[1]);

    const records = await LocalRepo.getRoutineRecords(mockUser.Id, 1, 2);
    expect(records.length).toBe(2);
    expect(records).toContainEqual(mockRecords[0]);
    expect(records).toContainEqual(mockRecords[1]);
  });

  test('Get By Range', async () => {
    const records = await LocalRepo.getRoutineRecords(mockUser.Id, 0, 1);
    expect(records.length).toBe(1);
  });
});
