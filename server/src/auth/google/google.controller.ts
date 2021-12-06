import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { JwtAuthService } from '../jwt/jwt.service';
import { GoogleGuard } from './google.guard';

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
      await this.userService
        .findOneOrCreate({
          // eslint-disable-next-line
          // @ts-ignore
          displayName: user.firstName + ' ' + user.lastName,
          // eslint-disable-next-line
          // @ts-ignore
          username: user.firstName + user.lastName,
          // eslint-disable-next-line
          // @ts-ignore
          email: user.email,
        })
        .then((response) => {
          const jwtLogin = this.jwtService.login(response);

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
