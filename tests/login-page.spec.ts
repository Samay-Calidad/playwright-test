import { test, expect } from '@playwright/test';
import {ConfigUtils} from "../utils/config-utils"
import { LoginPage } from '../pageobjects/LoginPage';
import { LoggedInPage } from '../pageobjects/LoggedInPage';

let configUtils = new ConfigUtils()
let loginPage  = new LoginPage()
let loggedInPage = new LoggedInPage()

test.beforeEach(async({page})=>{
    await loginPage.goToLoginPage(page)

})

test("Validate that login page shows error when invalid sername is entered",async ({page})=>{
    
    await loginPage.enterUsername(page,"samaythakkar")
    await loginPage.enterPassword(page,configUtils.getPassword("default_user"))
    await loginPage.clickSubmitBtn(page)
    await loginPage.validateErrorMessage(page,"Your username is invalid!")
})

test("Validate that login page shows error when invalid Password is entered",async ({page})=>{

    await loginPage.enterUsername(page,configUtils.getUsername("default_user"))
    await loginPage.enterPassword(page,"dasd")
    await loginPage.clickSubmitBtn(page)
    await loginPage.validateErrorMessage(page,"Your password is invalid!")
})

test("Validate that login page shows error when both username and Password are entered invalid",async ({page})=>{

    await loginPage.enterUsername(page,"adsfas")
    await loginPage.enterPassword(page,"dasd")
    await loginPage.clickSubmitBtn(page)
    await loginPage.validateErrorMessage(page,"Your username is invalid!")
})

test("Validate that user is able see login success when both username and Password are valid",async ({page})=>{

    await loginPage.enterUsername(page,configUtils.getUsername("default_user"))
    await loginPage.enterPassword(page,configUtils.getPassword("default_user"))
    await loginPage.clickSubmitBtn(page)
    await loggedInPage.validateLoginSuccessMessage(page,"Logged In Successfully")
})

test("Validate that user is able see congratulations message when both username and Password are valid",async ({page})=>{

    await loginPage.enterUsername(page,configUtils.getUsername("default_user"))
    await loginPage.enterPassword(page,configUtils.getPassword("default_user"))
    await loginPage.clickSubmitBtn(page)
    await loggedInPage.validateCongratulationsMessage(page,"Congratulations student. You successfully logged in!")

})


test("Validate that correct url is displayed when user is logged in",async ({page})=>{

    await loginPage.enterUsername(page,configUtils.getUsername("default_user"))
    await loginPage.enterPassword(page,configUtils.getPassword("default_user"))
    await loginPage.clickSubmitBtn(page)
    await loggedInPage.validateUrl(page)
})


test("Validate that user is logged out when clicked on logout btn",async ({page})=>{

    await loginPage.enterUsername(page,configUtils.getUsername("default_user"))
    await loginPage.enterPassword(page,configUtils.getPassword("default_user"))
    await loginPage.clickSubmitBtn(page)
    await loggedInPage.clickLogoutBtn(page)
    await loginPage.validateUrl(page)
})