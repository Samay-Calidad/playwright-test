import { Locator, Page } from "playwright-core";
import { ConfigUtils } from "../utils/config-utils";
import { expect } from "@playwright/test";
export class LoginPage{

    usernameTextbox:string
    passwordTextbox:string
    submitBtn:string
    errorMsg:string
    configUtils:ConfigUtils

    constructor(){
        this.configUtils = new ConfigUtils()
        this.usernameTextbox = "#username"
        this.passwordTextbox = "#password"
        this.submitBtn = "#submit"
        this.errorMsg = "#error"
        
    }

    async goToLoginPage(page:Page){
       await page.goto(this.configUtils.getURL())
    }

    async enterUsername(page:Page,username){
        await page.locator(this.usernameTextbox).fill(username)
    }

    async enterPassword(page:Page,password){
        await page.locator(this.passwordTextbox).fill(password)
    }

    async clickSubmitBtn(page:Page){
        await page.locator(this.submitBtn).click()
    }

    async validateErrorMessage(page:Page,expectedErrorMessage){
        await page.locator(this.errorMsg).textContent().then((message)=>{
            console.log(message)
            expect(message).toBe(expectedErrorMessage)
        })
    }

    async validateUrl(page:Page){
      await expect(page.url()).toContain("practice-test-login")
    }

}