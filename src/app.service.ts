// 3 Katmanlı Mimari -> app.service.ts bu mimaride veri katmanını entegre edeceğimiz dosya.
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
