import { AfterViewInit, Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import {ChartObject} from 'highcharts';
import {TopEventsService} from "../../../topevents.service";
import { IUser, ITrendItem } from '../../../models/user-interface';
import { UiService } from '../../../services/ui.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
const HC = require('highcharts');

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css']
})
export class UserInfoCardComponent implements OnInit, AfterViewInit {
  public emoChart: ChartObject;

  @Input() public user: IUser;
  @ViewChild('trend') private trend: ElementRef;
  
  public usermail_shown: boolean = true;
  public userstatus_shown = false;
  public useremo_shown = false;

  private mailSub: Subscription;
  private statusSub: Subscription;
  private emoSub: Subscription;
  private emoChangeSub: Subscription;

  constructor(
    private tes: TopEventsService,
    private ui: UiService,
  ) { }

  ngOnInit() {
    this.mailSub = this.ui.getUsermailShownChangeEvent().subscribe( state => this.usermail_shown = state);
    this.statusSub = this.ui.getUserStatusShownChangeEvent().subscribe( status => this.userstatus_shown = status);
    this.emoSub = this.ui.getUserEmoShownChangeEvent().subscribe( status => this.useremo_shown = status);

    this.emoChangeSub = this.tes.getSegmentRefreshSignal('emo').subscribe(
      state => { 
        !!state && this.refreshTrend();
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

  private refreshTrend(){
    if( this.user.emo_trend ) {
      this.renderTrend();
    }
    else{
      this.user.emo_trend$.pipe(first()).subscribe( (trend) => {
        this.user.emo_trend = trend;

        this.user.emotion_current = ( trend.length > 1 ) ? trend[0].value : null;
        this.user.emotion_last = ( trend.length > 1 ) ? trend[1].value : null;

        this.user.emotion_current_datetime = ( trend.length > 1 ) ? trend[0].datetime : null;
        this.user.emotion_last_datetime = ( trend.length > 1 ) ? trend[1].datetime : null;

        this.renderTrend();
      });

      this.user.firstInit = true;
    }
    
  }

  private prepareQuickUserEmoTrend( trend: ITrendItem[] ): number[][]{
    return trend
      .sort((p: ITrendItem ,n: ITrendItem) => Number(p.id) - Number(n.id) )
      .map((it:ITrendItem) => [Number(it.utc), Number(it.value)]);
  }

  private renderTrend(){
    if( this.emoChart ) this.emoChart.destroy();
    if( !!this.user && this.trend && this.user.emo_trend ){
      let tr: number[][] = this.prepareQuickUserEmoTrend( this.user.emo_trend );
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
    }


  }
  // Mail
  public openMail(){
    this.ui.openUsermail();
  }
  
  public closeMail(){
    this.ui.closeUsermail();
  }
  // Status
  public openUserStatus(){
    this.ui.openUserStatus();
  }

  public closeUserStatus(){
    this.ui.closeUserStatus();
  }

  // Emo
  public openUserEmo(){
    this.ui.openEmoStatus();
  }

  public closeUserEmo(){
    this.ui.closeEmoStatus();
  }

  ngAfterViewInit(): void {

    if( this.user && !this.user.firstInit ) this.refreshTrend();

    this.tes.getMenuEvent()
      .subscribe(() => {
        if( this.emoChart ) this.emoChart.reflow();
      });

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
  }
}