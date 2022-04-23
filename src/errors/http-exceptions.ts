import { HttpException } from '@nestjs/common';

export class BaseBizException extends HttpException {
  constructor(t: Exceptions) {
    super(t, t.statusCode);
  }
}
export class Exceptions {
  // STUDIO
  static CREATE_STUDIO_FAILED = new Exceptions('SO0000', '스튜디오 생성에 실패했습니다', 403);
  static STUDIO_NOTFOUND = new Exceptions('SO0002', '스튜디오를 찾을 수 없습니다', 404);
  

  // 400
  static NOT_IMAGE = new Exceptions('F0001', '이미지 형식이 올바르지 않습니다', 400);
  static TYPE_ERR = new Exceptions('F0002', '형식이 올바르지 않습니다', 400);
  static INVALID_IMAGE_ID = new Exceptions('F0003', '유효하지 않은 이미지가 존재합니다', 400);
  static INVALID_IMAGE_COUNT = new Exceptions('F0003', '이미지 개수가 다릅니다', 400);
  static IMAGE_NOT_EXIST = new Exceptions('F0004', '이미지가 존재하지 않습니다', 400);
  static FAILED_DELETE = new Exceptions('F0005', '삭제에 실패했습니다', 400);

  // 401
  static USER_EXIST = new Exceptions('A0002', '이미 존재하는 유저입니다', 401);
  static NO_USER = new Exceptions('A0003', '존재하지 않는 유저입니다', 401);
  static EMAIL_NOT_MATCH = new Exceptions('A0004', '이메일이 일치하는 계정이 없습니다', 401);
  static CODE_NOT_MATCH = new Exceptions('A0005', '인증번호가 틀렸습니다', 401);
  static PASSWORD_NOT_MATCH = new Exceptions('A0006', '비밀번호가 틀렸습니다', 401);
  static CREATE_FIRST = new Exceptions('A0007', '유저를 먼저 생성해주세요', 401);

  constructor(code: string, message: string, statusCode: number) {
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
  }

  statusCode: number;
  code: string;
  message: string;
}