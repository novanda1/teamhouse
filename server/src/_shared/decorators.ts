import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/schema/user.schema';

export const GqlUser = createParamDecorator((_, info): User => {
  const req = info.args[2].req;

  return req.user;
});
