import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleUsuario } from '../enums/usuarioRole.enum';
import { StatusUsuario } from '../enums/usuarioStatus.enum';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(2, 255, { message: 'O nome deve ter entre 2 e 200 caracteres ' })
  nome!: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @Transform(({ value }) => String(value).trim().toLowerCase())
  email!: string;

  @IsString()
  @MinLength(12, { message: 'A senha deve ter no mínimo 12 caracteres' })
  @MaxLength(64, { message: 'A senha deve ter no máximo 64 caracteres' })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W))/, {
    message:
      'A senha deve conter ao menos 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial',
  })
  senha!: string;

  @IsEnum(RoleUsuario, {
    message: 'Cargo inválido.',
  })
  roleUsuario!: RoleUsuario;

  @IsEnum(StatusUsuario, {
    message: 'Status inválido.',
  })
  statusUsuario!: StatusUsuario;

  @IsNotEmpty({ message: 'A empresa é obrigatória' })
  @IsUUID('4', { message: 'ID da empresa inválido' })
  empresaId!: string;
}
