import { PopupHandling } from './PopupHandling';

exports.BasePage = 
    class BasePage{
        constructor(page){
            this.page = page;
            this.PopupHandling = new PopupHandling(page);
        }

        async handleLoginPopup(){
            await this.PopupHandling.LoginPopupHandling();
        }

        async refreshIfNeeded(){
            await this.PopupHandling.refreshingPage();
        }

        async homePageRefresh(){
            await this.PopupHandling.someThingWentWrongRefresh();
        }
    }
