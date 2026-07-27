import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FiltroPeriodoDto } from '../../common/dtos/filtro-periodo.dto';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { FiltroUsuarioDto } from '../dtos/filters/filtro-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('filter')
  filter(@Query() filtro: FiltroUsuarioDto): Promise<Usuario[]> {
    return this.usuarioService.filter(filtro);
  }

  @Get('periodo')
  findByPeriod(@Query() filtro: FiltroPeriodoDto): Promise<Usuario[]> {
    return this.usuarioService.findByPeriod(filtro);
  }

  @Get('nome/:nome')
  findByName(@Param('nome') nome: string) {
    return this.usuarioService.findByName(nome);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.remove(id);
  }
}
