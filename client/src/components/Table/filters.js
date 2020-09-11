import React from 'react';

const Filter = ({ column }) => {
    return <div style={{ marginTop: 5 }}>{column.canFilter && column.render('Filter')}</div>;
};

const DefaultColumnFilter = ({
    column: {
        filterValue,
        setFilter,
        preFilteredRows: { length },
    },
}) => (
    <input
        value={filterValue || ''}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`search (${length}) ...`}
    />
);

const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <input
            type='select'
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value=''>All</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </input>
    );
};

export { Filter, DefaultColumnFilter, SelectColumnFilter };
