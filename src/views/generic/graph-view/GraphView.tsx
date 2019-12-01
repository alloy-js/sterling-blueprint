import React from 'react';
import { ISterlingViewProps, ViewSide } from '../../../SterlingTypes';
import GraphViewSidebar from './GraphViewSidebar';
import GraphViewStage from './GraphViewStage';

interface IGraphViewState {
    sidebarSide: ViewSide
}

class GraphView extends React.Component<ISterlingViewProps, IGraphViewState> {

    constructor (props: ISterlingViewProps) {

        super(props);

        this.state = {
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const state = this.state;

        const sidebar = (
            <GraphViewSidebar
                dataset={null}
                side={state.sidebarSide}/>
        );

        const stage = (
            <GraphViewStage/>
        );

        return (
            state.sidebarSide === ViewSide.Left
                ? <>{sidebar}{stage}</>
                : <>{stage}{sidebar}</>
        );

    }

}

export default GraphView;

