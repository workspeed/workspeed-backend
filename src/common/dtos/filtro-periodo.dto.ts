import { IsDateString, IsOptional } from 'class-validator';
import { DataMaiorOuIgual } from '../decorators/data-maior-ou-igual.decorator';

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
  @DataMaiorOuIgual('dataInicio', {
    message: 'dataFim deve ser maior ou igual a dataInicio',
  })
  dataFim?: string;
}
