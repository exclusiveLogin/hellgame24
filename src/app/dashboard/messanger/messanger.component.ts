import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Path } from '../../models/path';
import { ConnectorService, IDataRequest } from '../../services/connector.service';
import { ServicesService } from '../../services/services.service';
import { IBlogData } from '../../services/blog.service';
import { TopEventsService } from '../../services/topevents.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from '../../services/message.service';
import { ConnectorWrapperService } from '../../services/connector-wrapper.service';

export interface IMessangerData{
  title?: string,
  text?: string,
  operation: string,
  /*etc в зависимости от  количество полей мессенджера*/
}

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.css']
})
export class MessangerComponent implements OnInit {

  @Input() private service4Work: string;

  @Input() private useServices: boolean = false;

  @Input() private mode: string = 'simple';

  @Input() title: string;

  @Input() public path: Path = {
    segment: null,
    script: null,
  };

  @ViewChild('text', { static: true }) private text: ElementRef;

  public debug = false;

  constructor(
    private state: StateService,
    private con: ConnectorWrapperService,
    private services: ServicesService,
    private tes: TopEventsService,
    ) { }

  ngOnInit() {
    this.debug = this.state.getState().debug;
  }

  public sendMessage(text_field: string): void{
    if(text_field && text_field.length){
      let data: IMessangerData = {
        title: 'Без заголовка',
        text: text_field,
        operation: 'add'
      };

      if( this.useServices && this.service4Work ){
        let service = this.services.getCoreService<MessageService>( this.service4Work );
        service.setData( data )
          .subscribe( result => this.service4Work ? this.tes.refreshSegment( this.service4Work ) : null );
      } else if( this.path.segment && this.path.script ){
        let request: IDataRequest = {
          body:data
        };

        this.con.setData( this.path, request )
          .subscribe(result=> console.log('devss result: ', result));
      } else{
        console.error('Messanger Component не может обработать запрос');
      }

      this.text.nativeElement.value = '';
    }
  }

  public onKeydown(event) {
    if ( event.key === "Enter" ) {
      this.sendMessage( event.target.value );
    }
  }
}
