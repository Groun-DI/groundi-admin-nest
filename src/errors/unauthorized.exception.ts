import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionModel } from '../filter/default-exception.filter';

export class UnauthorizedException extends HttpException {
  constructor(t: UNAUTHORIZED_TYPE) {
    super(t.value, HttpStatus.UNAUTHORIZED);
  }
}

export class UNAUTHORIZED_TYPE {
  static readonly USER_EXIST = new UNAUTHORIZED_TYPE(
    'A0002',
    '이미 존재하는 유저입니다',
  );
  static readonly NO_MEMBER = new UNAUTHORIZED_TYPE(
    'A0003',
    '존재하지 않는 유저입니다',
  );
  static readonly EMAIL_NOT_MATCH = new UNAUTHORIZED_TYPE(
    'A0004',
    '이메일이 일치하는 계정이 없습니다',
  );
  static readonly CODE_NOT_MATCH = new UNAUTHORIZED_TYPE(
    'A0005',
    '인증번호가 틀렸습니다',
  );
  static readonly PASSWORD_NOT_MATCH = new UNAUTHORIZED_TYPE(
    'A0006',
    '비밀번호가 틀렸습니다',
  );
  static readonly CREATE_FIRST = new UNAUTHORIZED_TYPE(
    'A0007',
    '유저를 먼저 생성해주세요',
  );

  constructor(code: string, message: string) {
    this.value = new ExceptionModel(code, message);
  }
  value: ExceptionModel;
}
