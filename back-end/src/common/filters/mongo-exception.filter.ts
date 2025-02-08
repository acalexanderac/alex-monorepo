import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Error interno del servidor';

    switch (exception.code) {
      case 11000: // Duplicate key
        status = 400;
        message = 'Ya existe un registro con estos datos';
        break;
      default:
        status = 500;
        message = 'Error en la base de datos';
    }

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        error: exception.name,
        timestamp: new Date().toISOString(),
      });
  }
} 