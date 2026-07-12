import { Controller, Get } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
  @Get()
  findAll() {
    return 'Usuarios';
  }
}
