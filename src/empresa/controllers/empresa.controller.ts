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
import { CreateEmpresaDto } from '../dtos/create-empresa.dto';
import { FiltroPeriodoDto } from '../../common/dtos/filtro-periodo.dto';
import { FiltroEmpresaDto } from '../dtos/filters/filtro-empresa.dto';
import { UpdateEmpresaDto } from '../dtos/update-empresa.dto';
import { Empresa } from '../entities/empresa.entity';
import { EmpresaService } from '../service/empresa.service';

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  crete(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll(): Promise<Empresa[]> {
    return this.empresaService.findAll();
  }

  @Get('/nome')
  findByName(@Query('nome') nome: string): Promise<Empresa[]> {
    return this.empresaService.findByName(nome);
  }

  @Get('/contato')
  findByContact(@Query('contato') contato: string) {
    return this.empresaService.findByContact(contato);
  }

  @Get('/filter')
  filter(@Query() filtro: FiltroEmpresaDto): Promise<Empresa[]> {
    return this.empresaService.filter(filtro);
  }

  @Get('/periodo')
  findByPeriod(@Query() filtro: FiltroPeriodoDto): Promise<Empresa[]> {
    return this.empresaService.findByPeriod(filtro);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.empresaService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresaService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.empresaService.remove(id);
  }
}
