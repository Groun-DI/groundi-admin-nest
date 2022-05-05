
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DateFilterDto } from 'src/dto/date-filter.body';


export const DateFilter = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const result = new DateFilterDto();
    result.startDate = request.query.startDate;
    result.endDate = request.query.endDate;

    return result;
});
