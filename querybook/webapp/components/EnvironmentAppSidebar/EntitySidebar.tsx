import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { currentEnvironmentSelector } from 'redux/environment/selector';
import { queryMetastoresSelector } from 'redux/dataSources/selector';
import { Entity } from './types';

import { InfoMenuButton } from 'components/InfoMenuButton/InfoMenuButton';
import { QueryEngineStatusButton } from 'components/QueryEngineStatusButton/QueryEngineStatusButton';
import { QueryExecutionButton } from 'components/QueryExecutionButton/QueryExecutionButton';
import { SearchContainer } from 'components/Search/SearchContainer';
import { UserMenu } from 'components/UserMenu/UserMenu';

import { Divider } from 'ui/Divider/Divider';
import { IconButton } from 'ui/Button/IconButton';
import { Link } from 'ui/Link/Link';

import './EntitySidebar.scss';

interface IEntitySidebarProps {
    selectedEntity: Entity;
    onSelectEntity: (entity: Entity) => any;
}

export const EntitySidebar: React.FunctionComponent<IEntitySidebarProps> = React.memo(
    ({ selectedEntity, onSelectEntity }) => {
        const environment = useSelector(currentEnvironmentSelector);
        const queryMetastores = useSelector(queryMetastoresSelector);

        return (
            <div className="EntitySidebar">
                <div className="EntitySidebar-top apps-list flex-column">
                    <Route
                        render={({ location }) => (
                            <>
                                <Link to={`/${environment.name}/`}>
                                    <IconButton
                                        icon="home"
                                        tooltip="Home"
                                        tooltipPos="right"
                                        standardSize
                                        active={
                                            location.pathname ===
                                            `/${environment.name}/`
                                        }
                                    />
                                </Link>
                                <SearchContainer />
                                <Link to={`/${environment.name}/adhoc/`}>
                                    <div>
                                        <IconButton
                                            icon="edit"
                                            tooltip={'Adhoc Query'}
                                            tooltipPos="right"
                                            standardSize
                                            active={location.pathname.startsWith(
                                                `/${environment.name}/adhoc/`
                                            )}
                                            title="Query"
                                        />
                                    </div>
                                </Link>
                            </>
                        )}
                    />
                </div>
                <div className="EntitySidebar-middle flex-column">
                    <IconButton
                        className="EntitySidebar-sidebar-mode-icon"
                        icon="file"
                        tooltip="DataDocs"
                        tooltipPos="right"
                        standardSize
                        active={selectedEntity === 'datadoc'}
                        onClick={() => {
                            onSelectEntity('datadoc');
                        }}
                        title="Docs"
                    />
                    {queryMetastores.length ? (
                        <IconButton
                            className="EntitySidebar-sidebar-mode-icon"
                            icon="book"
                            tooltip="Tables"
                            tooltipPos="right"
                            standardSize
                            active={selectedEntity === 'table'}
                            onClick={() => onSelectEntity('table')}
                            title="Tables"
                        />
                    ) : null}
                    <IconButton
                        className="EntitySidebar-sidebar-mode-icon"
                        icon="code"
                        tooltip="Snippets"
                        tooltipPos="right"
                        standardSize
                        active={selectedEntity === 'snippet'}
                        onClick={() => onSelectEntity('snippet')}
                        title="Snips"
                    />
                    <QueryExecutionButton
                        onClick={() => onSelectEntity('execution')}
                        active={selectedEntity === 'execution'}
                    />
                </div>
                <div className="EntitySidebar-bottom sidebar-footer flex-column">
                    <QueryEngineStatusButton />
                    <UserMenu />
                    <InfoMenuButton />
                </div>
            </div>
        );
    }
);
