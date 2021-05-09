import { FC, useContext, useEffect, useReducer } from 'react';
import DataGrid, { Column } from 'react-data-grid';
import _ from 'lodash';
import { AppContext } from '../../components/AppContext';
import { IBreadcrumbItem } from '../../components/Breadcrumb';
import { CellExpanderFormatter } from '../../components/CellExpanderFormatter';
import { IRecursiveItem, flatToHierarchy } from '../../utils/TreeUtil';
import DepartmentData from '../../data/DepartmentData.json';
import EmployeeData from '../../data/EmployeeData.json';

interface IEmployeeGridProp {
    breadcrumbs: IBreadcrumbItem[];
}

interface IEmployeeRow {
    id: number;
    name: string;
    sex: string;
    dob: Date;
    email: string;
    phone: string;
    department: number | null;
    position: string;
}

interface IDepartmentRow extends IRecursiveItem {
    name: string;
    children?: (IDepartmentRow | IEmployeeRow)[];
}

interface Action {
    type: 'toggleSubRow';
    id: string | number;
}

const flatRows = (DepartmentData || []).map((item) => {
    const { id, name, parentId } = item || {};
    return {
        id: `department-${id}`,
        name,
        parentId: parentId ? `department-${parentId}` : null,
        children: _.filter(EmployeeData, (employee) => employee.department === item.id),
    };
});
const defaultRows: IRecursiveItem[] = flatToHierarchy(flatRows);

function toggleSubRow(rows: IRecursiveItem[], id: string | number): IRecursiveItem[] {
    const rowIndex = rows.findIndex((r) => r.id === id);
    const row = rows[rowIndex];
    const { children } = row;
    if (!children) return rows;

    const newRows = [...rows];
    const isExpanded = !row.isExpanded;
    newRows[rowIndex] = { ...row, isExpanded: isExpanded };
    if (isExpanded) {
        newRows.splice(rowIndex + 1, 0, ...children);
    } else {
        newRows.splice(rowIndex + 1, children.length);
    }
    return newRows;
}

function reducer(rows: IRecursiveItem[], { type, id }: Action): IRecursiveItem[] {
    switch (type) {
        case 'toggleSubRow':
            return toggleSubRow(rows, id);
        default:
            return rows;
    }
}

const dateFormatter = new Intl.DateTimeFormat(navigator.language);

const EmployeeGrid: FC<IEmployeeGridProp> = (prop: IEmployeeGridProp) => {
    const { breadcrumbs } = prop || {};
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};

    const [rows, dispatch] = useReducer(reducer, defaultRows);
    console.log(rows);

    const columns: Column<IRecursiveItem>[] = [
        {
            key: 'name',
            name: 'Tên',
            width: 400,
            frozen: true,
            formatter(prop: { row: IRecursiveItem; isCellSelected: boolean }) {
                const { row, isCellSelected } = prop || {};
                const hasChildren = row.children !== undefined;
                const style = !hasChildren ? { marginLeft: 30 } : undefined;
                const rowData = row as IDepartmentRow;
                return (
                    <div className="tree-cell-expandable">
                        {hasChildren && (
                            <CellExpanderFormatter
                                isCellSelected={isCellSelected}
                                expanded={rowData?.isExpanded === true}
                                onCellExpand={() => dispatch({ id: row.id, type: 'toggleSubRow' })}
                            />
                        )}
                        <div className="rdg-cell-value">
                            <div style={style}>{rowData?.name}</div>
                        </div>
                    </div>
                );
            },
        },
        { key: 'email', name: 'Email' },
        {
            key: 'dob',
            name: 'Ngày sinh',
            formatter(prop: { row: IRecursiveItem; isCellSelected: boolean }) {
                const { row } = prop || {};
                const rowData = row as IEmployeeRow;
                return <>{rowData?.dob && dateFormatter.format(new Date(rowData?.dob))}</>;
            },
        },
        { key: 'position', name: 'Vị trí' },
    ];

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs(breadcrumbs || []);
    }, [breadcrumbs, setBreadcrumbs]);

    return <DataGrid className="base-grid" rows={rows} columns={columns} />;
};

export default EmployeeGrid;
