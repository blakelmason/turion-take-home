import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('csp_header')
export class CspHeader {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint' })
  priority: number;

  @Column({ type: 'smallint' })
  destination: number;

  @Column({ type: 'smallint' })
  source: number;

  @Column({ type: 'smallint' })
  port: number;

  @Column({ type: 'boolean' })
  hmac: boolean;

  @Column({ type: 'boolean' })
  rdp: boolean;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value, // Store as is
      from: (value: string) => parseInt(value, 10), // Convert to number when retrieving
    },
  })
  created_at: number;
}
