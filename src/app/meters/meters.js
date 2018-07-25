/* eslint-disable */
import meters from '@/services/meters';
import Header from '@/app/components/header/Header.vue';

export default {
    components: {
        Header
    },
    data() {
        return {
            meters: []
        }
    },

    beforeMount() {
        this.getMeters();
    },

    methods: {
        getMeters() {
            meters.find({}).then(res => this.meters = res);
        }
    }
}