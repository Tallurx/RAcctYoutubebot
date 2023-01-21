// require your node modules
const bot = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
bot.use(StealthPlugin());
bot.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: '1325d668407f20a3068867aa42f09eeb' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
        },
        visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
)
const fs = require("fs");
process.setMaxListeners(0)
const colors = require('colors/safe');
const { utile } = require('./utile.js');
const prompt = require("prompt-sync")({ sigint: true });

process.on('uncaughtException', function (err) {
    console.log('Caught exception', err);
});

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// this gets random time
function timer(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

async function getItem_length(link, length, personLocation) {
    if (length == false) {
        let data = await fs.readFileSync(link, "utf-8");
        let proccessedData = JSON.parse(data)
        return (proccessedData[personLocation])
    } else {
        let data = await fs.readFileSync(link, "utf-8");
        let proccessedData = JSON.parse(data)
        return (proccessedData.length)
    }
}

// The runAsenseBot is the main function (thing) that will run when ever the bot is launched.
async function runAdsenseBot() {
    console.log(colors.green(`${colors.blue.bold('\nYOUTUBE BOT STARTED...')} \n 1. Chronicles of legasea \n 2. Ailove \n 3. Tech by Rohan \n 4. WT Communcation \n 5. Lady Purity \n`));
    let channel = prompt(colors.blue.bold("Select Channel: "));

    while (channel == 0 || channel > 5) {
        channel = prompt(colors.red.bold("Please Select a Valid Channel: \n"));
    }

    async function BotPerson(personLocation, personCookies, channelIndex) {
        let proxy = await getItem_length('assets/list-of-location.json', length = false, personLocation)
        const args = [
            '--no-zygote',
            '--no-sandbox',
            '--disable-gpu',
            '--disable-setuid-sandbox',
            `--proxy-server=http://${proxy}`
        ];

        const botConfiguration = {
            args: args,
            headless: false,
            ignoreHTTPSErrors: true,
            ignoreDefaultArgs: ["--enable-automation"],
            // executablePath: "C:\Program Files\Google\Chrome\Application\chrome.exe",
            // userDataDir: `C:\Users\ahead\AppData\Local\Google\Chrome\User Data\Profile ${personLocation + 16}`,
            devtools: false,
        };

        const zone = await getItem_length("assets/list-of-zones.json", personLocation)
        await utile(bot, botConfiguration, personCookies, channelIndex, zone, personLocation)
    }

    let cookies = await getItem_length('assets/list-of-cookies-real.json', length = true)
    let proxy = await getItem_length('assets/list-of-location.json', length = true)

    if (proxy >= cookies) {
        const index = proxy
        for (let num = 0; num <= 0; num++) {
            BotPerson(
                personLocation = num,
                personCookies = num,
                channelIndex = channel
            )
            await sleep(10000)
        }
    } else {
        console.log(colors.red.bold("Insufficient Number Of Proxies!"))
    }
}
runAdsenseBot()