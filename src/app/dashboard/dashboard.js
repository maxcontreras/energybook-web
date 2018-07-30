/* eslint-disable */
import Header from '@/app/components/header/Header.vue';
import companies from '@/services/companies';
import Chart from './chart';

let companiesVal = {
    selected: null,
    options: [{ value: null, text: 'Selecciona una compañía' }]
}

let companiesArr;
companies.find({}).then(res => {
    companiesArr = res;
    companiesArr.forEach(company => {
        companiesVal.options.push({ value: company.id, text: company.company_name });
    });
});

const todayLabels = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'];
const weekLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const monthLabels = ['1', '5', '10', '15', '20', '25', '30'];
const yearLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default {
    components: {
        Header, Chart
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isManager() {
            return this.$store.state.isManager;
        },
        filters() {
            return this.isAdmin? [companiesVal]:[];
        },
        currentFormattedDate() {
            return moment(this.currentDate).format('dddd, MMMM Do YYYY');
        }
    },
    data() {
        return {
            showChart: false,
            buttons: [{
                selected: 0,
                options: [
                    { value: 0, text: 'Día' },
                    { value: 1, text: 'Semana' },
                    { value: 2, text: 'Mes' },
                    { value: 3, text: 'Año' },
                ]
            }],
            chartData: {
                labels: todayLabels,
                datasets: [
                    {
                        label: 'kWh',
                        fill: false,
                        backgroundColor: '#87ad36',
                        borderColor: '#87ad36',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    },
                    {
                        label: 'Costo',
                        fill: false,
                        backgroundColor: '#00A6A6',
                        borderColor: '#00A6A6',
                        data: [44, 50, 22, 69, 15, 44, 19, 70, 50, 30, 32, 21]
                    }
                ]
            },
            chartOptions: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            },
            currentPeriod: 0,
            periodText: 'day',
            currentDate: moment()
        };
    },
    methods: {
        displayChart(period, company) {
            this.showChart = true;

            if (period !== null) {
                this.currentPeriod = period;
                switch(period) {
                    case 0:
                    this.chartData.labels = todayLabels;
                    this.periodText = 'day';
                    break;
                    case 1:
                    this.chartData.labels = weekLabels;
                    this.periodText = 'week';
                    break;
                    case 2:
                    this.chartData.labels = monthLabels;
                    this.periodText = 'month';
                    break;
                    case 3:
                    this.chartData.labels = yearLabels;
                    this.periodText = 'year';
                    break;
                }
            }

            if (company !== null) {
                companies.find({ id: company }).then(res => console.log(res));
            }

            this.$refs.mainChart.renderChart(this.chartData, this.chartOptions);
        },
        previous() {
            this.currentDate = moment(this.currentDate).subtract(1, this.periodText);
        },
        next() {
            this.currentDate = moment(this.currentDate).add(1, this.periodText);
        }
    }
};
