import React from 'react';
import {
    HorizonalAlignment,
    LayoutDirection,
    ViewSide
} from '../../../SterlingTypes';
import SterlingView from '../SterlingView';
import SterlingTable from './SterlingTable';
import TableViewSidebar from './TableViewSidebar';
import TableViewStage from './TableViewStage';

interface ITableViewProps {
    tables: SterlingTable[] | null
    visible: boolean,
    welcome: string
}

interface ITableViewState {
    collapseLayout: boolean,
    collapseSidebar: boolean,
    collapseTables: boolean,
    sidebarSide: ViewSide
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    constructor (props: ITableViewProps) {

        super(props);

        this.state = {
            collapseLayout: false,
            collapseSidebar: false,
            collapseTables: false,
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;

        if (!props.visible) return null;

        const stage = (
            <TableViewStage
                horizontalAlign={HorizonalAlignment.Left}
                layoutDirection={LayoutDirection.Row}
                tables={props.tables}/>
        );

        const sidebar = (
            <TableViewSidebar/>
        );

        return (
            <SterlingView
                icon={'th'}
                showPlaceholder={!props.tables}
                welcome={props.welcome}>
                {
                    state.sidebarSide === ViewSide.Left
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </SterlingView>
        );

    }

}

export default TableView;
