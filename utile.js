// require your node modules
const fs = require("fs");

let ctrlKey = process.platform === 'darwin' ? 'Meta' : 'Control';

const sendLog = (async (outCome, e) => {
    fs.appendFile("log.txt", `${outCome}:    ${e} \n`, (err) => { })
});

const Tasks = [
    "task 1",
    "task 2",
    "task 3",
    "task 4",
    "task 5",
    "task 6",
    "task 7",
    "task 8",
    "task 9",
]

const Channel = [
    "https://www.youtube.com/@chroniclesoflegaseas6691/featured",
    "https://www.youtube.com/@_.ailove/featured",
    "https://www.youtube.com/@techbyrehan4154/featured",
    "https://www.youtube.com/@wirelesstelecommunication6397/featured",
    "https://www.youtube.com/@ladypurity1108/featured"
]

let urls = [
    [
        "https://www.youtube.com/watch?v=jgnlVMscKbQ",
        "https://www.youtube.com/watch?v=dg0_UqbDPdg",
        "https://www.youtube.com/watch?v=dg0_UqbDPdg",
    ],
    [
        "https://www.youtube.com/watch?v=hStFVVa3w1g&t",
        "https://www.youtube.com/watch?v=gDUoSnfgSZI",
        "https://www.youtube.com/watch?v=7C7X1_hx-xQ",
        "https://www.youtube.com/watch?v=C9aNmN7d_vs",
        "https://www.youtube.com/watch?v=hfDgwBMyJSk"
    ],
    [
        "https://www.youtube.com/watch?v=dXGyaQjr__g",
        "https://www.youtube.com/watch?v=bTq95msuTDM",
        "https://www.youtube.com/watch?v=bzJBzjck0u0",
        "https://www.youtube.com/watch?v=3KAj4pljvF0",
        "https://www.youtube.com/watch?v=HjsaDyHDl6U"
    ],
    [
        "https://www.youtube.com/watch?v=itR1m9RnoSk",
        "https://www.youtube.com/watch?v=yF_efLrX18o",
        "https://www.youtube.com/watch?v=FfQYdkQLJxg",
        "https://www.youtube.com/watch?v=nzY85pkZly0",
        "https://www.youtube.com/watch?v=Iq4zAYA1Klg"
    ],
    [
        "https://youtu.be/McP8oGosXt4",
        "https://youtu.be/tx5dSOCfam4",
        "https://youtu.be/XA0knysYhR8",
        "https://youtu.be/QzVl4NeHsxM",
        "https://youtu.be/_I-mZtwsVdo"
    ]

]

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// this gets random time
function timer(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

// this getRandomItem function will be getting a random item from a link (json file)
async function getRandomItem(link) {
    let data = await fs.readFileSync(link, "utf-8");
    let proccessedData = JSON.parse(data)
    let proccessedDataLength = proccessedData.length;
    let urlIndex = Math.floor(Math.random() * proccessedDataLength)
    return (proccessedData[urlIndex])
}

async function getIndexedItem(link, person) {
    let data = await fs.readFileSync(link, "utf-8");
    let proccessedData = JSON.parse(data)
    return (proccessedData[person])
}

async function getListItem(file, index) {
    if (index != null) {
        return file[index - 1];
    } else {
        let DataLength = file.length;
        let dataIndex = Math.floor(Math.random() * DataLength)
        return (file[dataIndex])
    }
}
// This function listens and solves any 2Captchas
async function solveCaptcha(page) {
    setInterval(async () => {
        const { solved, error } = await page.solveRecaptchas();
        if (solved) {
            // console.log(colors.green.bold(`A Captcha challenge was successfully solved`))
        }
    }, 1000)
}

// This method mouse clicks an element like a human will
async function mouseClick(page, element, action) {
    try {
        const dim = await element.boundingBox()
        const x = dim.x + (dim.width / 2);
        const y = dim.y + (dim.height / 2);
        await page.mouse.move(x, y)
        await page.mouse.click(x, y, { button: "left" })
        // console.log(`This Bot has clicked the ${action} element \n`)
    } catch (e) { }
}

async function newTabClick(page, element, action) {
    try {
        const dim = await element.boundingBox()
        const x = dim.x + (dim.width / 2);
        const y = dim.y + (dim.height / 2);
        await page.mouse.move(x, y)
        await page.keyboard.down(ctrlKey)
        await page.mouse.click(x, y, { button: "left" })
        // console.log(`This Bot has clicked the ${action} element in a new Tab\n`)
    } catch (e) { }
}

// This function pasuses  a video after a random period of time
async function pause(page) {
    try {
        await sleep(timer(30000, 240000))
        const pause = setInterval(async () => {
            const pause = await page.$('.ytp-play-button');
            await mouseClick(page, pause, action = "Pause/Play");
        }, 2000)
        await sleep(4500)
        clearInterval(pause)
    } catch (e) { console.log(e) }
    // console.log("Pause Successful")
}

// This function skips a video forward by some randome seconds
async function playBack(page) {
    try {
        const Keys = ["ArrowLeft", "ArrowRight"]
        await sleep(timer(30000, 240000))
        setInterval(async () => {
            let key = await getListItem(Keys)
            const skip = setInterval(async () => {
                await page.keyboard.down(key)
            }, timer(250, 1000));
            await sleep(timer(1000, 5000));
            clearInterval(skip)
            console.log("This Bot has Skipped video forward by random seconds! \n")
        }, timer(120000, 300000));
    } catch (e) { console.log(e) }
}

// This function likes videos
async function like(page) {
    await sleep(timer(10000, 60000))
    try {
        const like = await page.waitForSelector(".style-scope.ytd-toggle-button-renderer")
        if (like) {
            await sleep(timer(1000, 5000))
            await mouseClick(page, like, action = "Like");
        }
        // console.log("Like Successful")
    } catch (e) { }
}

// This function makes Comments
async function Comment(page) {
    await sleep(timer(10000, 60000))
    try {
        const allTitles = fs.readFileSync("keywords/comments.txt").toString().split('\n');
        const randomWord = allTitles[Math.floor(Math.random() * allTitles.length)];
        const commentBox = await page.waitForSelector('#simplebox-placeholder')
        if (commentBox) {
            await mouseClick(page, commentBox, action = "Comment");
            await sleep(timer(1000, 10000));
            await page.keyboard.type(randomWord)
            await sleep(timer(1000, 3000));
            await page.keyboard.down("Meta")
            await page.keyboard.down("Enter")
            await page.keyboard.up("Enter")
            await sleep(2000);
            let got_it = setInterval(async () => {
                try {
                    const error = await page.$('.style-scope.ytd-button-renderer.style-primary.size-default')
                    // console.log(error);
                    if (error) {
                        error.evaluate(b => b.click());
                        clearInterval(got_it)
                    }
                } catch (e) { }
            }, 2000)
        }
        // console.log("Commentted Successfully")
    } catch (e) { console.log(e.message) }
}

// This function subscribes to channels
async function subscribe(page) {
    await sleep(timer(10000, 60000));
    try {
        //identify element
        let subscription = await page.$("#subscribe-button > ytd-subscribe-button-renderer > tp-yt-paper-button > yt-formatted-string")
        //obtain text
        const text = await page.$eval("#subscribe-button > ytd-subscribe-button-renderer > tp-yt-paper-button > yt-formatted-string", el => el.textContent);
        if (text == "Subscribe") {
            await mouseClick(page, subscription, action = "Subscription");
            // console.log("Subscribe click successfull")
        }
        if (text == "subscribed") {
            console.log("This User already subscribed \n")
        }
    } catch (e) { console.log(e.message) }
}

// This function clicks on side Ads on youtube
async function sideAdsClick(page) {
    const Ads = setInterval(async () => {
        try {
            try {
                const sideAds = await page.$(".style-scope ytd-action-companion-ad-renderer")
                const pause = await page.$('.ytp-play-button');
                await newTabClick(page, sideAds, action = "SideAds")
                if (sideAds) {
                    await mouseClick(page, pause, action = "Pause");
                    clearInterval(Ads)
                }
            } catch (e) { }
            // console.log("Side Ads clicked successful")
        } catch (e) { }
    }, timer(5000, 15000));
}

// This function skips ads on youtube
async function skipAds(page) {
    setInterval(async () => {
        try {
            try {
                const skip = await page.waitForSelector('.ytp-ad-skip-button-icon')
                await sleep(timer(1000, 3000))
                if (skip) {
                    mouseClick(page, skip, action = "SkipAds")
                    console.log("Ads skip successfull")
                }
            } catch (e) { }
        } catch (e) {
            // console.log(`An error occured skipping ads ${e.message} \n`);
        }
    }, timer(30000, 120000));
}

// This functiion Opens the video Links randomly
async function task1(page, url) {
    let activity = await getListItem(Tasks)
    try {

        await page.goto(url, { waitUntil: 'load', setTimeout: 0 })
        // Listen to solve any 2captcha challenge
        await solveCaptcha(page);

        try {
            const unmute = await page.waitForSelector('.ytp-unmute-icon', { timeout: 20000 });
            if (unmute) {
                // This methods clicks the unmute button for mobile if it exists
                await mouseClick(page, unmute, action = "Unmute")
            }
        } catch (e) {
            console.log("Unmute button not found \n")
        }
        try {
            await skipAds(page)
        } catch (e) {
            // console.log(`An error occured skipping ads ${e} \n`);
        } finally {
            try {
                await sleep(timer(1000, 5000))
                const play = await page.$('.ytp-large-play-button.ytp-button', { timeout: 20000 })
                if (play) {
                    // This method clicks the play button on mobile and desktop if it exists
                    await mouseClick(page, play, action = "Big Play")
                }
                setTimeout(async () => {
                    await activityTask(page, activity)
                }, timer(1000, 5000))
            } catch (e) {
                console.log(`An error occured playing/clicking the large play button ${e.message} \n`);
            }
        }
    } catch (e) {
        console.log(`An error occurred while running Task 1. ${e.message} \n`)
    }
}

// This function Opens a channel and Plays all Video
async function task_2(page) {
    let activity = await getListItem(Tasks)
    let channel = await getListItem(Channel)
    // let channel = await getIndexedItem(Channel, channelIndex)
    try {
        await page.goto(channel, { waitUntil: 'load', setTimeout: 0 })
        const playall = await page.waitForSelector('.style-scope.ytd-button-renderer.style-text.size-default')
        await sleep(timer(5000, 15000))
        await mouseClick(page, playall, action = "Playall")
        try {
            const unmute = await page.waitForSelector('.ytp-unmute-icon', { timeout: 20000 });
            if (unmute) {
                mouseClick(page, unmute, action = "Unmute")
                // console.log("Mobile Video Unmuted \n")
            }
        } catch (e) {
            console.log("Unmute button not found \n")
        }
        try {
            skipAds(page)
        } catch (e) {
            console.log(`An error occured skipping ads ${e.message} \n`);
        } finally {
            try {
                await sleep(timer(1000, 5000))
                // This method clicks the play button on mobile and desktop if there is One
                const play = await page.$('.ytp-large-play-button ytp-button', { timeout: 20000 })
                if (play) {
                    mouseClick(page, play, action = "Play")
                }
                setTimeout(async () => {
                    // await activityTask(page, activity)
                }, timer(60000, 180000))
            } catch (e) {
                console.log(`An error occured clicking the big play button ${e.message} \n`);
            }
        }
    } catch (e) {
        console.log("An error occurred while running Task 2. \n")
        await task2(page)
    }
}

// This function Opens a channel and plays a random video
async function task2(page, channelIndex) {
    let activity = await getListItem(Tasks)
    let channel = await getListItem(Channel, channelIndex)

    try {
        await page.goto(channel, { waitUntil: 'load', setTimeout: 0 })

        // Listen to solve any 2captcha challenge
        await solveCaptcha(page);
        let element = await page.$$('#video-title')

        // loop thru all elements
        for (const videos of element) {
            const rdIndex = Math.floor(Math.random() * element.length)
            element[rdIndex].evaluate(b => b.click());
        }
        try {
            const unmute = await page.waitForSelector('.ytp-unmute-icon', { timeout: 20000 });
            if (unmute) {
                mouseClick(page, unmute, action = "Unmute")
                // console.log("Mobile Video Unmuted \n")
            }
        } catch (e) {
            console.log("Unmute button not found \n")
        }
        try {
            skipAds(page)
        } catch (e) {
            console.log(`An error occured skipping ads ${e.message} \n`);
        } finally {
            try {
                await sleep(timer(1000, 5000))
                // This method clicks the play button on mobile and desktop if there is One
                const play = await page.$('.ytp-large-play-button ytp-button', { timeout: 20000 })
                if (play) {
                    mouseClick(page, play, action = "Play")
                }
                setTimeout(async () => {
                    await activityTask(page, activity)
                }, timer(1000, 5000))
            } catch (e) {
                console.log(`An error occured clicking the big play button ${e.message} \n`);
            }
        }
    } catch (e) {
        console.log(`An error occurred while running Task 2. ${e.message} \n`)
        // await task2(page)
    }

}

// This function Performs youtube search and clicks on the desired search result
async function task3(page) {
    let activity = await getListItem(Tasks)
    try {
        const allTitles = fs.readFileSync("keywords/all-Titles.txt").toString().split('\n');
        const listOfword = fs.readFileSync("keywords/word-search.txt").toString().split('\n');
        const randomWord = allTitles[Math.floor(Math.random() * listOfword.length)];
        let videoLoadArray = [];

        await page.goto("https://youtube.com", { waitUntil: 'load', setTimeout: 0 })
        // Listen to solve any 2captcha challenge
        await solveCaptcha(page);
        try {
            let elements = await page.$$('#video-title')
            // loop thru all elements
            for (const videos of elements) {
                // pass the single handle below
                const videorResult = await page.evaluate(el => el.innerText, videos)
                videoLoadArray.push(videorResult.toString())
            }
        } catch (e) { console.log(e.message) }
        // simple selector for search box
        const searchEl = await page.$(".ytd-searchbox")
        await mouseClick(page, searchEl, action = "Search Box")
        // await page.click(".ytd-searchbox")
        await sleep(timer(2000, 5000))
        await page.keyboard.type(randomWord)
        await sleep(timer(2000, 10000))
        const search = await page.$("#search-icon-legacy")
        await mouseClick(page, search, action = "Search")
        // await page.click("#search-icon-legacy")
        await sleep(timer(2000, 15000))
        let videoSearchArray = [];
        let element = await page.$$('#video-title')

        // loop thru all elements
        for (const videos of element) {
            // pass the single handle below
            const videorResult = await page.evaluate(el => el.innerText, videos)
            videoSearchArray.push(videorResult.toString())
        }
        let finalSearchArray = videoSearchArray.splice(videoLoadArray.length, videoSearchArray.length)
        let Result = allTitles.filter(function (e) {
            return (finalSearchArray.indexOf(e) > -1);
        })
        let index = finalSearchArray.indexOf(Result.toString())
        let indexToClick = finalSearchArray.indexOf(Result.toString()) + videoLoadArray.length

        // Click the search result video if found
        if (index !== -1) {
            try {
                // console.log(`There is A match for the Youtube video Search ${Result.toString()} at index ${indexToClick} \n`)
                await sleep(timer(5000, 15000))
                try {
                    element[indexToClick].evaluate(b => b.click());
                } catch (e) { console.log(e.message) }
                try {
                    try {
                        const unmute = await page.waitForSelector('.ytp-unmute-icon', { timeout: 20000 });
                        if (unmute) {
                            // clicks the unmute button if it exists
                            mouseClick(page, unmute, action = "Unmute")
                            // console.log("Video Unmuted \n")
                        }
                    } catch (e) {
                        console.log("Unmute button not found \n")
                    }
                    await sleep(timer(2000, 5000))
                    await skipAds(page)
                } catch (e) { console.log(e.message) }
                finally {
                    setTimeout(async () => {
                        await activityTask(page, activity)
                    }, timer(10000, 60000))
                }
            } catch (e) { console.log(e.message) }
        }
        if (index == -1) {
            throw 'There is no match for the Youtube search, Bot will reload in random Seconds \n'
        }
    } catch (e) {
        console.log(`An error occurred while running Task 3. ${e.message} \n`)
    }
}

// This function regulates the activity of this Bot when it opens a video
async function activityTask(page, activity) {
    switch (activity) {
        case "task 1":
            console.log("Activity 1 is running \n");
            await playBack(page);
            await sleep(timer(1000, 5000));
            await like(page)
            await pause(page);
            break;
        case "task 2":
            console.log("Activity 2 is running \n");
            await sleep(timer(1000, 5000));
            await Comment(page)
            await pause(page);
            break;
        case "task 3":
            console.log("Activity 3 is running \n");
            await sleep(timer(1000, 5000));
            await subscribe(page)
            await pause(page);
            break;
        case "task 4":
            console.log("Activity 4 is running \n");
            await sleep(timer(60000, 300000));
            await sideAdsClick(page)
            await pause(page);
            break;
        case "task 5":
            console.log("Activity 5 is running \n");
            await pause(page);
            await sleep(timer(1000, 5000));
            await subscribe(page)
            await playBack(page);
            await sleep(timer(1000, 5000));
            await Comment(page)
            break;
        case "task 6":
            console.log("Activity 6 is running \n");
            await sleep(timer(1000, 5000));
            await Comment(page)
            await sleep(timer(60000, 300000));
            await sideAdsClick(page)
            break;
        case "task 7":
            console.log("Activity 7 is running \n");
            await sleep(timer(1000, 5000));
            await subscribe(page)
            await playBack(page);
            await sleep(timer(1000, 5000));
            await like(page)
            break;
        case "task 8":
            console.log("Activity 8 is running \n");
            await sleep(timer(1000, 5000));
            await subscribe(page)
            await pause(page);
            await sleep(timer(60000, 300000));
            await sideAdsClick(page)
            break;
        default:
            console.log("Default Activity is running \n");
            await sleep(timer(1000, 5000));
            await subscribe(page)
            await sleep(timer(1000, 5000));
            await pause(page);
    }
}

// This function runs the Bot Task
async function runTask(page, task, url, channelIndex) {
    switch (task) {
        case 'task 1':
            console.log('Task 1 is running \n');
            task1(page, url)
            break;
        case 'task 2':
            console.log('Task 2 is running \n');
            task2(page, channelIndex)
            break;
        case 'task 3':
            console.log('Task 3 is running \n');
            task3(page);
            break;
        default:
            console.log(`Default Task is running \n`);
            task1(page, url)
    }
}

// This Function initiates the bot Utility
async function utile(bot, botConfiguration, personCookies, channelIndex, region, personLocation) {

    let cookies = await getIndexedItem("assets/list-of-cookies-real.json", personCookies)
    let device = await getRandomItem("assets/list-of-device.json")
    let referer = await getRandomItem("assets/list-of-referers.json")
    let postUrl = await getListItem(urls[channelIndex])
    let task = await getListItem(Tasks, 2)
    let timeZone = region

    async function scheduleTask() {
        const browser = await bot.launch(botConfiguration)
        try {
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);

            await page.emulate(device)

            if (personLocation <= 24) {
                await page.authenticate({ username: "cmz6v", password: "n1f9is4l" })
            } else {
                await page.authenticate({ username: "wxyh4", password: "ha5jz4e0" })
            }

            await page.setCookie(...cookies)

            // await page.emulateTimezone(timeZone)

            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
                referer: referer
            });
            // await page.goto("https://whoer.net", { waitUntil: 'load', setTimeout: 0 })

            await runTask(page, task, postUrl, channelIndex)

            // This function gives the view duration
            setTimeout(async () => {
                await sendLog(`BOT ACTIVITY FOR PERSON ${personCookies + 1} HAS JUST ENDED SUCCESSFULLY... \n`)
                await browser.close()
                await sleep(timer(3600000, 18000000))
                // await scheduleTask()
            }, timer(360000, 540000))

        } catch (e) {
            console.log(`An error occurred while trying to load the Utility ${e.message} \n`);
        }
    }
    await scheduleTask()

}

module.exports.utile = utile;