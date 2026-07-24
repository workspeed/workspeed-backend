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
export class Usuario {
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
    name: 'role_usuario',
    type: 'enum',
    enum: RoleUsuario,
  })
  roleUsuario!: RoleUsuario;

  @Column({
    name: 'status_usuario',
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
