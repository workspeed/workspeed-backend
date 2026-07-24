// dtos/filtro-periodo.dto.ts
import { IsDateString, IsOptional } from 'class-validator';

export class FiltroPeriodoDto {
  @IsDateString(
    {},
    { message: 'dataInicio deve ser uma data válida (formato ISO 8601)' },
  )
  dataInicio!: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'dataFim deve ser uma data válida (formato ISO 8601)' },
  )
  dataFim?: string;
}
