import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '../jwt/jwt.service';
import { GoogleGuard } from './google.guard';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @Get()
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // // return JSON.stringify(req.user);
    // console.log(`res`, req.user);
    // return this.googleService.googleLogin(req, res);

    const user = req.user;

    if (user) {
      console.log(`user`, user);
      try {
        const user = await this.userService.create({
          // eslint-disable-next-line
          // @ts-ignore
          displayName: user.firstName + ' ' + user.lastName,
          // eslint-disable-next-line
          // @ts-ignore
          username: user.firstName + user.lastName,
          // eslint-disable-next-line
          // @ts-ignore
          email: user.email,
        });
      } catch {}

      const jwtLogin = this.jwtService.login(user);

      // eslint-disable-next-line
      // @ts-ignore
      // eslint-disable-next-line
      res.redirect(
        `${process.env.FE_URL}/?accessToken=${jwtLogin.accessToken}`,
      );
    }

    return 'hi';
  }
}
