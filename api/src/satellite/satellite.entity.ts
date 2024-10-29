import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Satellite {
  @PrimaryColumn('int4')
  id: number;
}
