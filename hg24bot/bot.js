const Telegraf = require('telegraf');
const HttpsProxyAgent = require('https-proxy-agent');
const fe = require('./fetcher');
const sun = require('./sunlocator');
const fetch = require('node-fetch');
const moment = require('moment');



let token = '776154170:AAELvoF6Tro_C2PMpSfAYit3j0VrZO1-47A';
// HG чат
let hgChatId = -395832167;
// SS личка
//let hgChatId = 474062218;
let version = '0.1.1';
const bot = new Telegraf(token, {
    telegram: {
        agent: new HttpsProxyAgent({port: '3128', host: '178.128.174.206'})
    }
});

bot.command('echo', (ctx)=>ctx.reply(ctx.message.text));

bot.hears('check', (ctx, next)=>{
    console.log('check fe:', fetcher);
    ctx.reply('Проверка сервиса version: ' + version + ' последняя запись в event log id: ' + fetcher.lastId + ' интервал опроса HG24: ' + fetcher.interval + 'ms');
    next();
});

bot.hears('sun', (ctx, next)=>{
    //console.log('sun fe:', sunLocator);

    setTimeout(() => ctx.reply('Ночь: ' + sunLocator.nightTime.format('DD:MM:YYYY HH:mm:ss') + ' День: ' + sunLocator.dayTime.format('DD:MM:YYYY HH:mm:ss')), 1500);
    setTimeout(() => ctx.reply('Утро -  синий час: ' + sunLocator.blueHourMTime.format('DD:MM:YYYY HH:mm:ss') + ' золотой час: ' + sunLocator.goldHourMTime.format('DD:MM:YYYY HH:mm:ss')), 500);
    setTimeout(() => ctx.reply('Вечер - золотой час: ' + sunLocator.goldHourETime.format('DD:MM:YYYY HH:mm:ss') + ' синий час: ' + sunLocator.blueHourETime.format('DD:MM:YYYY HH:mm:ss')), 2500);

    ctx.reply('Интервал обновления состояния: ' + sunLocator.interval + 'ms. Состояние: ' + sunLocator.currentState + ' ( ' + sunLocator.currentStateTitle + ' ) - ' + sunLocator.currentStateDescription);
    
    setTimeout(() => ctx.reply('Системное время сервера: ' + moment().format('DD:MM:YYYY HH:mm:ss') ), 3000);
    next();
});

bot.start((ctx) => ctx.reply('Hello'));

bot.on('message', (ctx) => {
    console.log('message...:', ctx.update.message.text );
    console.log(ctx.update.message.chat);
    console.log(ctx.update.message.from);
});

if(hgChatId) bot.telegram.sendMessage(hgChatId, 'Сервис бота успешно запущен');

bot.launch();


process.on('SIGINT', ()=>{
    bot.telegram.sendMessage(hgChatId, 'Сервис бота остановлен').finally(()=>process.exit());
});

// запускаем fetcher событий на hg24
let fetcher = new fe('http://hellgame24.ru');
fetcher.getStream().subscribe( events => {
    if( events && events.length ) events.forEach((ev, idx) => {
        setTimeout(()=>{
            let msg = `Событие ${ ev.level === 'info' ? 'ℹ️' : ''}${ ev.level === 'warning' ? '⚠️' : ''}${ ev.level === 'danger' ? '‼️' : ''} <b>( ${ev.level} )</b>
<strong>${ev.title}</strong>
${ev.description}`;
            
            //console.log('msg:', msg);
            bot.telegram.sendMessage(hgChatId, msg, 
            {parse_mode:"HTML"});
        }, 2000 * idx);
    });
});

let sunLocator = new sun();
sunLocator.start();
sunLocator.getStream().subscribe( sunState => {
    
    if( sunState ){
        setTimeout(() => { 
            let msg = `Время наступило ${ sunState.state === 'day' ? '☀️' : ''}${ sunState.state === 'night' ? '🌙' : ''}${ '⚠️' } <b>( ${ sunState.state } )</b>
<strong>${sunState.title}</strong>
${sunState.description}`;
            
            //console.log('msg:', msg);
            bot.telegram.sendMessage(hgChatId, msg, 
            {parse_mode:"HTML"});
        }, 2000);

        const body_state = {
            mode:'add_state',
            login: 'system',
            global_code: sunState.state
        }

        const body_segment = {
            mode:'update',
            segment: 'global',
        }

        fetch('https://hellgame24.ru/backend/state/state_handler.php', {
            method: 'POST',
            body:    JSON.stringify(body_state),
            headers: { 'Content-Type': 'application/json' },
        }).then(r => r.text()).then(json=>console.log('result: ', json)).catch(err => console.error(err));

        fetch('https://hellgame24.ru/backend/segment/segment_state.php', {
            method: 'POST',
            body:    JSON.stringify(body_segment),
            headers: { 'Content-Type': 'application/json' },
        }).then(r => r.text()).then(json=>console.log('result: ', json)).catch(err => console.error(err))
    }
    console.log('SUN State: ', sunState);
});