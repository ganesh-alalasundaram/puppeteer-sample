module.exports = {
    click: async function(page, selector){
        try{
            await page.waitForSelector(selector)
            await page.click(selector)
        }
        catch(error)
        {
            throw new Error(`Could not click the selector: ${selector}`)
        }
    },
    waitForElement: async function(page, selector){
        try{
            await page.waitForSelector(selector)
        }
        catch(error)
        {
            throw new Error(`Could not find the selector: ${selector}`)
        }
    },
    sendText: async function(page, selector, text){
        try{
            await page.waitForSelector(selector)
            await page.type(selector, text)
        }
        catch(error)
        {
            throw new Error(`Could not type into the selector: ${selector}`)
        }
    },
    loadUrl: async function(page, url){
            await page.goto(url, { waituntil: 'networkidle0'});
    },
    getText: async function(page, selector){
        try{
        await page.waitForSelector(selector)
        return page.$eval(selector, e => e.innerHTML)
        }catch(error)
        {
            throw new Error(`Could not get text from selector: ${selector}`)
        }
    },
    waitForText: async function(page, selector, text){
        try{
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => 
            document.querySelector(selector).innerText.includes(text),
            {},
            selector,
            text)
        }catch(error)
        {
            throw new Error(`Text: $(selector) not found for selector ${selector}`)
        }
    },
    pressKey: async function(page, key){
        try{
            await page.keyboard.press(key)
        }
        catch(error){
            throw new Error('Could not press the key $(key)')
        }
    },
    shouldExist: async function(page, selector){
        try{
            await page.waitForSelector(selector, { visible: true}, {timeout: 10000})
        }catch(error)
        {
            throw new Error(`The selector ${selector} does not exist`)
        }
    },
    shouldNotExist: async function(page, selector){
        try{
            await page.waitfor(()=>!document.querySelector(selector))
        }catch(error)
        {
            throw new Error(`Selector ${selector} should not exist`)
        }
    },
    getCount: async function(page, selector) {
        try{
           return page.$$eval(selector, items => items.length)
        }catch(error)
        {
            throw new Error(`Unable to get the selector ${selector}`)
        }
    }
}