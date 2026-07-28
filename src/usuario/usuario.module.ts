import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from '../empresa/empresa.module';
import { UsuarioController } from './controllers/usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './service/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), EmpresaModule],
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
