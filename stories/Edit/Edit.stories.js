import { Edit } from "./Edit";
import { defaultProps } from './Edit'
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Example/Edit',
    component: Edit,
    tags: ['autodocs'],
};


export const Default = {
    args: defaultProps
}