import {test} from '@playwright/test';

test("Homepage", async() => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        
        //Creating object for searchingForProducts class 
        const searchingItem = new SearchingForProducts(page,context);

        //Navigating to https://www.flipkart.com/
        await searchingItem.gotoLoginPage();
        
    
});