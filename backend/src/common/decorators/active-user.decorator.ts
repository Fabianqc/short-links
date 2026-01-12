// we use this decorator to get the active user from the request
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// we create function for getting data from the request
export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    //get request from the context
    const request = ctx.switchToHttp().getRequest();
    //return user from the request
    return request.user;
  },
);