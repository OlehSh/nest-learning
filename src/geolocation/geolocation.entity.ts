import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('geolocations')
export class Geolocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'geography', srid: 4326 })
  location: string;

  @Column({ type: 'varchar', length: 100 })
  location_type: string;

  @CreateDateColumn({ type: 'timestamptz', default: Date.now() })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now() })
  updatedAt: Date;
}
