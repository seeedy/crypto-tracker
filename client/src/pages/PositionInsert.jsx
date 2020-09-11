import React, { useState, useEffect } from 'react';
import api from '../api';
import { PositionInsertForm } from '../components';
import css from './PositionInsert.module.css';

const PositionsInsert = () => {
    const [baseOptions, setBaseOptions] = useState([]);
    const [targetOptions, setTargetOptions] = useState([]);
    const [exchangeOptions, setExchangeOptions] = useState([]);

    useEffect(() => {
        const getExchanges = async () => {
            // get list of exchanges from coingecko api
            const data = await api.getExchanges();
            // set as options in form
            setExchangeOptions(data.data);
        };
        getExchanges();
    }, []);

    const getTickersByExchange = async (exchange) => {
        // get coin tickers by exchange from coingecko api
        const data = await api.getTickersByExchange(exchange);
        console.log({ data });
        // get trading pair base and coin_id
        const baseOptions = data.data.tickers.map((elem) => {
            return { base: elem.base, id: elem.coin_id };
        });
        // use set of stringified values to filter for unique coins
        const baseOptionsSet = new Set();
        baseOptions.forEach((arr) => baseOptionsSet.add(JSON.stringify(arr)));
        console.log({ baseOptionsSet });

        const baseOptionsArr = Array.from(baseOptionsSet);
        const uniqueOptionsParsed = baseOptionsArr.map((arr) => JSON.parse(arr));
        console.log({ uniqueOptionsParsed });

        const uniqueSortedOptions = uniqueOptionsParsed.sort((a, b) => (a.base > b.base ? 1 : -1));
        console.log({ uniqueSortedOptions });
        // set as options in form
        setBaseOptions(uniqueSortedOptions);
    };

    const getTargetsByBase = async (base) => {
        console.log({ base });
        const data = await api.getTickersByExchange(base);
        const targetOptions = data.data.tickers.filter((elem) => elem.base === base);
        console.log({ targetOptions });
    };

    const insertPosition = async (values) => {
        await api.insertPosition(values).then((res) => {
            window.alert(`Position inserted successfully`);
        });
    };
    return (
        <div className={css.container}>
            <PositionInsertForm
                insertPosition={insertPosition}
                baseOptions={baseOptions}
                targetOptions={targetOptions}
                exchangeOptions={exchangeOptions}
                getTickersByExchange={getTickersByExchange}
                getTargetsByBase={getTargetsByBase}
            />
        </div>
    );
};

export default PositionsInsert;
