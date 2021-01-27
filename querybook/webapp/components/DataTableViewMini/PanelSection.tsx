import React, { useCallback } from 'react';
import styled from 'styled-components';
import './PanelSection.scss';

export interface IPanelSectionProps {
    title: string;
    hideIfNoContent?: boolean;
}

const PanelContentWrapper = styled.div`
    padding: 0px calc(2 * var(--padding));

    ${({ isOpen }) =>
        isOpen
            ? ''
            : `
        display: none;
    `};
`;

export const PanelSection: React.FunctionComponent<IPanelSectionProps> = ({
    title,
    children,
    hideIfNoContent,
}) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const toggleSectionOpen = useCallback(() => {
        setIsOpen((o) => !o);
    }, []);

    if (hideIfNoContent && !children) {
        return null;
    }

    const headerDOM = (
        <div onClick={toggleSectionOpen}>
            <div className="PanelSection-panel-title horizontal-space-between">
                {title}
                <span>
                    <i
                        className={
                            'mr8 fa fa-angle-' + (isOpen ? 'down' : 'right')
                        }
                    />
                </span>
            </div>
        </div>
    );
    return (
        <div className="PanelSection">
            {headerDOM}
            <PanelContentWrapper isOpen={isOpen}>
                {children}
            </PanelContentWrapper>
        </div>
    );
};

const SubPanelTitle = styled.p`
    text-transform: capitalize;
    user-select: none;
    color: var(--ui-text-color);
`;

const StyledSubPanelSection = styled.div`
    margin-bottom: 10px;
`;

export const SubPanelSection: React.FunctionComponent<{
    title: string;
    hideIfNoContent?: boolean;
}> = ({ title, children, hideIfNoContent }) =>
    hideIfNoContent && !children ? null : (
        <StyledSubPanelSection>
            <div>
                <SubPanelTitle>{title}</SubPanelTitle>
            </div>
            <div>{children}</div>
        </StyledSubPanelSection>
    );
