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
  QueryFailedError,
  Repository,
} from 'typeorm';
import { FiltroPeriodoDto } from '../../common/dtos/filtro-periodo.dto';
import { EmpresaService } from '../../empresa/service/empresa.service';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { FiltroUsuarioDto } from '../dtos/filters/filtro-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { Usuario } from './../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly empresaService: EmpresaService,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: { empresa: true },
      order: {
        dataCriacao: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: { empresa: true },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario não encontrado');
    }

    return usuario;
  }

  async findByName(nome: string): Promise<Usuario[]> {
    nome = nome.trim();

    const usuario = await this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: { empresa: true },
      order: {
        dataCriacao: 'DESC',
      },
    });

    if (usuario.length === 0) {
      throw new BadRequestException('Usuario não encontrado');
    }

    return usuario;
  }

  async filter(filtro: FiltroUsuarioDto): Promise<Usuario[]> {
    const where: FindOptionsWhere<Usuario> = {};

    if (filtro.roleUsuario) {
      where.roleUsuario = filtro.roleUsuario;
    }

    if (filtro.statusUsuario) {
      where.statusUsuario = filtro.statusUsuario;
    }

    return this.usuarioRepository.find({
      where,
      relations: { empresa: true },
      order: {
        dataCriacao: 'DESC',
      },
    });
  }

  async findByPeriod(filtro: FiltroPeriodoDto): Promise<Usuario[]> {
    const dataInicio = new Date(filtro.dataInicio);
    const dataFim = filtro.dataFim ? new Date(filtro.dataFim) : new Date();

    const usuarios = await this.usuarioRepository.find({
      where: {
        dataCriacao: Between(dataInicio, dataFim),
      },
      relations: { empresa: true },
    });

    if (usuarios.length === 0) {
      throw new NotFoundException(
        'Nenhum usuário encontrado no período informado',
      );
    }

    return usuarios;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { empresaId, ...dadosUsuario } = createUsuarioDto;

    const empresa = await this.empresaService.findById(empresaId);

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: {
        email: createUsuarioDto.email,
      },
    });

    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este e-mail.');
    }

    try {
      const novoUsuario = this.usuarioRepository.create({
        ...dadosUsuario,
        empresa,
      });
      return await this.usuarioRepository.save(novoUsuario);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (error as any).driverError.code === '23505' // PostgreSQL
      ) {
        throw new ConflictException('Já existe um usuário com este e-mail');
      }

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findById(id);
    const { empresaId, ...dadosUsuario } = updateUsuarioDto;

    if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
      const emailExiste = await this.usuarioRepository.exists({
        where: {
          email: updateUsuarioDto.email,
        },
      });

      if (emailExiste) {
        throw new ConflictException('Já existe um usuário com esse e-mail');
      }
    }

    if (empresaId) {
      usuario.empresa = await this.empresaService.findById(empresaId);
    }

    Object.assign(usuario, dadosUsuario);

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findById(id);

    await this.usuarioRepository.remove(usuario);
  }
}
