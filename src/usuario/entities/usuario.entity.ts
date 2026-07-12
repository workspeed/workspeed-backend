import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleUsuario } from '../enums/usuarioRole.enum';
import { StatusUsuario } from '../enums/usuarioStatus.enum';

@Entity({ name: 'tb_usuario' })
export class EntityUsuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  nome!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  senha!: string;

  @Column({
    type: 'enum',
    enum: RoleUsuario,
  })
  roleUsuario!: RoleUsuario;

  @Column({
    type: 'enum',
    enum: StatusUsuario,
    default: StatusUsuario.ATIVO,
  })
  statusUsuario!: StatusUsuario;

  @CreateDateColumn({
    name: 'dt_criacao',
  })
  dataCriacao!: Date;

  @UpdateDateColumn({
    name: 'dt_atualizacao',
  })
  dataAtualizacao!: Date;
}
