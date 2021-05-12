import { FC, memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import avatar from '../../assets/avatar.png';

interface IOrgNodeData {
    label: string;
}

interface IOrgNodeProp {
    data: IOrgNodeData;
}

const OrgNode: FC<IOrgNodeProp> = (prop: IOrgNodeProp) => {
    const { data } = prop || {};
    const { label } = data || {};
    return (
        <div className="org-node">
            <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
            <div className="org-node-content">
                <img className="org-node-avatar" src={avatar} alt="" />
                <div className="org-node-label">{label}</div>
            </div>
        </div>
    );
};

export default memo(OrgNode);
