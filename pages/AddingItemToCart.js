import { BasePage } from "./BasePage";

exports.addingItemToCart = 
    class addingItemToCart extends BasePage{
        constructor(productPage){
            super(productPage);
            this.productPage = productPage;
            this.addToCartButton =  productPage.locator('role=button[name="Add to cart"]');
            this.totalAmount = productPage.locator(".PWd9A7.xvz6eC");
            this.promiseFee = productPage.locator(".b5rp0W");
        }

        async addCartButton() {
            await this.refreshIfNeeded();
            await this.addToCartButton.waitFor({state: "visible"});
            await Promise.all([
                // await this.addToCartButton.scrollIntoView(),    //This method scrolls the UI to bring the targeted element into the center of the view.
                await this.productPage.waitForTimeout(4000),       //await this.productPage.waitFor
                await this.addToCartButton.click()
            ]);
        }

        async cartAmount(){
            const totalPrice = await this.totalAmount.textContent();
            return totalPrice
        }

        async calculatedAmountValidation(){
            let totalCost = 0;
            const count = await this.promiseFee.count();
            for(let i = 0; i < count; i++){
                const priceInText = await this.promiseFee.nth(i).textContent();
                const price = parseInt(priceInText.replace(/[^0-9]/g,""),10);
                if(i==0 || i==count-1){
                    totalCost += price;
                }
                else{
                    totalCost -= price;
                }
            }
            return totalCost;
        }

        async checkingDispalyedCalculateAmount(addedProductsPrice,cartValueFinal){
            if(addedProductsPrice == cartValueFinal){
                return "Amount is Properly Calculated";
              }else{
                return "Amount is not Calculated Properly";
              }
        }
    }
