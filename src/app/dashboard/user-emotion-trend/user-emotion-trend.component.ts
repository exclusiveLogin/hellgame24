import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartObject} from 'highcharts';
import {Observable} from 'rxjs/Observable';
import {TopEventsService} from '../../topevents.service';
import {ChartReflowerService} from "../../chart-reflower.service";
const HC = require('highcharts');

@Component({
  selector: 'app-user-emotion-trend',
  templateUrl: './user-emotion-trend.component.html',
  styleUrls: ['./user-emotion-trend.component.css']
})
export class UserEmotionTrendComponent implements OnInit, AfterViewInit {
  public emoChart: ChartObject;
  @ViewChild('trend') private trendRefEl: ElementRef;
  constructor(
    private menuEventServise: TopEventsService,
    private reflower: ChartReflowerService
  ) { }

  ngOnInit(): void {
    // set theme of HighCharts
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

  ngAfterViewInit(): void {
    this.emoChart = HC.chart('mainEmoTrendUserCard', {
      chart: {
      },
      legend: {
        enabled: false
      },
      yAxis: {
        visible: false,
      },
      xAxis: {
        visible: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: '',
        style: {
          'display': 'none'
        }
      },
      plotOptions: {
        series: {
          pointStart: 2010,
        },
        line: {
          marker: {
            enabled: false,
          },
          color: '#995555'
        }
      },
      series: [{
        type: 'line',
        name: 'Installation',
        data: [1, 2, 1, 5, 6, 7, 8, 2, 54, 84, 1, 58, 54, 57]
      }]
    });
    console.log(this.emoChart, this.trendRefEl);

    // подписываемся на событие меню
    this.menuEventServise.getMenuEvent()
      .subscribe((menuNewState: boolean) => {
        this.reflower.reflow(this.emoChart, this.trendRefEl);
      });
  }
}
