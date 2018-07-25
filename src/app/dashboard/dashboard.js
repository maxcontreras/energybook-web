/* eslint-disable */
import Header from '@/app/components/header/Header.vue';
import companies from '@/services/companies';
require('chartist-plugin-legend');

let companiesArr;
let companiesVal = {
    selected: null,
    options: [{ value: null, text: 'Selecciona una compañía' }]
}

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
        Header
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
    },
    data() {
        return {
            showChart: false,
            filters: [
                {
                    selected: null,
                    options: [
                        { value: null, text: 'Periodicidad' },
                        { value: 0, text: 'Día'},
                        { value: 1, text: 'Semana' },
                        { value: 2, text: 'Mes' },
                        { value: 3, text: 'Año' },
                    ]
                },
                companiesVal
            ],
            chartData: {
                labels: ["A", "B", "C", "", ""],
                series:[{
                    name: 'kWh',
                    data: [5, 2, 4, 2, 0],
                  },{
                    name: 'Costo',
                    data: [5.2, 3, 1, 4, 1],
                  }]
            },
            chartOptions: {
                lineSmooth: false,
                axisY: {
                    onlyInteger: true
                }
            },
            pieChartData: {
                series: [20, 10, 30, 40]
            },
            pieChartOptions: {
                donut: true,
                donutWidth: 60,
                startAngle: 270,
                total: 200,
                showLabel: false
            }
        };
    },
    methods: {
        displayChart(val) {
            this.showChart = true;

            if(this.filters[0].selected !== null) {
                let val = this.filters[0].selected;
                switch(val) {
                    case 0:
                    this.chartData.labels = todayLabels;
                    break;
                    case 1:
                    this.chartData.labels = weekLabels;
                    break;
                    case 2:
                    this.chartData.labels = monthLabels;
                    break;
                    case 3:
                    this.chartData.labels = yearLabels;
                    break;
                }
            }

            if(this.filters[1].selected !== null){
                let val = this.filters[1].selected;
                companies.find({ id: val }).then(res => console.log(res));
            }
        }
    }
};
