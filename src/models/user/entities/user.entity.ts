import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenderType } from '../constants/gender-type.type';
import { UserBase } from '../interfaces/user-base.interface';

/**
 * @class User
 * user entity-scheme
 */
@Entity({
  name: 'user',
})
export class User implements UserBase {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'char', length: 255 })
  email: string;

  @Column({ type: 'char', length: 10 })
  name: string;

  @Column({ type: 'char', length: 10 })
  nickName: string;

  @Column()
  gender: GenderType;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'char', length: 13 })
  phone: string;
}
