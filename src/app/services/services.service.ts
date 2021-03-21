import { Injectable } from '@angular/core';
import { BlogService } from './blog.service';
import { IService } from '../models/services-interface';
import { MessageService } from './message.service';
import { UpdaterService } from './updater.service';

@Injectable()
export class ServicesService {

  constructor(
    private core_service_blog: BlogService,
    private core_service_message: MessageService,
    private core_service_updater: UpdaterService,
  ) { }

  public getCoreService<T>( serviceName: string ): T {
    const service = this[ `core_service_${serviceName}` ];
    return service;
  }
}
