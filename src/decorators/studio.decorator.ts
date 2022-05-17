
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { StudioCreateBody } from 'src/dto/studio-create.body';

export const Studio = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    const body = JSON.parse(request.body.data);
    return body;
});
