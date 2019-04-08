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
        this.token = 'f47ace45-e3af-4a34-bde1-02b717601007';
        this.tokenName = 'X-Yandex-API-Key';

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

        if( !!r && !!r.fact && !!r.fact.condition ){
            this.calcCurrentState( r.fact.condition );
        }

    }

    calcCurrentState( condition ){

        this.currentState = condition;

        // Код расшифровки погодного описания. Возможные значения:
        // clear — ясно.
        // partly-cloudy — малооблачно.
        // cloudy — облачно с прояснениями.
        // overcast — пасмурно.
        // partly-cloudy-and-light-rain — небольшой дождь.
        // partly-cloudy-and-rain — дождь.
        // overcast-and-rain — сильный дождь.
        // overcast-thunderstorms-with-rain — сильный дождь, гроза.
        // cloudy-and-light-rain — небольшой дождь.
        // overcast-and-light-rain — небольшой дождь.
        // cloudy-and-rain — дождь.
        // overcast-and-wet-snow — дождь со снегом.
        // partly-cloudy-and-light-snow — небольшой снег.
        // partly-cloudy-and-snow — снег.
        // overcast-and-snow — снегопад.
        // cloudy-and-light-snow — небольшой снег.
        // overcast-and-light-snow — небольшой снег.
        // cloudy-and-snow — снег.

        if( this.currentState === 'clear' ) {
          this.currentStateTitle = "Ясно";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'partly-cloudy' ) {
          this.currentStateTitle = "малооблачно";
          this.currentStateDescription = "Могут быть короткие спауны блинкеров вблизи аномальных зон";
        }

        if( this.currentState === 'cloudy' ) {
          this.currentStateTitle = "облачно с прояснениями";
          this.currentStateDescription = "Мир ВМ частично закрыл границы";
        }

        if( this.currentState === 'overcast' ) {
          this.currentStateTitle = "пасмурно";
          this.currentStateDescription = "Мир ВМ полностью закрыл границы";
        }

        if( this.currentState === 'partly-cloudy-and-light-rain' ) {
          this.currentStateTitle = "небольшой дождь";
          this.currentStateDescription = "FALLOUT, слабые выпадения, вероятно легкое поражение, спауны ВМ агентов вблизи зон";
        }

        if( this.currentState === 'partly-cloudy-and-rain' ) {
          this.currentStateTitle = "дождь";
          this.currentStateDescription = "FALLOUT, сильные выпадения, спауны ВМ агентов вблизи зон и городов. Значительное поражение на улице";
        }

        if( this.currentState === 'overcast-and-rain' ) {
          this.currentStateTitle = "сильный дождь";
          this.currentStateDescription = "FALLOUT, мощные выпадения, спауны ВМ агентов повсюду. На улицу не выходить";
        }

        if( this.currentState === 'overcast-thunderstorms-with-rain' ) {
          this.currentStateTitle = "сильный дождь, гроза";
          this.currentStateDescription = "Мощные спауны ВМ и НМ , активация зон повсюды, активация линий сборок, На улице жатва и поиск новой крови и плоти.";
        }

        if( this.currentState === 'cloudy-and-light-rain' ) {
          this.currentStateTitle = "Облачно, небольшой дождь";
          this.currentStateDescription = "Купол + легкая атака выпадениями";
        }

        if( this.currentState === 'overcast-and-light-rain' ) {
          this.currentStateTitle = "Купол + легкая атака выпадениями с спауном в зонах";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'cloudy-and-rain' ) {
          this.currentStateTitle = "Облачно, небольшой дождь";
          this.currentStateDescription = "Купол, атака с неба.";
        }

        if( this.currentState === 'overcast-and-wet-snow' ) {
          this.currentStateTitle = "дождь со снегом";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'partly-cloudy-and-light-snow' ) {
          this.currentStateTitle = "небольшой снег";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'partly-cloudy-and-snow' ) {
          this.currentStateTitle = "снег";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'overcast-and-snow' ) {
          this.currentStateTitle = "снегопад";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'cloudy-and-light-snow' ) {
          this.currentStateTitle = "небольшой снег";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'overcast-and-light-snow' ) {
          this.currentStateTitle = "небольшой снег";
          this.currentStateDescription = "...";
        }

        if( this.currentState === 'cloudy-and-snow' ) {
          this.currentStateTitle = "облачно и снег";
          this.currentStateDescription = "...";
        }

        if( this.currentState !== this.prevState ){
            let data = {};
            data.state = this.currentState;
            data.title = this.currentStateTitle;
            data.description = this.currentStateDescription;
            this.stream$.next( data );
            this.prevState = this.currentState;
        }

    }

    getStream(){
        return this.stream$;
    }

    fetchData(){
      let h = new fetch.Headers();
      h.append(this.tokenName, this.token);
      fetch(`https://api.weather.yandex.ru/v1/informers?lat=${lat}&lon=${lng}`, {headers: h})
        .then( response => !!response && response.json())
        .then( json => !!json && this.remapData( json )).catch( error => console.log('sunrise error: ', error));
    }
}

module.exports = YandexWeather;
