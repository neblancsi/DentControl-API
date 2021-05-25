import { BaseEntity } from 'typeorm';

export interface IRepository {
  Create(arg): Promise<void>;
  GetAll(): Promise<BaseEntity[]>;
  GetByID(arg): Promise<BaseEntity>;
}
