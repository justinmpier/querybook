import React, { useCallback, useRef, useEffect } from 'react';

import { useEvent } from 'hooks/useEvent';
import { matchKeyPress } from 'lib/utils/keyboard';
import { Button, SoftButton, TextButton } from 'ui/Button/Button';
import { Modal } from 'ui/Modal/Modal';
import './ConfirmationMessage.scss';

export interface IConfirmationMessageProps {
    header?: React.ReactChild;
    message?: React.ReactChild;
    confirmText?: string;
    confirmIcon?: string;
    isDestructiveAction?: boolean;

    // event when user clicks confirm
    onConfirm?: () => any;
    // events when user clicks cancel
    onDismiss?: () => any;
    // common events between confirm and cancel
    onHide?: () => any;

    // The hide dismiss makes confirmation modal a notification modal
    hideDismiss?: boolean;
}

export const ConfirmationMessage: React.FunctionComponent<IConfirmationMessageProps> = ({
    header = 'Are you sure?',
    message = '',
    confirmText = 'Confirm',
    confirmIcon = 'check',
    isDestructiveAction = false,
    onConfirm,
    onDismiss,
    onHide,
    hideDismiss,
}) => {
    const selfRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        selfRef.current.focus();
    }, []);

    const onCloseButtonClick = useCallback(
        (confirm) => () => {
            if (confirm && onConfirm) {
                onConfirm();
            }
            if (!confirm && onDismiss) {
                onDismiss();
            }
            if (onHide) {
                onHide();
            }
        },
        [onConfirm, onDismiss, onHide]
    );

    const onEnterPress = useCallback(
        (evt: KeyboardEvent) => {
            if (matchKeyPress(evt, 'Enter')) {
                onCloseButtonClick(true)();
            }
        },
        [onCloseButtonClick]
    );

    useEvent('keydown', onEnterPress);

    const destructiveActionProps = isDestructiveAction ? {
        color: 'destructive',
    } : {};

    const actionButtons = [
        <TextButton
            onClick={onCloseButtonClick(false)}
            // icon="x"
            title="Cancel &amp; Dismiss"
            key="cancel"
            // color="cancel"
        />,
        <SoftButton
            // color="confirm"
            {...destructiveActionProps}
            onClick={onCloseButtonClick(true)}
            icon={confirmIcon}
            title={confirmText}
            key="confirm"
        />,
    ];

    if (hideDismiss) {
        actionButtons.shift();
    }

    const actionsDOM = actionButtons.map((buttonDOM, index) => (
        <div key={index}>{buttonDOM}</div>
    ));

    return (
        <Modal
            onHide={onHide}
            hideClose={true}
            className="message-size with-padding"
        >
            <div className="ConfirmationMessage" ref={selfRef} tabIndex={0}>
                <div className="confirmation-top">
                    <div className="confirmation-header">{header}</div>
                    <div className="confirmation-message">{message}</div>
                </div>
                <div className="confirmation-buttons horizontal-space-between">
                    {actionsDOM}
                </div>
            </div>
        </Modal>
    );
};
