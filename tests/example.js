const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('../lib/config')
const click = require('../lib/helpers').click
const wait = require('../lib/helpers').waitForElement
const sendText = require('../lib/helpers').sendText
const loadUrl = require('../lib/helpers').loadUrl
const generateRandomNumber = require('../lib/utils').generateRandomNumber
const generateRandomText = require('../lib/utils').generateRandomText
const getCount = require('../lib/helpers').getCount
const homePage = require('../pages/homepage')

describe('My First Sample', () => {
    let browser
    let page
    before(async function() {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.sloMo,
            devtools: config.isDevTools,
            timeout:config.launchTimeout
        })
        page = await browser.newPage()
        await page.setViewport({
            width:config.viewportWidth,
            height:config.viewportHeight
        })
    })
    after(async function(){
        await browser.close()
    })
    it('Launch Bing Page', async () => {
        await loadUrl(page, config.baseUrl)
        await wait(page, homePage.search_box)
        const url = await page.url();
        const title = await page.title();
        expect(url).to.eq(config.baseUrl)
        expect(title).to.string(homePage.title)
        const linkscount = await getCount(page, '#sc_hdu > li')
        expect(linkscount).to.eq(8)
    })
    it('Browser Reload', async () => {
        await loadUrl(page, config.baseUrl)
        await wait(page, homePage.search_box)
        await page.reload();
        await wait(page, homePage.frame_bing)
        const title = await page.title();
        expect(title).to.string(homePage.title)
    })
    it('Search for a string', async () => {
        await loadUrl(page, config.baseUrl)
        await wait(page, homePage.search_box)
        await sendText(page, homePage.search_box, homePage.search_text)
        await click(page, '#sa_5003')
        await wait(page, homePage.search_results)
    })
    it('Generates a random number', async() => {
        console.log(generateRandomNumber(20))
    })
    it('Generates a random text', async() => {
        console.log(generateRandomText())
    })

})