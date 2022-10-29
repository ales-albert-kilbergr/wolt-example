import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WoltUiProvider } from './ui.provider';

const Story: ComponentMeta<typeof WoltUiProvider> = {
  component: WoltUiProvider,
  title: 'WoltUiProvider',
};
export default Story;

const Template: ComponentStory<typeof WoltUiProvider> = (args) => (
  <WoltUiProvider {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
