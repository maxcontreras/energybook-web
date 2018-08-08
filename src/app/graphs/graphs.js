/* eslint-disable */
import Chart from '@/app/components/chart/Chart.vue';
import Header from '@/app/components/header/Header.vue';

export default {
    components: {
        Chart, Header
    },
    data() {
        return {

        }
    },
    methods: {
        changePeriod(period) {
            this.$refs.mainChart.changePeriod(period);
        }
    }
}