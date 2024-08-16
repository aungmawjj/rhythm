type User = {
  Id: string;
  Name: string;
  Email: string;
};

type Routine = {
  Id: string;
  UserId: string;
  Name: string;
  OClock?: number;
  Note?: string;
  LastUpdate: number;
};

type RoutineRecord = {
  Id: string;
  UserId: string;
  DateTime: number;
  RoutineId: string;
  RoutineName: string;
  Note?: string;
  Timestamp: number;
};

export { type Routine, type RoutineRecord, type User };
