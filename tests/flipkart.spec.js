import fs from 'fs';
import {test, expect, chromium} from "@playwright/test";
import { SearchingForProducts } from "../pages/SearchingForProducts";
import { addingItemToCart } from "../pages/AddingItemToCart";
import process from "../Input/InputValues.json";

test("Homepage", async() => {
    try{
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        
        //Creating object for searchingForProducts class 
        const searchingItem = new SearchingForProducts(page,context);

        //Navigating to https://www.flipkart.com/
        await searchingItem.gotoLoginPage();

        //Searching for home appliances in search bar of home page
        await searchingItem.searchProduct(process.FirstProductSearching);

        //Clicking the first product in the home appliances search results opens it in a new tab—handle this by creating a new page instance.
        const productPage1 = await searchingItem.CreatingNewPage();

        //Creating object for addingTemToCart class 
        const addFirstProductToCart = new addingItemToCart(productPage1);
        // await productPage2.waitForLoadState('domcontentloaded');

        //Clicking on add to cart button 
        await addFirstProductToCart.addCartButton();

        //Printing the total amount of the cart in console
        const cartValueFirst = await addFirstProductToCart.cartAmount();
        console.log("Cart total after first item is added",cartValueFirst);

        //closing the page2 newly opened page
        await productPage1.close();

        //going back to the home page of the flipkart
        await page.bringToFront();

        // await page.waitForTimeout(3000);

        const searchingSecondItem = new SearchingForProducts(page,context);
        
        //searching for kitchen appliances
        await searchingSecondItem.searchProduct(process.SecondProductSearching);
        // console.log("Opening second product page...");

        const productPage2 = await searchingSecondItem.CreatingNewPage();
        // console.log("Second product page loaded:", !!productPage2);

        const addSecondProductToCart = new addingItemToCart(productPage2)
        await productPage2.waitForLoadState('domcontentloaded');

        //adding the first item from the search results to cart now there should be two items in cart
        await addSecondProductToCart.addCartButton();

        //checking the revised total
        const cartValue = await addSecondProductToCart.cartAmount();
        const cartValueFinal = cartValue.replace(/[^0-9]/g,"");
        console.log("Updated cart total after adding the second item",cartValueFinal);

        const addedProductsPrice = await addSecondProductToCart.calculatedAmountValidation();
        const addedProductsPriceString = addedProductsPrice.toString();
        console.log("Net total after applying all charges and discounts",addedProductsPriceString)
        
        const verification = await addSecondProductToCart.checkingDispalyedCalculateAmount(cartValueFinal, addedProductsPrice);
        console.log(verification);

        const results = {
            "Cart total after first item is added": cartValueFirst,
            "Updated cart total after adding the second item": cartValueFinal,  
            "Net total after applying all charges and discounts": addedProductsPriceString,
            "Amount calculation status": verification
        }

        // writing the data into json    
        fs.writeFileSync("Output/results.json",JSON.stringify(results,null,2));

        await productPage2.close();
        await page.close();
    }catch(error){
        console.error("Error during test execution:", error);
        fs.writeFileSync("Output/ErrorLog.json", JSON.stringify({ error: error.message }, null, 2));
    }
});