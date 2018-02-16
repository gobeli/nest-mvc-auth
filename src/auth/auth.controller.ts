import { Get, Controller, Post, Res, Req, Body, Delete, Param } from '@nestjs/common';
import { UserService } from '../shared/auth/user.service';
import User from '../shared/auth/user.entity';

@Controller('')
export class AuthController {
  constructor(private userService: UserService) {}

  async redirectUser(req, res, template) {
    const user = await this.userService.findById(req.session.userId);
    if (user) {
      res.redirect('/todo');
    } else {
      res.render(template);
    }
  }

  @Get('')
  loginForm(@Req() req, @Res() res) {
    this.redirectUser(req, res, 'auth/login');
  }

  @Get('register')
  registerForm(@Req() req, @Res() res) {
    this.redirectUser(req, res, 'auth/register');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    delete req.session.userId;
    req.session.flash = { type: 'sucess', message: 'Successfully logged out!' };
    res.redirect('/');
  }

  @Post('') 
  async login(@Body('username') username, @Body('password') password, @Req() req, @Res() res) {
    const user = await this.userService.findByUserName(username);
    if (user && user.validatePassword(password)) {
      req.session.userId = user.id;
      req.session.isAdmin = user.isAdmin;
      req.session.flash = { type: 'sucess', message: 'Successfully logged in!' };
      res.redirect('/todo');
      return;
    } 
    req.session.flash = { type: 'error', message: 'Login failed!' };
    res.redirect('/');
  }

  @Post('register')
  async register(@Body('username') username, @Body('password') password, @Body('passwordConfirm') passwordConfirm, @Req() req, @Res() res) {
    if (password === passwordConfirm) {
      const user = await this.userService.save(new User({username, password}));
      if (user) {
        req.session.userId = user.id;
        req.session.flash = { type: 'sucess', message: 'Successfully registered!' };
        res.redirect('/todo');
        return;
      } else {
        req.session.flash = { type: 'error', message: 'error occured' };
      }
    } else {
      req.session.flash = { type: 'error', message: 'passwords do not match' };
    }
    res.redirect('/register');
  }
}