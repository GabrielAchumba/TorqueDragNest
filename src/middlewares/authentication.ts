import { Constants } from "../utilities/constants"

import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log("req.headers: ", req.headers)
    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'login to continue' });
    }
    const isValid = verify(token, Constants.TOKEN_KEY);
    if (!isValid) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'login to continue' });
    }
    next();
  }
}