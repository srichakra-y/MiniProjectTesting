exports.PopupHandling = 
    class PopupHandling{
        constructor(page){
            this.page = page;
            this.loginPopup = this.page.locator("._30XB9F");
            // this.loginPopup = this.page.getByRole("button", { name: 'X' });
            this.reloadPage = this.page.locator("#retry_btn");
            // this.reloadPageImage = productPage.locator("#IMG_3");
            // this.websiteRush = page.getByAltText("surge");
            this.someThingWentWrong = this.page.locator(".errorSubtitle");
        }

        async LoginPopupHandling(){
            if(await this.loginPopup.isVisible()){
                await this.loginPopup.click();
            }
        }

        async refreshingPage(){
            if(await this.reloadPage.isVisible()){
                await this.page.reload();
                await this.page.waitForTimeout(3000);
                // await this.page.waitForLoadState('domcontentloaded');
            }
        }

        async someThingWentWrongRefresh(){
            if(await this.someThingWentWrong.isVisible()){
                await this.page.reload();
                await this.page.waitForTimeout(3000);
            }
        }
    }