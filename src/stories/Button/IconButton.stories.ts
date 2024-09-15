import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import IconButton from '../../components/IconButton/IconButton';

const meta = {
  title: 'Button/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconPath: { control: 'text', description: '아이콘 경로' },
    iconAlt: { control: 'text', description: '아이콘 설명' },
    onClick: {
      action: 'clicked',
      description: '아이콘 버튼 클릭 시 실행되는 함수',
    },
  },
  args: {
    iconPath: '/icons/ic-square-white.svg',
    iconAlt: '아이콘',
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
