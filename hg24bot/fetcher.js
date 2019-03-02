let fetch = require('node-fetch');
const rx = require('rxjs');

class EventFetcher{
    
    constructor(url, interval = 5000, level = 'global'){
        this.url = url;
        this.interval = interval;
        this.level = level;
        this.stream$ = new rx.BehaviorSubject([]);
        this.init();
    }

    start(){
        setTimeout(()=>{
            this.update();
        }, this.interval);
    }

    getStream(){
        return this.stream$.asObservable();
    }

    init(){
        let path = this.url+'/backend/events/events_handler.php?mode=get_last_event';

        fetch( path ,{ method:'get'}).then( result => {
            if(result.ok) return result.json();
        }).then(json => {
            this.lastId = json && json.length && json[0].id;
            this.start();
        }).catch(e=>console.error(e));
    }

    update(){

        if( !this.lastId ) return;
        
        let path = this.url+'/backend/events/events_handler.php?mode=get_new_events&id='+this.lastId;
        
        fetch( path ,{ method:'get'}).then( result => {
            if(result.ok) return result.json();
        }).then(json => {

            let last = json && json.slice(-1);
            let newId = last && !!last.length && last[0].id;

            if(newId) this.lastId = newId;

            this.stream$.next( json );

            this.start();
        }).catch(e=>console.error(e));
        
    }
}

module.exports = EventFetcher;