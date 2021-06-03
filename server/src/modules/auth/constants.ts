import { configService } from '../config/config.service';

export const jwtConstants = {
  secret: configService.getJwtSecret(),
  cookieName: 'ctx',
  expireIn: 1 * 60 * 60 * 24 * 2, // on sec === 2 days
  refreshTokenKey: 'rtx',
  refreshTokenExpires: 1 * 60 * 60 * 24 * 365 * 10, // 10 years
};
