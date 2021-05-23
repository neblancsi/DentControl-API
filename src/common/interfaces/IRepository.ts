export interface IRepository {
  Create(arg): Promise<void>;
  GetAll(): Promise<any[]>;
  GetByID(arg): Promise<any>;
}
