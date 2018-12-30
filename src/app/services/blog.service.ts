import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class BlogService {

  constructor(
    http: HttpClient,
    auth: AuthService
  ) { }

}
