const Cron = require('cron').CronJob;
const checkin = require('./checkin.js');
const seagold = require('./seagold.js');
const pushMessage = require("./utils/pushMessage");

let job = new Cron('0 0 8 * * *', () => {
    setTimeout(async () => {
      await checkin.run(process.argv.splice(2)).catch(error => {
        pushMessage({
          subject: "掘金每日签到",
          html: `<strong>Error</strong><pre>${error.message}</pre>`
        });
      
        throw error;
      });
  
      await seagold.run(process.argv.splice(2)).catch((error) => {
        pushMessage({
          subject: "海底掘金游戏",
          html: `
      <strong>Error</strong>
      <pre>${error.message}</pre>
      <div>如果版本过低请前往升级: <a href="https://github.com/iDerekLi/juejin-helper">juejin-helper</a></div>
      `.trim()
        });
      
        throw error;
      });

    }, Math.floor(Math.random()*(30+1)) * 60 * 1000 )
}, null, false)

console.log('开始运行')

job.start();