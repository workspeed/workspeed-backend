import { IsEnum, IsOptional } from 'class-validator';
import { RoleUsuario } from '../../enums/usuarioRole.enum';
import { StatusUsuario } from '../../enums/usuarioStatus.enum';

export class FiltroUsuarioDto {
  @IsOptional()
  @IsEnum(RoleUsuario, {
    message: 'O perfil informado é inválido.',
  })
  roleUsuario?: RoleUsuario;

  @IsOptional()
  @IsEnum(StatusUsuario, {
    message: 'O status informado é invalido',
  })
  statusUsuario?: StatusUsuario;
}
