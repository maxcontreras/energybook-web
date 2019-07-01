/* eslint-disable */
import constants from '@/constants.json';
import moment from 'moment';

const defaultState = {
    metersAssigned: [],
    isAvailable: true,
    cfeValues: {
        date: moment().startOf('month').format(),
        citySelected: 0,
        prices: {
            base: constants.CFE.prices.base,
            middle: constants.CFE.prices.middle,
            peak: constants.CFE.prices.peak,
            capacity: constants.CFE.prices.capacity,
            distribution: constants.CFE.prices.distribution
        },
        currentDate: moment().startOf('month').format(),
        currentPrices: {
            base: constants.CFE.prices.base,
            middle: constants.CFE.prices.middle,
            peak: constants.CFE.prices.peak,
            capacity: constants.CFE.prices.capacity,
            distribution: constants.CFE.prices.distribution
        },
        GDMTO: {
            prices: { 
                price: constants.CFE.GDMTO.prices.price,
                capacity: constants.CFE.GDMTO.prices.capacity,
                distribution: constants.CFE.GDMTO.prices.distribution
            },
            currentPrices: {
                price: constants.CFE.GDMTO.prices.price,
                capacity: constants.CFE.GDMTO.prices.capacity,
                distribution: constants.CFE.GDMTO.prices.distribution
            }
        }
    }
};

export default defaultState;
