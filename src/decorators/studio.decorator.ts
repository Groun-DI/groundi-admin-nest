
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { StudioCreateBody } from 'src/dto/studio-create.body';

export const Studio = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body: StudioCreateBody = JSON.parse(request.body.data);
    return body;
});
