import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { GeographyLocation } from './interfaces/GeographyLocation';
import { GEOLOCATION_TYPE } from './geoloaction.constants';

@Entity('geolocations')
export class Geolocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'geography', srid: 4326 })
  location: GeographyLocation;

  @Column({ type: 'varchar', length: 100 })
  location_type: GEOLOCATION_TYPE;

  @CreateDateColumn({ type: 'timestamptz', default: Date.now() })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now() })
  updatedAt: Date;
}
