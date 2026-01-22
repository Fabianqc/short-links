import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {status: 'OK', message: 'Server is running'};
  }
}
