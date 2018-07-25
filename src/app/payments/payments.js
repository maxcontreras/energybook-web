/* eslint-disable */
import payments from '@/services/payments';
import Header from '@/app/components/header/Header.vue';

export default {
    components: {
        Header
    },
    data() {
        return {
            payments: []
        }
    },

    beforeMount() {
        this.getPayments();
    },

    methods: {
        getPayments() {
            payments.find({}).then(res => this.payments = res);
        }
    }
}