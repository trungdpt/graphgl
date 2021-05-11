import { FC, useContext, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { AppContext } from '../../components/AppContext';
import { IBreadcrumbItem } from '../../components/Breadcrumb';
import VirtualizedTable from '../../components/VirtualizedTable';
import { randomDate } from '../../utils/Util';

interface IEmployeeGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

interface IEmployeeRow {
    id: number | string;
    name: string;
    dob: string;
    email: string;
    department: string;
    position: string;
}

const dateFormatter = new Intl.DateTimeFormat(navigator.language);

const EmployeeGrid: FC<IEmployeeGridProp> = (prop: IEmployeeGridProp) => {
    const { breadcrumbs } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};
    const [dataSource, setDataSource] = useState<IEmployeeRow[]>([]);
    const columns = [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên',
            width: 200,
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
        },
        {
            key: 'dob',
            dataIndex: 'dob',
            title: 'Ngày sinh',

            // eslint-disable-next-line react/display-name
            render: (row: IEmployeeRow) => {
                return <>{row?.dob && dateFormatter.format(new Date(row?.dob))}</>;
            },
        },
        {
            key: 'position',
            dataIndex: 'position',
            title: 'Vị trí',
        },
    ];

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs(breadcrumbs || []);
        const rows: IEmployeeRow[] = [];
        for (let i = 0; i < 10000; i++) {
            const newRow: IEmployeeRow = {
                id: `other-${i}`,
                name: `employee-${i}`,
                email: 'email@example.com.vn',
                department: `department-${i}`,
                dob: randomDate(new Date('1990-01-01'), new Date('2000-12-31')).toString(),
                position: `position ${i}`,
            };
            rows.push(_.assign(newRow, { key: newRow.id }));
        }
        setDataSource(rows);
    }, [breadcrumbs, setBreadcrumbs]);

    const gridRef = useRef(null) as React.MutableRefObject<any>;
    const [gridHeight, setGridHeight] = useState(300);

    useEffect(() => {
        if (gridRef && gridRef.current) {
            const height = Math.max(gridRef?.current?.offsetHeight - 50, 0);
            setGridHeight(height);
        }
    }, [gridRef]);

    return (
        <div ref={gridRef} style={{ flex: 1 }}>
            <VirtualizedTable
                className="base-grid"
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                expandable={{ defaultExpandAllRows: true }}
                scroll={{ y: gridHeight }}
            />
        </div>
    );
};

export default EmployeeGrid;
