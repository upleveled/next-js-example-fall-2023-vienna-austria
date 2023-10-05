import test, { expect } from '@playwright/test';

const animals = [
  { id: 1, firstName: 'lucia', type: 'Lion', accessory: 'Car' },
  { id: 2, firstName: 'macca', type: 'Dog', accessory: 'Comb' },
  { id: 3, firstName: 'jojo', type: 'Dodo', accessory: 'Dojo' },
  { id: 4, firstName: 'flo', type: 'Parrot', accessory: 'carrot' },
  { id: 5, firstName: 'bili', type: 'Capybara', accessory: 'Pen' },
];

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(
    page.getByRole('heading', { name: 'Hello Upleveled!' }),
  ).toBeVisible();

  // await expect(page.locator('h1')).toHaveText('Hello UpLeveled!');

  await page.getByRole('button', { name: 'Accept' }).click();

  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(2),
  ).toBeVisible();
  await expect(page.getByAltText('Smiling cat').first()).toBeVisible();

  await page.getByRole('link', { name: 'Animals' }).click();
  await page.waitForURL('http://localhost:3000/animals');
  await expect(page).toHaveURL('http://localhost:3000/animals');
  await expect(
    page.getByRole('heading', { name: 'These are my animals' }),
  ).toBeVisible();
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  // await expect(
  //   page.locator('[data-test-id^="animal-type-"]').first(),
  // ).toHaveText('lucia');

  // await expect(page.getByRole('img', { name: 'lucia' })).toBeVisible();

  for (const animal of animals) {
    await expect(page.getByTestId(`animal-type-${animal.type}`)).toHaveText(
      animal.firstName,
    );
    await expect(
      page.getByRole('img', { name: animal.firstName }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'lucia' }).click();
  await page.waitForURL('http://localhost:3000/animals/1');
  await expect(page).toHaveURL('http://localhost:3000/animals/1');

  await expect(page.getByRole('heading')).toHaveText('lucia');
  await expect(page.getByRole('heading', { name: 'lucia' })).toBeVisible();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('http://localhost:3000/fruits');
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: '🍎 Apple' }).click();
  await page.waitForURL('http://localhost:3000/fruits/1');
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');
  await page.getByRole('textbox').fill('this is a comment');
  await page.getByRole('button', { name: 'Add comment' }).click();
  await expect(
    page.locator('div').filter({ hasText: 'this is a comment' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('http://localhost:3000/fruits');
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: '🍌 Banana' }).click();
  await page.waitForURL('http://localhost:3000/fruits/2');
  await expect(page).toHaveURL('http://localhost:3000/fruits/2');
  await page.getByRole('textbox').fill('this is a comment');
  await page.getByRole('button', { name: 'Add comment' }).click();
  await expect(
    page.locator('div').filter({ hasText: 'this is a comment' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('http://localhost:3000/fruits');
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  // await expect(
  //   page.getByTestId('fruit-name-Apple').getByText('this is a comment'),
  // ).toBeVisible();

  await expect(
    page.locator('[data-test-id="fruit-name-Apple"] > div'),
  ).toHaveText('this is a comment');
});
