import axios from 'axios';

const mongoAPI = axios.create({
    baseURL: 'http://localhost:3000/api',
});

const coingeckoAPI = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
});

export const insertPosition = (data) => mongoAPI.post('/position', data);
export const getAllPositions = () => mongoAPI.get('/positions');
export const deletePositionById = (id) => mongoAPI.delete(`/position/${id}`);

export const getAllPairs = () => coingeckoAPI.get('/coins/list');
export const getCurrentPrices = (pairs) => coingeckoAPI.get(`/simple/price/${pairs}`);
export const getExchanges = () => coingeckoAPI.get('/exchanges/list');
export const getTickersByExchange = (id) => coingeckoAPI.get(`/exchanges/${id}/tickers`);

const apis = {
    insertPosition,
    getAllPositions,
    deletePositionById,
    getAllPairs,
    getCurrentPrices,
    getExchanges,
    getTickersByExchange,
};

export default apis;
