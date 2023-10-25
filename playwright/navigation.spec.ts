import test, { expect } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled!' }),
  ).toBeVisible();

  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling cat' }).nth(2),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Accept' }).click();

  await page.getByRole('link', { name: 'Animals' }).click();
  await page.waitForURL('http://localhost:3000/animals');
  await expect(page).toHaveURL('http://localhost:3000/animals');

  await expect(
    page.getByRole('heading', { name: 'These are my animals' }),
  ).toBeVisible();

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  const animals = [
    { id: 1, firstName: 'lucia', type: 'Lion', accessory: 'Car' },
    { id: 2, firstName: 'macca', type: 'Dog', accessory: 'Comb' },
    { id: 3, firstName: 'jojo', type: 'Dodo', accessory: 'Dojo' },
    { id: 4, firstName: 'flo', type: 'Parrot', accessory: 'carrot' },
    { id: 5, firstName: 'bili', type: 'Capybara', accessory: 'Pen' },
  ];

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

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('http://localhost:3000/fruits');
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: '🍎 Apple' }).click();
  await page.waitForURL('http://localhost:3000/fruits/1');
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await page.getByRole('textbox').fill('This is a comment');
  await page.getByRole('button', { name: 'Add comment' }).click();
  await expect(
    page.locator('div').filter({ hasText: 'This is a comment' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('http://localhost:3000/fruits');
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(
    page.locator('[data-test-id="fruit-name-Apple"] > div'),
  ).toHaveText('This is a comment');
});
