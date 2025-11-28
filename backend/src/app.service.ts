/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** app.service
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
