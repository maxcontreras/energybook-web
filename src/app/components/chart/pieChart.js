/* eslint-disable */
import { Pie } from 'vue-chartjs';

export default {
    extends: Pie,
    props: ['data', 'options'],
    computed: {
        datasets() {
            return this.data.datasets[0].data
        }
    },
    watch: {
        datasets: function() {
            if (this.datasets.length > 0) {
                this.renderChart(this.data, this.options);
            }
        }
    },
    mounted() {
        this.renderChart(this.data, this.options);
    }
}