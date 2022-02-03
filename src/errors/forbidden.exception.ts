import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionModel } from '../filter/default-exception.filter';

export class ForbiddenException extends HttpException {
  constructor(t: FORBIDDEN_TYPE) {
    super(t.value, HttpStatus.FORBIDDEN);
  }
}
export class FORBIDDEN_TYPE {
  static readonly NOT_IMAGE = new FORBIDDEN_TYPE("F0001", "이미지 형식이 올바르지 않습니다");
  static readonly TYPE_ERR = new FORBIDDEN_TYPE("F0002", "형식이 올바르지 않습니다");
  static readonly INVALID_IMAGE_ID = new FORBIDDEN_TYPE("F0003", "유효하지 않은 이미지가 존재합니다");
  static readonly INVALID_IMAGE_COUNT = new FORBIDDEN_TYPE("F0003", "이미지 개수가 다릅니다");
  static readonly IMAGE_NOT_EXIST = new FORBIDDEN_TYPE("F0004", "이미지가 존재하지 않습니다");
  static readonly FAILED_DELETE = new FORBIDDEN_TYPE("F0005", "삭제에 실패했습니다");

  constructor(code: string, message: string) {
    this.value = new ExceptionModel(code, message);
  }
  value:ExceptionModel
}