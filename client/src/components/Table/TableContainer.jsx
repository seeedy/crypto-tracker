import React from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
        },
        useFilters,
        useSortBy
    );

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? '⬆' : '⬇') : '';
    };

    return (
        <Table bordered hover variant='dark' {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => {
                            return (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div>
                                        {column.render('Header')}
                                        {generateSortingIndicator(column)}
                                    </div>
                                    <Filter column={column} />
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TableContainer;
