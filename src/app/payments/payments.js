/* eslint-disable */
import payments from '@/services/payments';
import Header from '@/app/components/header/Header.vue';
import VTable from '@/app/components/VTable.vue';

export default {
    components: {
        Header, VTable
    },
    data() {
        return {
            payments: [],
            items: [],
            fields: [{
                key: 'Compañía',
                sortable: true
            }, {
                key: 'Fecha',
                sortable: true
             }, 'Mes', 'Pagado']
        }
    },

    beforeMount() {
        this.getPayments();
    },

    methods: {
        getPayments() {
            payments.find({
                filter: {
                    include: ['company']
                }
            }).then(res => {
                this.payments = res;
                this.payments.forEach(payment => {
                    this.items.push({
                        'Compañía':payment.company.company_name,
                        'Fecha':moment(payment.created_at).format('LL'),
                        'Mes':moment(payment.created_at).format('MMMM'),
                        'Pagado': payment.paid? 'Sí': 'No'
                    })
                });
            });
        }
    }
}
