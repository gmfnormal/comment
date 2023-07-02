import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

export type ParagraphElement = {
  type: 'paragraph';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  children: Descendant[];
};

export type Employee = {
    type: 'employee';
    children: Descendant[];
}

export type CustomElement = ParagraphElement;

export type CustomText = {
    text: string;
    // 字体大小
    size?: number;
    // 字体颜色
    color?: string;
    // 背景颜色
    bgColor?: string;
  };

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}