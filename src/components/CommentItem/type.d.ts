import { ReactElement } from "react";
export type Props = {
    avatar?: ReactElement;
    username: string;
    date?: number;
    content?: string;
    moreAction?: ReactElement;
};
