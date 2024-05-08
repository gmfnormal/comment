import React, { createContext, FC, useState, useEffect } from 'react';
import { TDrawerContext, TCommentContext, TCommentProviderProps } from '../types/CommentVO';
import useCommentPanelList from '../hooks/useCommentPanelData';
import CommentDB from '../service/db';
export const DrawerContext = createContext<TDrawerContext>({
    setDrawerOpen: () => { },
    isDrawerOpen: false,
} as unknown as TDrawerContext);

export const DrawerProvider: FC = ({ children }) => {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <DrawerContext.Provider
            value={{
                isDrawerOpen,
                setDrawerOpen,
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};

export const CommentContext = createContext<TCommentContext>({} as unknown as TCommentContext);

const CommentProvider: FC<TCommentProviderProps> = ({ children, ...rest }) => {
    const { identifier, username, useIndexedDB } = rest;
    if (useIndexedDB) {
        const dBInstance = new CommentDB();
        (window as any).__commentDbInstance = dBInstance;
    }
    const [
        { ready, success, error },
        { data, activeId, positionList, focusIds },
        {
            setActiveId,
            setFocusIds,
            replyComment,
            removeComment,
            addComment,
            cleanComment,
            initPositionList,
        },
    ] = useCommentPanelList({
        identifier,
        username,
        useIndexedDB,
    });

    useEffect(() => {
        if (useIndexedDB) {
            const dBInstance = new CommentDB();
            (window as any).__commentDbInstance = dBInstance;
        }
    }, [])

    return (
        <CommentContext.Provider
            value={{
                ready,
                success,
                error,
                activeId,
                data,
                username,
                positionList,
                identifier,
                focusIds,
                setFocusIds,
                addComment,
                removeComment,
                initPositionList,
                setActiveId,
                cleanComment,
                replyComment,
            }}
        >
            <DrawerProvider>{children}</DrawerProvider>
        </CommentContext.Provider>
    );
};

export default CommentProvider;