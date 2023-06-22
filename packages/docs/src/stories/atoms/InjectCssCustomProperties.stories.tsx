import { InjectCssCustomProperties } from '#ui/atoms/InjectCssCustomProperties'
import { type Meta, type StoryFn } from '@storybook/react'

const setup: Meta<typeof InjectCssCustomProperties> = {
  title: 'Atoms/InjectCssCustomProperties',
  component: InjectCssCustomProperties
}
export default setup

const Template: StoryFn<typeof InjectCssCustomProperties> = (args) => (
  <div>
    <InjectCssCustomProperties {...args} />
    <p className='text-primary'>I am a primary color text</p>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  primaryColor: '#ff0000'
}
