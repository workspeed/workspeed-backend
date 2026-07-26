import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function DataMaiorOuIgual(
  campoComparacao: string,
  opcoesValidacao?: ValidationOptions,
) {
  return function (objeto: object, nomePropriedade: string) {
    registerDecorator({
      name: 'dataMaiorOuIgual',
      target: objeto.constructor,
      propertyName: nomePropriedade,
      constraints: [campoComparacao],
      options: opcoesValidacao,

      validator: {
        validate(valor: unknown, argumentos: ValidationArguments) {
          const [nomeCampoComparacao] = argumentos.constraints;

          const valorCampoComparacao = (
            argumentos.object as Record<string, unknown>
          )[nomeCampoComparacao];

          if (!valor || !valorCampoComparacao) {
            return true;
          }

          return (
            new Date(valor as string) >=
            new Date(valorCampoComparacao as string)
          );
        },
      },
    });
  };
}
