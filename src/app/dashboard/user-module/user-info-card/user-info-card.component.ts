import { 
  AfterViewInit,
  Component, 
  OnInit, 
  Input, 
  ViewChild, 
  ElementRef, 
  SimpleChanges, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef } from '@angular/core';
import {Chart} from 'highcharts';
import {TopEventsService} from "../../../services/topevents.service";
import { IUser, ITrendItem } from '../../../models/user-interface';
import { UiService } from '../../../services/ui.service';
import { Subscription, from } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserServiceService } from '../../../services/user-service.service';
import { AuthService } from '../../../services/auth.service';


const ua = require('ua-parser-js');
const HC = require('highcharts');

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoCardComponent implements OnInit, AfterViewInit {
  public emoChart: Chart;

  @Input() public user: IUser;
  @ViewChild('trend', { static: true }) private trend: ElementRef;

  public usermail_shown: boolean = true;
  public userstatus_shown = false;
  public useremo_shown = false;

  private mailSub: Subscription;
  private statusSub: Subscription;
  private emoSub: Subscription;
  private emoChangeSub: Subscription;
  private userTrendSub: Subscription;
  private userStatusChangeSub: Subscription;

  public userEmoStatus:{
    title: string,
    prev_title: string,

    value: string,
    prev_value: string,

    datetime: string,
    prev_datetime: string,
  } = null;

  constructor(
    private tes: TopEventsService,
    private ui: UiService,
    private usersService: UserServiceService,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.mailSub = this.ui.getUsermailShownChangeEvent().subscribe( state => {
      this.usermail_shown = state;
      if ( !this.userstatus_shown ) this.scroll( 'body' );
      this.cd.detectChanges();
    });
    this.statusSub = this.ui.getUserStatusShownChangeEvent().subscribe( status => {
      this.userstatus_shown = status;
      if ( !this.userstatus_shown ) this.scroll( 'body' );
      this.cd.detectChanges();
    });
    this.emoSub = this.ui.getUserEmoShownChangeEvent().subscribe( status => {
      this.useremo_shown = status;
      if ( !this.userstatus_shown ) this.scroll( 'body' );
      this.cd.detectChanges();
    });

    this.emoChangeSub = this.tes.getSegmentRefreshSignal('emo').subscribe(
      state => {
        !!state && this.refreshTrend();
        this.cd.detectChanges();
      }
    );

    this.userStatusChangeSub = this.tes.getSegmentRefreshSignal('status').subscribe(
      state => {
        if( !!state ) 
        setTimeout(()=>{
            this.usersService.getUser(this.user.login).subscribe( user => {
            this.user = user;
            this.cd.detectChanges();
          });
        },500);
        
      }
    );

    HC.theme = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: '#333',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
      },
      title: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
        }
      },
      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
      },
      xAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
          style: {
            color: '#A0A0A3'

          }
        }
      },
      yAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          style: {
            color: '#A0A0A3'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#333'
          }
        },
        boxplot: {
          fillColor: '#505053'
        },
        candlestick: {
          lineColor: 'white'
        },
        errorbar: {
          color: 'white'
        }
      },
      legend: {
        itemStyle: {
          color: '#E0E0E3'
        },
        itemHoverStyle: {
          color: '#FFF'
        },
        itemHiddenStyle: {
          color: '#606063'
        }
      },
      credits: {
        style: {
          color: '#666'
        }
      },
      labels: {
        style: {
          color: '#707073'
        }
      },

      drilldown: {
        activeAxisLabelStyle: {
          color: '#F0F0F3'
        },
        activeDataLabelStyle: {
          color: '#F0F0F3'
        }
      },

      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
            fill: '#505053'
          }
        }
      },

      // scroll charts
      rangeSelector: {
        buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
            color: '#CCC'
          },
          states: {
            hover: {
              fill: '#707073',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            },
            select: {
              fill: '#000003',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            }
          }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
        },
        labelStyle: {
          color: 'silver'
        }
      },

      navigator: {
        handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
        },
        xAxis: {
          gridLineColor: '#505053'
        }
      },

      scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
      },

      // special colors for some of the
      legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      background2: '#505053',
      dataLabelsColor: '#B0B0B3',
      textColor: '#C0C0C0',
      contrastTextColor: '#F0F0F3',
      maskColor: 'rgba(255,255,255,0.3)'
    };
    HC.setOptions(HC.theme);
  }

  public isOwner(): boolean{
    return this.user && this.user.login === this.auth.authorizedAs();
  }

  private refreshTrend(){

    this.userTrendSub = this.usersService.getUserTrend( this.user.login )
      .pipe(
        filter(trend => !!trend),
        tap(trend => {

          if ( trend.length > 1 ) {
            this.userEmoStatus = {
              title: trend[0].title && trend[0].title.length ? trend[0].title : null,
              prev_title: trend[1].title && trend[1].title.length ? trend[1].title : null,
              value: trend[0].value,
              prev_value: trend[1].value,
              datetime: trend[0].datetime,
              prev_datetime: trend[1].datetime,
            }
          } else {
            this.userEmoStatus = null;
          }


        })
      )
      .subscribe( trend => !!trend && this.renderTrend( trend ));


  }

  private prepareQuickUserEmoTrend( trend: ITrendItem[] ): number[][]{
    return trend
      .sort((p: ITrendItem ,n: ITrendItem) => Number(p.id) - Number(n.id) )
      .map((it:ITrendItem) => [Number(it.utc), Number(it.value)]);
  }

  private renderTrend( trend ){
    if ( !trend ) return;

    if( this.emoChart ) this.emoChart.destroy();

    let tr: number[][] = this.prepareQuickUserEmoTrend( trend );
    this.emoChart = HC.chart('infocardEmo_hc', {
      chart: {
        height: '125px',
      },
      legend: {
        enabled: false
      },
      yAxis: {
        visible: false,
      },
      xAxis: {
        //visible: false
        type: 'datetime'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Динамика настроения',
        style: {
          'font-size': '12px'
        }
      },
      plotOptions: {
        series: {
          //pointStart: 2010,
        },
        spline: {
          marker: {
            enabled: false,
          },
          color: '#995555'
        }
      },
      series: [{
        type: 'spline',
        name: 'Настроение пользователя',
        data: tr,
      }]
    });
    this.emoChart.reflow();

    !this.cd['destroyed'] && this.cd.detectChanges();

  }
  // Mail
  public openMail(){
    this.ui.openUsermail();
    this.scroll( 'app-user-mail' );
  }

  public closeMail(){
    this.ui.closeUsermail();
  }
  // Status
  public openUserStatus(){
    this.ui.openUserStatus();
    this.scroll( 'app-user-status' );
  }

  public closeUserStatus(){
    this.ui.closeUserStatus();
    //this.scroll( 'body' );
  }

  // Emo
  public openUserEmo(){
    this.ui.openEmoStatus();
    this.scroll( 'app-user-emo' );
  }

  public closeUserEmo(){
    this.ui.closeEmoStatus();
  }

  private scroll( _target: string ){
    setTimeout(()=>{
      let target = document.getElementsByTagName( _target );
      if ( _target === 'body' ) target && target.length && target[0].scrollIntoView({behavior:'smooth', block:'start'});
      else target && target.length && target[0].scrollIntoView({behavior:'smooth'});
    },500);

  }

  ngAfterViewInit(): void {

    this.refreshTrend();

    this.tes.getMenuEvent()
      .subscribe(() => {
        if( this.emoChart ) this.emoChart.reflow();
      });

  }

  public getUASystem(u: string){
    let userAgent = ua(u);
    return `${userAgent.os.name ? userAgent.os.name :''} ${userAgent.os.version ? userAgent.os.version :''}`;
  }

  public getUABrowser(u: string){
    let userAgent = ua(u);
    return `${userAgent.browser.name ? userAgent.browser.name :''} ${userAgent.browser.version ? userAgent.browser.version :''}`;
  }

  public getUADevice(u: string){
    let userAgent = ua(u);
    return `${userAgent.device.model ? userAgent.device.model :''} ${userAgent.device.type ? userAgent.device.type :''} ${userAgent.device.vendor ? userAgent.device.vendor :''}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if(
      changes['user']  &&
      !changes['user'].firstChange &&
      (!!changes['user'].previousValue && !!changes['user'].currentValue) &&
      changes['user'].previousValue.login !== changes['user'].currentValue.login
    ){
      this.refreshTrend();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    if ( this.mailSub ) this.mailSub.unsubscribe();
    if ( this.statusSub ) this.statusSub.unsubscribe();
    if ( this.emoSub ) this.emoSub.unsubscribe();
    if ( this.emoChangeSub ) this.emoChangeSub.unsubscribe();
    if ( this.userTrendSub ) this.userTrendSub.unsubscribe();
    if ( this.userStatusChangeSub ) this.userStatusChangeSub.unsubscribe();
  }
}
