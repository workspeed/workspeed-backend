import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoPessoa } from '../../enums/tipoPessoa.enum';

export class FiltroEmpresaDto {
  @IsOptional()
  @IsString()
  documento?: string;

  @IsOptional()
  @IsEnum(TipoPessoa)
  tipoPessoa?: TipoPessoa;
}
