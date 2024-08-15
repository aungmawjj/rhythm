type User = {
  Id: string;
  Name: string;
  Email: string;
};

type Routine = {
  Id: string;
  Name: string;
  When: string;
  Note: string;
};

type RoutineRecord = {
  Id: string;
  Timestamp: number;
  UserId: string;
  RoutineId: string;
  RoutineName: string;
  When: string;
  Note: string;
};

export { type Routine, type RoutineRecord, type User };
