/* eslint-disable */
import { parseDateTime, parseDayName } from '@/utils/dateTime';

export default {
    methods: {
        parseXAxis(dates, periodSelected, daysDifference, intervalSelected) {
            let tickInterval = 1;
            const xAxis = dates.map(date => {
                let time = parseDateTime(date);
                const day = parseDayName(date);
                const fullDate = parseDayName(date);
                time = time.slice(0, 5);
                if (periodSelected === -1) {
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${fullDate} ${date.substring(0, 2)} ${time}`;
                }else if (periodSelected == 0) {
                    return `${time}`;
                } else if (periodSelected == 1) {
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${day} ${time}`;
                } else {
                    if (time === '00:00') {
                        time = '';
                    }
                    return `${day} ${date.substring(0, 2)} ${time}`;
                }
            });
            switch (periodSelected) {
                case -1:
                    let interval = 0;
                    if (daysDifference === 0) interval = 1;
                    else if (daysDifference <= 2) interval = 12;
                    else interval = 24;
                    tickInterval = parseInt(3600/intervalSelected * interval);
                break;
                case 1:
                    tickInterval = parseInt(3600/intervalSelected * 2);
                break;
                case 2:
                    tickInterval = parseInt(3600/intervalSelected * 24);
                break;
                default:
                    tickInterval = parseInt(3600/intervalSelected);
            }
            return { xAxis, tickInterval };
        }
    }
}