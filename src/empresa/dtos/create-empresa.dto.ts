import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { TipoPessoa } from '../enums/tipoPessoa.enum';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(3, 255, {
    message: 'O nome fantasia deve ter entre 3 a 255 caracteres',
  })
  nomeFantasia!: string;

  @IsString()
  @Length(3, 255, {
    message: 'A razão sócial deve ter entre 3 a 255 caracteres',
  })
  razaoSocial?: string;

  @IsString()
  @IsNotEmpty({ message: 'O documento deve ser obrigatório' })
  @Matches(/^(\d{11}|\d{14})$/, {
    message: 'Documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)',
  })
  documento!: string;

  @IsEnum(TipoPessoa, {
    message: 'Tipo inválido.',
  })
  tipoPessoa!: TipoPessoa;

  @IsString({ message: 'O telefone deve ser uma string' })
  @Matches(/^(\d{10}|\d{11})$/, {
    message: 'Telefone deve ter 10 ou 11 dígitos',
  })
  telefone!: string;

  @IsEmail()
  @IsString()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  email!: string;
}
