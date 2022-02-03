import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  defaultErr: Record<string, ExceptionModel> = {
    Unauthorized: new ExceptionModel('E1111', '토큰이 만료되었습니다'),
    'Not Found': new ExceptionModel('E4444', '경로를 찾을 수 없습니다'),
    'Bad Request': new ExceptionModel(
      'E3333',
      '입력하신 정보가 올바르지 않습니다',
    ),
    'Internal Server Error': new ExceptionModel(
      'E9999',
      '알 수 없는 에러가 발생했습니다',
    ),
  };

  catch(exception, host: ArgumentsHost) {
    console.log("Error: ", exception);

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception instanceof HttpException) {
      const responseModel = exception.getResponse();
      const statusCode = exception.getStatus();

      let resModel: ExceptionModel;

      if (responseModel instanceof ExceptionModel) {
        resModel = responseModel;
      } else {
        const message = responseModel['error'] ?? exception.message;
        resModel =
          this.defaultErr[message] ?? this.defaultErr['Internal Server Error'];
      }

      res
        .status(statusCode)
        .json(resModel.setStatus(statusCode));
    } else {
      res
        .status(500)
        .json(this.defaultErr['Internal Server Error'].setStatus(500));
    }
  }
}

export class ExceptionModel {
  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  setStatus(statusCode: number): ExceptionModel {
    this.statusCode = statusCode;
    return this;
  }

  statusCode: number;
  code: string;
  message: string;
}
