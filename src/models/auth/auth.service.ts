import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginRes } from './dto/login-res.dto';
import { UserRes } from './dto/user-res.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user_email: string, user_password: string): Promise<any> {
    const user = await this.userRepository.findOne({ user_email: user_email });

    if (user && user.user_password === user_password) {
      const { user_password, ...res } = user;
      return res;
    }

    return null;
  }

  async getProfile(user_email: string): Promise<UserRes> {
    const user = await this.userRepository.findOne({ user_email: user_email });

    const { user_password, ...res } = user;
    return res;
  }

  async login(user: any): Promise<LoginRes> {
    const payload = {
      user_email: user.user_email,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
