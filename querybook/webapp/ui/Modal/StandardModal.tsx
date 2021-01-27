import clsx from 'clsx';
import React from 'react';

import { useMounted } from 'hooks/useMounted';
import { IconButton } from 'ui/Button/IconButton';
import { IStandardModalProps } from './types';
import { useDebounce } from 'hooks/useDebounce';
import { useAppBlur } from 'hooks/ui/useAppBlur';

// Blurring takes extra time so disabling by default
const BLUR_MODAL_BACKGROUNDS = false;
const HIDE_CLOSE_PREVENTS_CLICK = false;

export const StandardModal: React.FunctionComponent<IStandardModalProps> = ({
    hideClose = false,
    className = '',
    children,
    onHide,
    title = '',
}) => {
    if (BLUR_MODAL_BACKGROUNDS) {
        useAppBlur();
    }
    const mounted = useMounted();
    // Note: Ask about this before merging
    const active = useDebounce(mounted, 1); // delay the mount by 1ms

    const modalClassName = clsx({
        StandardModal: true,
        fullscreen: true,
        'is-active': active,
        [className]: Boolean(className),
    });

    const closeButton = hideClose ? null : (
        <IconButton
            className="Modal-close"
            aria-label="close"
            icon="x"
            onClick={onHide}
        />
    );

    const titleDOM =
        title !== null && closeButton ? (
            <div className="Modal-title">{title}</div>
        ) : null;

    return (
        <div className={modalClassName}>
            <div
                className="Modal-background fullscreen"
                onClick={hideClose && HIDE_CLOSE_PREVENTS_CLICK ? null : onHide}
            />
            <div className="Modal-box">
                {titleDOM}
                <div className="Modal-content">{children}</div>
                {closeButton}
            </div>
        </div>
    );
};
