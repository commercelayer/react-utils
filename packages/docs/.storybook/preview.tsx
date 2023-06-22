import { Container } from '#ui/atoms/Container'
import { PARAM_KEY } from '.storybook/addon-container/constants'
import type { Decorator, Parameters } from '@storybook/react'

import '../../mfe-elements/src/styles/global.css'

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}

export const withContainer: Decorator = (Story, context) => {
  const { containerEnabled } = context.globals

  if (containerEnabled === true) {
    return (
      <Container minHeight={false}>
        <Story />
      </Container>
    )
  }

  return <Story />
}

export const decorators: Decorator[] = [
  withContainer
]

export const globals = {
  [PARAM_KEY]: true,
}

