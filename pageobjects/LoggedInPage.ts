import { Locator, Page } from "playwright-core";
import { ConfigUtils } from "../utils/config-utils";
import { expect } from "@playwright/test";
export class LoggedInPage{

    loggedInSuccessMessage:string
    congratulationsMessage:string
    logoutBtn:string
    configUtils:ConfigUtils
    constructor(){
        this.configUtils = new ConfigUtils()
        this.loggedInSuccessMessage = "//h1[@class='post-title']"
        this.congratulationsMessage = "//div[@class='post-content']//strong"
        this.logoutBtn = "//a[text()='Log out']"
        
    }

   async validateLoginSuccessMessage(page:Page, expectedMessage){
        await page.waitForSelector(this.loggedInSuccessMessage)
        await page.locator(this.loggedInSuccessMessage).textContent().then((message)=>{
            expect(message).toBe(expectedMessage)
        })
    }

    async validateCongratulationsMessage(page:Page, expectedMessage){
        await page.locator(this.congratulationsMessage).textContent().then((message)=>{
            expect(message).toBe(expectedMessage)
        })
    }

    async validateUrl(page:Page){
        await expect(page.url()).toContain("logged-in-successfully")
    }

    async clickLogoutBtn(page:Page){
        await page.waitForSelector(this.logoutBtn) 
        await page.locator(this.logoutBtn).click()
    }

    
}
