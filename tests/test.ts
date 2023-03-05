import { expect, test } from '@playwright/test'

test('about page has link to dataset', async ({ page }) => {
	await page.goto('/about')
	await expect(page.getByRole('link', { name: 'FAOSTAT website' })).toHaveAttribute(
		'href',
		'https://www.fao.org/faostat/en/#data/GT',
	)
})
