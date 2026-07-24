import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, QueryFailedError, Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { Usuario } from './../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
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
    });

    if (usuario.length === 0) {
      throw new BadRequestException('Usuario não encontrado');
    }

    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: {
        email: createUsuarioDto.email,
      },
    });

    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este e-mail.');
    }

    try {
      const novoUsuario = this.usuarioRepository.create(createUsuarioDto);
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

    Object.assign(usuario, updateUsuarioDto);

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findById(id);

    await this.usuarioRepository.remove(usuario);
  }
}
