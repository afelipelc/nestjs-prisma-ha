import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { ProjectNotFoundException } from '../../../modules/projects/domain/exceptions/project-not-found.exception';
import { NotFoundException } from '../../domain/exceptions/not-found.exception';

@Catch() // Captura todas las excepciones no manejadas
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>(); // Si necesitas el request

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorName = 'InternalServerError';

    if (exception instanceof ProjectNotFoundException || exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND; // 404 Not Found
      message = exception.message;
      errorName = exception.name;
    } else if (exception instanceof HttpException) {
      // Manejar excepciones HTTP de NestJS (ej. BadRequestException, UnauthorizedException)
      status = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null && 'message' in response) {
        message = (response as any).message;
        errorName = (response as any).error || exception.name;
      }
    } else if (exception instanceof Error) {
      // Otras excepciones de JavaScript (ej. TypeError)
      message = exception.message;
      errorName = exception.name;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: errorName,
      timestamp: new Date().toISOString(),
      // path: request.url, // Descomentar si usas `request`
    });
  }
}