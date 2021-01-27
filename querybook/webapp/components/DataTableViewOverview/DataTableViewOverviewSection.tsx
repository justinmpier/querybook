import React from 'react';
import { Title } from 'ui/Title/Title';
import { Divider } from 'ui/Divider/Divider';
import './DataTableViewOverviewSection.scss';

interface IProps {
    title: React.ReactNode;
}
export const DataTableViewOverviewSection: React.FC<IProps> = ({
    title,
    children,
}) =>
    children ? (
        <div className="DataTableViewOverviewSection">
            <div className="overview-section-top">
                <Title size={5}>{title}</Title>
            </div>
            <div className="overview-section-content">{children}</div>
        </div>
    ) : null;
