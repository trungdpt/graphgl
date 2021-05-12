import { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    isNode,
    ConnectionLineType,
    Position,
    Controls,
} from 'react-flow-renderer';
import dagre from 'dagre';

import initialElements from './initial-elements';
import OrgNode from './OrgNode';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 200;
const nodeHeight = 40;
const nodeTypes = {
    orgNode: OrgNode,
};

const getLayoutedElements = (elements: any, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el: any) => {
        if (isNode(el)) {
            dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
        } else {
            dagreGraph.setEdge(el.source, el.target);
        }
    });

    dagre.layout(dagreGraph);

    return elements.map((el: any) => {
        if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id);
            el.targetPosition = isHorizontal ? ('left' as Position) : ('top' as Position);
            el.sourcePosition = isHorizontal ? ('right' as Position) : ('bottom' as Position);

            // unfortunately we need this little hack to pass a slighltiy different position
            // to notify react flow about the change. More over we are shifting the dagre node position
            // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
            el.position = {
                x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                y: nodeWithPosition.y - nodeHeight / 2,
            };
        }

        return el;
    });
};

const layoutedElements = getLayoutedElements(initialElements);

const LayoutFlow = () => {
    const [reactflowInstance, setReactflowInstance] = useState<any>();
    const [elements, setElements] = useState(layoutedElements);
    const onConnect = (params: any) =>
        setElements((els: any) => addEdge({ ...params, type: 'smoothstep', animated: true }, els));
    const onElementsRemove = (elementsToRemove: any) =>
        setElements((els: any) => removeElements(elementsToRemove, els));

    useEffect(() => {
        if (reactflowInstance && elements.length > 0) {
            reactflowInstance.fitView();
            reactflowInstance.zoomTo(1);
        }
    }, [reactflowInstance, elements.length]);

    const onLoad = useCallback(
        (rfi: any) => {
            if (!reactflowInstance) {
                setReactflowInstance(rfi);
            }
        },
        [reactflowInstance],
    );

    return (
        <div className="layoutflow">
            <ReactFlowProvider>
                <ReactFlow
                    elements={elements}
                    nodeTypes={nodeTypes}
                    onLoad={onLoad}
                    onConnect={onConnect}
                    onElementsRemove={onElementsRemove}
                    connectionLineType={'smoothstep' as ConnectionLineType}
                >
                    <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};

export default LayoutFlow;
