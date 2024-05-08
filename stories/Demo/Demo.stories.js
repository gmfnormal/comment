import { curDemo } from "./Demo";
import { defaultProps } from './Demo'
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Example/Demo',
    component: curDemo,
    tags: ['autodocs'],
};


export const Default = {
    args: defaultProps
}