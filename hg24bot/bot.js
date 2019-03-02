const Telegraf = require('telegraf');
const HttpsProxyAgent = require('https-proxy-agent');
const fe = require('./fetcher');



let token = '776154170:AAELvoF6Tro_C2PMpSfAYit3j0VrZO1-47A';
let hgChatId = -395832167;
//let hgChatId = 474062218;
const bot = new Telegraf(token, {
    telegram: {
        agent: new HttpsProxyAgent({port: '3128', host: '178.128.174.206'})
    }
});

bot.hears('check', (ctx, next)=>{
    console.log('check');
    ctx.reply('Проверка сервиса успешно пройдена');
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
            let msg = `Событие уровня <b>${ev.level}</b>\n
            <strong>${ev.title}</strong>\n
            ${ev.description}`;
            
            //console.log('msg:', msg);
            bot.telegram.sendMessage(hgChatId, msg.replace("'","\""), 
            {parse_mode:"HTML"});
        }, 2000 * idx);
    });
});