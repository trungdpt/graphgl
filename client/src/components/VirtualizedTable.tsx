import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';

const rowHeight = 40;

const VirtualizedTable = (props: Parameters<typeof Table>[0]): JSX.Element => {
    const { columns, scroll } = props || {};
    const [tableWidth, setTableWidth] = useState(0);

    const widthColumnCount = (columns || []).filter(({ width }) => !width).length;
    const mergedColumns = (columns || []).map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor(tableWidth / widthColumnCount),
        };
    });

    const gridRef = useRef<Grid>() as React.MutableRefObject<Grid>;

    const resetVirtualGrid = () => {
        gridRef.current &&
            gridRef.current.resetAfterIndices({
                rowIndex: 0,
                columnIndex: 0,
                shouldForceUpdate: true,
            });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList = (rawData: any, { scrollbarSize, onScroll }: any): JSX.Element => {
        const totalHeight = rawData.length * rowHeight;
        const scrolly = scroll?.y || 0;
        return (
            <Grid
                ref={gridRef}
                className="virtual-grid"
                columnCount={mergedColumns.length}
                columnWidth={(index: number) => {
                    const { width } = mergedColumns[index];
                    return totalHeight > scrolly && index === mergedColumns.length - 1
                        ? (width as number) - scrollbarSize - 1
                        : (width as number);
                }}
                height={scrolly as number}
                rowCount={rawData.length}
                rowHeight={() => rowHeight}
                width={tableWidth}
                onScroll={({ scrollLeft }: { scrollLeft: number }) => {
                    onScroll({ scrollLeft });
                }}
            >
                {({
                    columnIndex,
                    rowIndex,
                    style,
                }: {
                    columnIndex: number;
                    rowIndex: number;
                    style: React.CSSProperties;
                }) => {
                    return (
                        <div
                            className={classNames('virtual-table-cell', {
                                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
                            })}
                            style={style}
                        >
                            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
                        </div>
                    );
                }}
            </Grid>
        );
    };

    return (
        <ResizeObserver
            onResize={({ width }) => {
                setTableWidth(width);
            }}
        >
            <Table
                {...props}
                className="virtual-table"
                columns={mergedColumns}
                pagination={false}
                components={{
                    body: renderVirtualList,
                }}
            />
        </ResizeObserver>
    );
};

export default VirtualizedTable;
