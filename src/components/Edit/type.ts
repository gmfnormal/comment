import { Descendant } from "slate";
import { EditableProps } from "slate-react/dist/components/editable";

export type onEnterParams = {
    value: Descendant[];
    success?: (res: any) => void;
    fail?: (e: any) => void;
}

export type Props = {
    initialValue?: Descendant[];
    placeholder?: string;
    editableProps?: EditableProps;
    clearOnBlur?: boolean;
    usePlaceHolder?: boolean;
    onEnter?: (params: onEnterParams) => void;
    onBlur?: () => void;
}