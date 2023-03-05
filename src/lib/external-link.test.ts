import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'

import ExternalLink from './external-link.svelte'

describe('ExternalLink', () => {
	const href = 'some/external/link'
	const renderComponent = () => render(ExternalLink, { props: { href } })

	it('renders a link with the correct href', () => {
		renderComponent()
		expect(screen.getByRole('link')).toHaveAttribute('href', href)
	})

	it('renders an external link with the correct rels', () => {
		renderComponent()
		expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
		expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
	})
})
