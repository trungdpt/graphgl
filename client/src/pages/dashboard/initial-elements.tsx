const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export default [
    {
        id: '1',
        type: 'input',
        data: { label: 'DG1-Ext' },
        position,
    },
    {
        id: '2',
        type: 'output',
        data: { label: 'Vũ Nguyễn' },
        position,
    },
    {
        id: '2a',
        data: { label: 'DC3-Ext' },
        position,
    },
    {
        id: '2b',
        data: { label: 'DC8-Ext' },
        position,
    },
    {
        id: '2c',
        data: { label: 'DC13-Ext' },
        position,
    },
    {
        id: '3a',
        type: 'output',
        data: { label: 'Vi Đặng' },
        position,
    },
    {
        id: '3b',
        type: 'output',
        data: { label: 'Trung Đồng' },
        position,
    },
    {
        id: '3c',
        type: 'output',
        data: { label: 'Tú Trần' },
        position,
    },
    {
        id: '3d',
        data: { label: 'Tài Lê' },
        position,
    },
    {
        id: '3e',
        data: { label: 'Hiên Trần' },
        position,
    },
    {
        id: '3f',
        data: { label: 'Nhân Lê' },
        position,
    },
    {
        id: '3g',
        data: { label: 'Thiên Nguyễn' },
        position,
    },
    {
        id: '3h',
        data: { label: 'Liễu Võ' },
        position,
    },
    {
        id: '3i',
        data: { label: 'An Trịnh' },
        position,
    },
    { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
    { id: 'e12a', source: '1', target: '2a', type: edgeType, animated: true },
    { id: 'e12b', source: '1', target: '2b', type: edgeType, animated: true },
    { id: 'e12c', source: '1', target: '2c', type: edgeType, animated: true },
    { id: 'e2a3a', source: '2a', target: '3a', type: edgeType, animated: true },
    { id: 'e2b3b', source: '2b', target: '3b', type: edgeType, animated: true },
    { id: 'e2c3c', source: '2c', target: '3c', type: edgeType, animated: true },
    { id: 'e2a3d', source: '2a', target: '3d', type: edgeType, animated: true },
    { id: 'e2b3e', source: '2b', target: '3e', type: edgeType, animated: true },
    { id: 'e2b3f', source: '2b', target: '3f', type: edgeType, animated: true },
    { id: 'e2b3g', source: '2b', target: '3g', type: edgeType, animated: true },
    { id: 'e2b3h', source: '2b', target: '3h', type: edgeType, animated: true },
    { id: 'e2b3i', source: '2b', target: '3i', type: edgeType, animated: true },
];
