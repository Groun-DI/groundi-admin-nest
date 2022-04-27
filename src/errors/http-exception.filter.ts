import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseBizException, Exceptions } from './http-exceptions';
import { Response } from 'express';

const logger = new Logger('ExceptionHandler');

const commonCatch = (
  exception: HttpException,
  host: ArgumentsHost,
  resModel: ExceptionModel,
) => {
  logger.log(exception.getResponse());

  const ctx = host.switchToHttp();
  const response = ctx.getResponse();

  response.status(resModel.statusCode).json(resModel);
};

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    commonCatch(exception, host, CommonError.unauthorized);
  }
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BaseBizException, host: ArgumentsHost) {
    const responseModel = exception.getResponse();

    logger.log('Error: ', responseModel);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (responseModel instanceof Exceptions)
      response.status(responseModel.statusCode).json(responseModel);
    else
      response
        .status(CommonError.internal.statusCode)
        .json(CommonError.internal);
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    commonCatch(exception, host, CommonError.notFound);
  }
}

@Catch(InternalServerErrorException)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    commonCatch(exception, host, CommonError.notFound);
  }
}

@Catch(BaseBizException)
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: BaseBizException, host: ArgumentsHost) {
    const responseModel = exception.getResponse();

    logger.log('Error: ', responseModel);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (responseModel instanceof Exceptions)
      response.status(responseModel.statusCode).json(responseModel);
    else
      response
        .status(CommonError.internal.statusCode)
        .json(CommonError.internal);
  }
}

@Catch()
export class UnknownFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    logger.log('Unknown Error: ', exception.getResponse());

    host
      .switchToHttp()
      .getResponse<Response>()
      .status(CommonError.internal.statusCode)
      .json(CommonError.internal);
  }
}

class CommonError {
  static unauthorized: ExceptionModel = {
    statusCode: 401,
    message: '토큰이 만료되었습니다',
    code: 'E1111',
  };
  static notFound: ExceptionModel = {
    statusCode: 404,
    message: '경로를 찾을 수 없습니다',
    code: 'E4444',
  };
  static badRequest: ExceptionModel = {
    statusCode: 400,
    message: '입력하신 정보가 올바르지 않습니다',
    code: 'E3333',
  };
  static internal: ExceptionModel = {
    statusCode: 500,
    message: '알 수 없는 에러가 발생했습니다',
    code: 'E9999',
  };
}

export interface ExceptionModel {
  statusCode: number;
  code: string;
  message: string;
}