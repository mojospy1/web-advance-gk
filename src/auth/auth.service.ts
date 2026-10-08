import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { User } from '../Entity/User.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async register(email: string, password: string) {
    if (!email || !password || password.length < 8) {
      throw new BadRequestException('Cần email và mật khẩu ít nhất 8 ký tự');
    }
    if (await this.users.findOneBy({ email })) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    const user = await this.users.save({
      email,
      password: await hash(password, 10),
      role: 'user',
    });
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(email: string, password: string) {
    const user = await this.users.findOneBy({ email });
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { access_token: accessToken };
  }
}
