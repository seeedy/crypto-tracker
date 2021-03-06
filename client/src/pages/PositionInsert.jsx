import React, { useState, useEffect } from 'react';
import api from '../api';
import { PositionInsertForm } from '../components';
import css from './PositionInsert.module.css';

const PositionsInsert = () => {
    const [baseOptions, setBaseOptions] = useState([]);
    const [exchangeOptions, setExchangeOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const getExchanges = async () => {
            // get list of exchanges from coingecko api
            const data = await api.getExchanges();
            // set as options in form
            setExchangeOptions(data.data);
            setIsLoading(false);
        };
        getExchanges();
    }, []);

    const getTickersByExchange = async (exchange) => {
        setIsLoading(true);
        // get coin tickers by exchange from coingecko api
        const data = await api.getTickersByExchange(exchange);
        // get trading pair base and coin_id
        const baseOptions = data.data.tickers.map((elem) => {
            return { base: elem.base, id: elem.coin_id };
        });
        // use set of stringified values to filter for unique coins
        const baseOptionsSet = new Set();
        baseOptions.forEach((arr) => baseOptionsSet.add(JSON.stringify(arr)));
        const baseOptionsArr = Array.from(baseOptionsSet);
        const uniqueOptionsParsed = baseOptionsArr.map((arr) => JSON.parse(arr));
        const uniqueSortedOptions = uniqueOptionsParsed.sort((a, b) => (a.base > b.base ? 1 : -1));
        // set as options in form
        setBaseOptions(uniqueSortedOptions);
        setIsLoading(false);
    };

    const getCurrentPrice = async (values) => {
        setIsLoading(true);
        // get price of currently chosen base-target pair
        const { base, target } = values;
        await api.getCurrentPrice(base, target).then((res) => {
            console.log(res);
            const currentPrice = res.data[base][target];
            console.log({ currentPrice });
            // set as current price in form
            setCurrentPrice(currentPrice);
            setIsLoading(false);
        });
    };

    const insertPosition = async (values) => {
        console.log({ values });
        await api.insertPosition(values).then((res) => {
            window.alert(`Position inserted successfully`);
        });
    };

    return (
        <div className={css.container}>
            <PositionInsertForm
                insertPosition={insertPosition}
                baseOptions={baseOptions}
                exchangeOptions={exchangeOptions}
                currentPrice={currentPrice}
                getCurrentPrice={getCurrentPrice}
                getTickersByExchange={getTickersByExchange}
                isLoading={isLoading}
            />
        </div>
    );
};

export default PositionsInsert;
