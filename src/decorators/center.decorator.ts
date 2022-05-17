

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateCenterDto } from 'src/dto/center-create.body';

export const Center = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body: CreateCenterDto = JSON.parse(request.body.data);
    return body;
});
