import { render, screen } from '@testing-library/svelte'
import { writable } from 'svelte/store'
import { describe, expect, it, vi } from 'vitest'

import NavLink from './nav-link.svelte'

vi.mock('$app/stores', () => ({ page: writable({ url: { pathname: 'current/path' } }) }))

describe('NavLink', () => {
	const href = 'some/internal/link'

	const renderComponent = () => render(NavLink, { props: { href } })

	it('renders a link with the correct href attribute', () => {
		renderComponent()
		expect(screen.getByRole('link')).toBeVisible()
	})
})
