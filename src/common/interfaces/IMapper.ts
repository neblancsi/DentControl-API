import { BaseEntity } from 'typeorm';
import { DomainEntity } from '../types/DomainEntity';

export interface IMapper {
  DomainToDTOMapper(result: BaseEntity[] | BaseEntity);
  DTOtoDomainMapper(dto): DomainEntity[] | DomainEntity;
}
