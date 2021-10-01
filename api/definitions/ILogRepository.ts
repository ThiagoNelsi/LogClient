export interface ILogRepository {
  create(log: string): void;
  list(): Promise<string[]>;
}
