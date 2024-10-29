import { Satellite } from 'src/satellite/satellite.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CspHeader } from '../csp-header/csp-header.entity';

@Entity('telemetry_packet')
export class TelemetryPacket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CspHeader)
  @JoinColumn({ name: 'csp_header_id' })
  csp_header: CspHeader;

  @ManyToOne(() => Satellite)
  @JoinColumn({ name: 'satellite_id' })
  satellite: Satellite;

  @Column({ name: 'satellite_id' })
  satellite_id: string;

  @Column({ type: 'real' })
  temperature: number;

  @Column({ type: 'real' })
  battery_voltage: number;

  @Column({ type: 'real' })
  altitude: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value, // Store as is
      from: (value: string) => parseInt(value, 10), // Convert to number when retrieving
    },
  })
  created_at: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value, // Store as is
      from: (value: string) => parseInt(value, 10), // Convert to number when retrieving
    },
  })
  epoch_timestamp: number;
}
