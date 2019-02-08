/* eslint-disable */
import constants from '@/constants.json';
import moment from 'moment';

const defaultState = {
    meters: [],
    metersAssigned: [],
    cfeValues: {
        date: moment().startOf('month').format(),
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
        }
    }
};

export default defaultState;
