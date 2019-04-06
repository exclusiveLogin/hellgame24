const fetch = require('node-fetch');
const moment = require('moment');
const rx = require('rxjs');

// syzran
const lat = 53.148212;
const lng = 48.454170;

class YandexWeather{
    
    constructor( interval ){
        this.raw = null;
        this.lastupdate = null;
        this.interval = interval || 3600000;       
        this.stream$ = new rx.BehaviorSubject(null);

        this.currentState;
        this.prevState;
    }

    start(){
        this.fetchData();
        this.timer = setInterval( () => this.remapData(), this.interval);
    }

    stop(){
        this.timer && clearInterval(this.timer);
        delete this.timer;
    }

    remapData( r ){
        this.raw = r;
        this.lastupdate = moment();

        if( !!r && !!r.fact ){
            this.calcCurrentState( r.fact );
        }
        
    }
    
    calcCurrentState( fact ){

        this.currentState = fact.condition;

        if( this.currentState !== this.prevState ){
            let data = {};
            data.state = this.currentState;
            this.stream$.next( data );
            this.prevState = this.currentState;
        }
        
    }

    getStream(){
        return this.stream$; 
    }

    fetchData(){
        fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
            .then( response => !!response && response.json())
            .then( json => {
                if( !!json ) this.remapData( json );
            } )
            .catch( error => console.log('sunrise error: ', error));
            }
}

module.exports = YandexWeather;