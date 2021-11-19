import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

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

  async login(user: any) {
    const payload = {
      user_email: user.user_email,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
