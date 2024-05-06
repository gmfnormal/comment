import { ReplyItem } from '../types/CommentDTO';
import { ReplyType } from '../types/CommentVO';
export declare const getPanelData: (item: ReplyItem[]) => Record<string, ReplyItem[]>;
export declare const getInsertPanelData: (item: ReplyItem, data: Record<string, ReplyItem[]>, type: ReplyType) => Record<string, ReplyItem[]>;
export declare const getSum: (data: Record<string, ReplyItem[]>, positionList: string[]) => number;
export declare const checkInitStatus: (panelData: ReplyItem[]) => boolean;
export declare const getPanelId: (data: Record<string, ReplyItem[]>, position: string) => any;
/**
 * 接入方需要保证根节点是root
 * 结构不变的情况下滚动函数，慎改
 * @param activeId 定位的元素
 */
export declare const scrollScreen: (activeId: any, type: 'active' | 'select') => void;
export declare const getPositionPanelIds: (data: Record<string, ReplyItem[]>, position: string) => any[];
export declare const getPanelIdsPosition: (data: Record<string, ReplyItem[]>, activeId: string, focusIds: string[]) => string;
