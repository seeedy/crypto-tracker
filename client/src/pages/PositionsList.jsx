import React, { useState, useEffect, useMemo } from 'react';
import { TableContainer } from '../components';
// import { SelectColumnFilter } from '../components/Table/filters';
import api, { getCurrentPrices } from '../api';
import { format, parseISO } from 'date-fns';
import { Button, Container } from 'react-bootstrap';

import queryString from 'query-string';

const PositionsList = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // fetch positions data from mongoDB
            const res = await api.getAllPositions();
            // define data for positions list table
            const { data } = res.data;
            setData(data);
            console.log('data', data);
            /* currentPairs = await data.map((position) => position.pair.toLowerCase());
            console.log({ currentPairs }); */

            /* const getCurrentPrices = async (currentPairs) => {
                const query = queryString.stringify({ ids: currentPairs });
                console.log({ query });
                // const res = await api.getCurrentPrices(currentPairs);
            };
            getCurrentPrices(currentPairs); */
        };
        fetchData();
    }, []);

    const UpdateButton = () => {
        return <Button variant='light'>Update</Button>;
    };

    // Button to delete position from mongoDB
    const DeletePosition = ({ id }) => {
        const deletePosition = (e) => {
            e.preventDefault();
            console.log(id);
            if (
                window.confirm(`
                Do you want to delete ${id} position?
            `)
            ) {
                api.deletePositionById(id);
                window.location.reload();
            }
        };
        return (
            <Button onClick={deletePosition} variant='danger'>
                Delete
            </Button>
        );
    };

    // define columns for the positions list table
    const columns = useMemo(
        () => [
            {
                id: 'exchange',
                Header: 'Exchange',
                accessor: 'exchange',
            },
            {
                id: 'pair',
                Header: 'Pair',
                accessor: 'pair',
            },
            {
                id: 'direction',
                Header: 'Direction',
                accessor: 'direction',
                disableFilters: true,
            },
            {
                id: 'size',
                Header: 'Size',
                accessor: 'size',
                disableFilters: true,
            },
            {
                id: 'entry',
                Header: 'Entry',
                accessor: 'entry',
                disableFilters: true,
            },
            {
                id: 'createdAt',
                Header: 'Time opened',
                accessor: 'createdAt',
                disableFilters: true,
                Cell: ({ cell }) => {
                    const { value } = cell;
                    return <div>{format(parseISO(value), 'yyyy-MM-dd HH:mm')}</div>;
                },
            },
            {
                id: 'update',
                Header: '',
                accessor: '',
                disableFilters: true,
                Cell: (props) => {
                    return (
                        <div>
                            <UpdateButton />
                        </div>
                    );
                },
            },
            {
                id: 'delete',
                Header: '',
                accessor: '',
                disableFilters: true,
                Cell: (props) => {
                    return (
                        <div>
                            <DeletePosition id={props.row.original._id} />
                        </div>
                    );
                },
            },
        ],
        []
    );

    if (!data.length) return <div>Loading...</div>;

    console.log({ data, columns });

    return (
        <Container>
            <TableContainer columns={columns} data={data} />
        </Container>
    );
};

export default PositionsList;
