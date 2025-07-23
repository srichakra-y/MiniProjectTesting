import { expect } from "@playwright/test";
import {BasePage} from "./BasePage";

exports.SearchingForProducts =
    class SearchingForProducts extends BasePage{
        constructor(page,context){
            super(page);
            this.page = page;
            this.context = context;
            this.searchBar = page.getByPlaceholder("Search for Products, Brands and More");
            // this.optionAvailable = page.locator("//*[@id='container']/div/div[1]/div/div/div/div/div/div/div/div/div/div[1]/div/div/header/div[1]/div[2]/form/ul");
            this.firstItem = ".VJA3rP"; 
        }

        async gotoLoginPage(){
            try{
                await this.page.goto("https://www.flipkart.com/");
                await this.homePageRefresh();
                await this.refreshIfNeeded();
                await this.handleLoginPopup();
                await expect(this.page).toHaveTitle('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!');
                // console.log("Home Page validated");
            }catch(error){
                console.error("Error in gotoLoginPage():", error);
                throw error
            }
        }

        async searchProduct(productCategory){
            await this.searchBar.fill(productCategory);
            await this.refreshIfNeeded();
            await this.searchBar.press("Enter");
            // await this.page.locator(this.optionAvailable).waitFor({state:"visible"});  
            // const dropdown = await this.page.locator(this.optionAvailable);      //some times while using this method it is not selecting the first search from the drop down
            // await this.page.waitForTimeout(3000);
            // await this.page.pause()
            // await dropdown.nth(0).click();
        }

        async CreatingNewPage(){
            const [page2] = await Promise.all([
                this.context.waitForEvent('page'), // start listening for the new page
                await this.refreshIfNeeded(),
                this.clickingProduct() // calling the clickingProduct method for clicking the first item from the results
            ]);
            return page2;
        }

        async clickingProduct(){
            await this.page.waitForSelector(this.firstItem);
            const firstItemInResult = await this.page.locator(this.firstItem).nth(0);
            await firstItemInResult.click();
        }
    }