import { INIT_ID } from '../constants';
import { ReplyItem } from '../types/CommentDTO';
import { ReplyType } from '../types/CommentVO';
import { LAYOUT_ID, SCROLL_DRAWER_ID, ID_PREFIX } from '../constants';

export const getPanelData = (item: ReplyItem[]): Record<string, ReplyItem[]> =>
    item?.reduce((pre, cur) => {
        const { panel_id } = cur;
        if (pre[panel_id] !== undefined) {
            pre[panel_id] = [...pre[panel_id], cur];
        } else {
            pre[panel_id] = [cur];
        }
        return pre;
    }, {});

export const getInsertPanelData = (
    item: ReplyItem,
    data: Record<string, ReplyItem[]>,
    type: ReplyType
): Record<string, ReplyItem[]> => {
    const { panel_id } = item;
    return { ...data, [panel_id]: type === 'reply' ? [...data[panel_id], item] : [item] };
};

export const getSum = (data: Record<string, ReplyItem[]>, positionList: string[]) => {
    if (!data || !positionList) {
        return 0;
    }
    return Object.keys(data).reduce((pre, cur) => {
        const { position } = data[cur]?.[0];
        if (positionList.includes(position)) {
            return pre + data[cur]?.length ?? 0;
        }
        return pre;
    }, 0);
};

export const checkInitStatus = (panelData: ReplyItem[]) => {
    if (panelData.length === 1 && panelData[0]?.id === INIT_ID) {
        return true;
    }
    return false;
};

export const getPanelId = (data: Record<string, ReplyItem[]>, position: string) => {
    let panelId;
    for (const v of Object.keys(data)) {
        let panelData = data[v]?.[0];
        if (panelData?.position === position) {
            panelId = panelData?.panel_id;
            break;
        }
    }
    return panelId;
};
/**
 * 接入方需要保证根节点是root
 * 结构不变的情况下滚动函数，慎改
 * @param activeId 定位的元素
 */
export const scrollScreen = (activeId, type: 'active' | 'select') => {
    const height = document.getElementById('root').clientHeight;
    const container = document.getElementById(LAYOUT_ID);
    const activePanel = document.getElementById(`${ID_PREFIX}${activeId}_panel`);
    const activeEdit = document.getElementById(`${ID_PREFIX}${activeId}_edit`);
    const scrollDrawer = document.getElementById(SCROLL_DRAWER_ID);
    const drawerContainer = document.getElementById(`${ID_PREFIX}layout-drawer-container`);
    const drawerScrollDistance =
        type === 'active'
            ? (activeEdit?.offsetParent as HTMLElement)?.offsetTop + activePanel?.clientHeight - 320
            : (activeEdit?.offsetParent as HTMLElement)?.offsetTop - 40;
    /**
     * 评论内容的高度和评论区高度不同时
     */
    if (drawerContainer.clientHeight > container.clientHeight) {
        scrollDrawer.scrollTo(0, drawerScrollDistance);
        /**
         * 评论区无法向上更多滚动
         * 距离展示评论内容高度 = 评论区高度 - 评论滚动高度 - 整体高度
         */
        const diffDistance = drawerContainer.clientHeight - drawerScrollDistance - height;
        if (diffDistance < 0) {
            window.scrollTo({ top: Math.abs(diffDistance) });
        } else if (drawerScrollDistance < window.scrollY) {
            /**
             * 评论区无法继续向下滚动
             */
            window.scrollTo({
                top: drawerScrollDistance,
            });
        } else {
            window.scrollTo({
                top: 0,
            });
        }
    } else {
        window.scrollTo({
            top: drawerScrollDistance,
        });
    }
};

export const getPositionPanelIds = (data: Record<string, ReplyItem[]>, position: string) => {
    if (!data) {
        return [];
    }
    let panelIds = [];
    for (const v of Object.keys(data)) {
        let panelData = data[v]?.[0];
        if (panelData?.position === position) {
            panelIds = [...panelIds, panelData?.panel_id];
        }
    }
    return panelIds;
};

export const getPanelIdsPosition = (
    data: Record<string, ReplyItem[]>,
    activeId: string,
    focusIds: string[]
) => {
    if (!data) {
        return '';
    }
    let position = '';
    if (activeId) {
        position = data?.[activeId]?.[0]?.position;
    }
    if (focusIds?.length > 0) {
        position = data?.[focusIds[0]]?.[0]?.position;
    }
    return position;
};