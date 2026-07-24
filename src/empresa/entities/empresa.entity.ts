import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoPessoa } from '../enums/tipoPessoa.enum';

@Entity({ name: 'tb_empresa' })
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'nome_fantasia',
    type: 'varchar',
    length: 255,
  })
  nomeFantasia!: string;

  @Column({
    name: 'razao_social',
    type: 'varchar',
    length: 255,
  })
  razaoSocial?: string;

  @Column({
    type: 'varchar',
    length: '14',
    unique: true,
  })
  documento!: string;

  @Column({
    name: 'tipo_pessoa',
    type: 'enum',
    enum: TipoPessoa,
  })
  tipoPessoa!: TipoPessoa;

  @Column({
    type: 'varchar',
    length: 11,
  })
  telefone!: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  email!: string;

  @CreateDateColumn({
    name: 'dt_criacao',
  })
  dataCriacao!: Date;

  @UpdateDateColumn({
    name: 'dt_atualizacao',
  })
  dataAtualizacao!: Date;
}
