import { configService } from 'src/config/config.service';

export const jwtConstants = {
  secret: configService.getJwtSecret(),
  cookieName: 'ctx',
  expireIn: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
};
