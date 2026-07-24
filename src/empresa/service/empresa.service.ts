import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  ILike,
  Like,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { FiltroPeriodoDto } from '../dtos/filters/filtro-periodo.dto';
import { FiltroEmpresaDto } from '../dtos/filters/filtro.empresa.dto';
import { UpdateEmpresaDto } from '../dtos/update-empresa.dto';
import { Empresa } from '../entities/empresa.entity';
import { TipoPessoa } from '../enums/tipoPessoa.enum';
import { CreateEmpresaDto } from './../dtos/create-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find({
      order: {
        dataCriacao: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({
      where: {
        id,
      },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return empresa;
  }

  async findByName(nome: string): Promise<Empresa[]> {
    const empresas = await this.empresaRepository.find({
      where: [
        { nomeFantasia: ILike(`%${nome}%`) },
        { razaoSocial: ILike(`%${nome}%`) },
      ],

      order: {
        dataCriacao: 'DESC',
      },
    });

    if (empresas.length === 0) {
      throw new NotFoundException('Nenhuma empresa Encontrada');
    }

    return empresas;
  }

  async findByContact(contato: string): Promise<Empresa[]> {
    const empresas = await this.empresaRepository.find({
      where: [
        { telefone: Like(`%${contato}%`) },
        { email: ILike(`%${contato}%`) },
      ],

      order: {
        dataCriacao: 'DESC',
      },
    });

    if (empresas.length === 0) {
      throw new NotFoundException('Nenhuma empresa Encontrada');
    }

    return empresas;
  }

  async filter(filtro: FiltroEmpresaDto): Promise<Empresa[]> {
    const where: FindOptionsWhere<Empresa> = {};

    if (filtro.documento) {
      where.documento = filtro.documento;
    }

    if (filtro.tipoPessoa) {
      where.tipoPessoa = filtro.tipoPessoa;
    }

    return this.empresaRepository.find({
      where,
      order: {
        dataCriacao: 'DESC',
      },
    });
  }

  async findByPeriod(filtro: FiltroPeriodoDto): Promise<Empresa[]> {
    const dataInicio = new Date(filtro.dataInicio);
    const dataFim = filtro.dataFim ? new Date(filtro.dataFim) : new Date();

    const empresas = await this.empresaRepository.find({
      where: {
        dataCriacao: Between(dataInicio, dataFim),
      },
      order: { dataCriacao: 'DESC' },
    });

    if (empresas.length === 0) {
      throw new NotFoundException(
        'Nenhuma empresa encontrada no período informado.',
      );
    }

    return empresas;
  }
  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    const empresaExistente = await this.empresaRepository.findOne({
      where: [
        { documento: createEmpresaDto.documento },
        { email: createEmpresaDto.email },
      ],
    });

    if (empresaExistente) {
      throw new ConflictException(
        'Já existe uma empresa com esté documento ou email',
      );
    }

    try {
      const novaEmpresa = this.empresaRepository.create(createEmpresaDto);
      return await this.empresaRepository.save(novaEmpresa);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (error as any).driverError.code === '23505' // Error PostgresSQL
      ) {
        throw new ConflictException(
          'Já existe uma empresa com esté documento ou email',
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    const empresa = await this.findById(id);

    const tipoPessoaFinal = updateEmpresaDto.tipoPessoa ?? empresa.tipoPessoa;
    const documentoFinal = updateEmpresaDto.documento ?? empresa.documento;

    if (
      tipoPessoaFinal === TipoPessoa.PESSOA_JURIDICA &&
      documentoFinal.length !== 14
    ) {
      throw new BadRequestException(
        'Para atualizar para Pessoa Jurídica, informe o documento completo com 14 dígitos (CNPJ).',
      );
    }

    if (
      tipoPessoaFinal === TipoPessoa.PESSOA_FISICA &&
      documentoFinal.length !== 11
    ) {
      throw new BadRequestException(
        'Para atualizar para Pessoa Física, informe o documento com 11 dígitos (CPF), sem os dígitos extras do CNPJ.',
      );
    }

    if (
      updateEmpresaDto.documento &&
      updateEmpresaDto.documento !== empresa.documento
    ) {
      const documentoExiste = await this.empresaRepository.exists({
        where: {
          documento: updateEmpresaDto.documento,
        },
      });

      if (documentoExiste) {
        throw new ConflictException('Documento já cadastrado.');
      }
    }

    if (updateEmpresaDto.email && updateEmpresaDto.email !== empresa.email) {
      const emailExiste = await this.empresaRepository.exists({
        where: {
          email: updateEmpresaDto.email,
        },
      });

      if (emailExiste) {
        throw new ConflictException('E-mail já cadastrado.');
      }
    }

    Object.assign(empresa, updateEmpresaDto);

    return await this.empresaRepository.save(empresa);
  }

  async remove(id: string): Promise<void> {
    const empresa = await this.findById(id);

    await this.empresaRepository.remove(empresa);
  }
}
