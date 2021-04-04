import React from 'react';

import { ButtonProps, SoftButton } from 'ui/Button/Button';

import './ToggleButton.scss';

export interface IToggleButtonProps extends ButtonProps {
    title: string;
    checked: boolean;
    onClick: (...args: any) => any;
}

export const ToggleButton: React.FunctionComponent<IToggleButtonProps> = ({
    onClick,
    checked,
    title,
    ...otherProps
}) => (
    <div
        className={`ToggleButton ${checked ? 'checked' : ''}`}
        onClick={() => onClick(!checked)}
    >
        <SoftButton {...otherProps}>{title}</SoftButton>
    </div>
);
