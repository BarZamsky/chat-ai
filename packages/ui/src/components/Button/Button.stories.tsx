import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'
import { Button, ButtonProps } from './button'
import { AcclaimIcon } from '../icons/academicons-acclaim'

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta

const Template: StoryFn<ButtonProps> = ({ children, ...args }) => (
    <div className="flex flex-col gap-4">
        <Button variant="default">
            <AcclaimIcon />
        </Button>
        <Button variant="secondary">secondary</Button>
    </div>
)

export const Default = Template.bind({})
