import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { JwtAuthService } from '../jwt/jwt.service';
import { GoogleGuard } from './google.guard';
import * as crypto from 'crypto';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtAuthService,
  ) {}
  @Get()
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    if (user) {
      // eslint-disable-next-line
      // @ts-ignore
      const nameParts = user.email.replace(/@.+/, '');
      // Replace all special characters like "@ . _ ";
      const username = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, '');

      await this.userService
        .findOneOrCreate({
          // eslint-disable-next-line
          // @ts-ignore
          displayName: user.firstName + ' ' + user.lastName,
          // eslint-disable-next-line
          // @ts-ignore
          username: username + crypto.randomInt(100, 999),
          // eslint-disable-next-line
          // @ts-ignore
          email: user.email,
        })
        .then((response) => {
          const jwtLogin = this.jwtService.login(response);

          req.user = null;
          // eslint-disable-next-line
          // @ts-ignore
          // eslint-disable-next-line
          res.redirect(
            `${process.env.FE_URL}/?accessToken=${jwtLogin.accessToken}`,
          );
        })
        .catch((err) => {
          throw Error(err);
        });
    }

    return 'hi';
  }
}
