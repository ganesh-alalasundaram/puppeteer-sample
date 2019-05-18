const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
expect.extend({ toMatchImageSnapshot })

describe('My Image Test', () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless:true,
        })
    page = await browser.newPage()
    })

    afterAll(async () => {
        await browser.close()
    })

    test('Homepage Snapshot', async() => {
        await page.goto('https://www.bing.com')
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot({
            failureThreshold:5000,
            failureThresholdType:"pixel"
        })
    })

    test('Element Snapshot', async () => {
        await page.goto('https://www.bing.com')
        const h1 = await page.waitForSelector('#sbox')
        const image = await h1.screenshot()
        expect(image).toMatchImageSnapshot()
    })
})