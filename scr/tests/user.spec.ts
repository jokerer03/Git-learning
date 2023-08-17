// @ts-check
const { test, expect } = require('@playwright/test');
import { faker } from '@faker-js/faker';

test.describe('user',()=>{
const date = Date.now();
  const {username, password ,email} = {
    username: faker.internet.userName().replace(/[_'.]/g,'').toLowerCase().slice(0, 10),
    password: faker.internet.password(),
    email: `q${date}@example.com`
  };

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  })

let N_ew = 23;

  test ('should succesfuly sign up', async({page})=>{

    await page.locator('a', { hasText: "Sign up" }).click();

    await expect(page).toHaveURL('/register');

    await page.locator('input').first().type(username);
    await page.locator('input').nth(1).type(email);
    await page.locator('input').last().type(password);

    await page.locator('button', { hasText: "Sign up" }).click();

    await expect (page).toHaveURL(`/`);

    await expect(page.locator('li a.nav-link',{ hasText: "Home"})).toBeVisible();
    await expect(page.locator('li a.nav-link',{ hasText: "New Article"})).toBeVisible();   
    await expect(page.locator('li a.nav-link',{ hasText: "Settings"})).toBeVisible();

    const name = await page.locator('[data-qa-id="site-header"] li a').last();
    await expect((await name.textContent())?.trim()).toEqual(username); 
    // // //?.The optional chaining operator If any of the properties in the chain are null or undefined, the expression short-circuits 
    // // //and returns undefined without throwing an error. 

    await page.pause();
  })

test ('should succesfuly sign in', async({page})=>{

    await page.locator('a', { hasText: "Sign in" }).click();

    await expect(page).toHaveURL('/login');

    await page.locator('input').first().type(email);
    await page.locator('input').last().type(password);

    await page.locator('button', { hasText: "Sign in" }).click();

    await expect (page).toHaveURL(`/`);

    await expect(page.locator(`nav.navbar li.nav-item`)).toHaveCount(4);

    const headers = await page.locator(`nav.navbar li.nav-item`).all()
    const headersText = await Promise.all(headers.map(async(header) => (await header.textContent())?.trim()));

    await expect(headersText).toEqual(['Home','New Article', 'Settings', username]) 
    // await expect(page.locator('li a.nav-link',{ hasText: "Home"})).toBeVisible();
    // await expect(page.locator('li a.nav-link',{ hasText: "New Article"})).toBeVisible();   
    // await expect(page.locator('li a.nav-link',{ hasText: "Settings"})).toBeVisible();

    // const name = await page.locator('[data-qa-id="site-header"] li a').last();
    // await expect((await name.textContent())?.trim()).toEqual(username); 
    //?.The optional chaining operator If any of the properties in the chain are null or undefined, the expression short-circuits 
    //and returns undefined without throwing an error. 
  })
});

test ('should log ot succesfuly', async({page})=>{

})


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
