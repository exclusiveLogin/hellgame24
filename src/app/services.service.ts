import { Injectable } from '@angular/core';
import { BlogService } from './services/blog.service';
import { IService } from './models/services-interface';
import { ServiceBuilder } from 'selenium-webdriver/chrome';

@Injectable()
export class ServicesService {

  constructor(
    private core_service_blog: BlogService
  ) { }
  
  public getCoreService( serviceName: string ): IService {
    let service = this[ `core_service_${serviceName}` ];
    return service;
  }
}
