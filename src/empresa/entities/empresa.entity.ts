import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_empresa' })
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'nome_fantasia', type: 'varchar', length: 255 })
  nomeFantasia!: string;
}
