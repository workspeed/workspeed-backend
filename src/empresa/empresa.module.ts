import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaController } from './controllers/empresa.controller';
import { Empresa } from './entities/empresa.entity';
import { EmpresaService } from './service/empresa.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  providers: [EmpresaService],
  controllers: [EmpresaController],
  exports: [EmpresaService],
})
export class EmpresaModule {}
