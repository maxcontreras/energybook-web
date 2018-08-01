/* eslint-disable */
import companies from '@/services/companies';
import Header from '@/app/components/header/Header.vue';
import Table from '@/app/components/table/Table.vue';
import Constants from '@/constants';

const companyStatus = Constants.Companies.status

export default {
    components: {
        Header, Table
    },
    data() {
        return {
            companies: [],
            items: [],
            fields: [{
                key: 'Nombre',
                sortable: true
            }, 'Teléfono', 'Fecha de Registro', 'No. de Empleados', 'Tipo', 'Estado'],
            newCompany: {
                company_name: '',
                phone: '',
                size: 0,
                businessLine: '',
                name: '',
                lastname: '',
                email: ''
            }
        }
    },

    beforeMount() {
        this.getCompanies();
    },

    methods: {
        getCompanies() {
            companies.find({}).then(res => {
                this.companies = res;
                this.companies.forEach(company => {
                    this.items.push({
                        'Nombre': company.company_name,
                        'Teléfono': company.phone,
                        'Fecha de Registro': moment(company.created_at).format('LL'),
                        'No. de Empleados': company.size,
                        'Tipo': company.company_type,
                        'Estado': companyStatus[company.status]
                    })
                });
            });
        },
        createCompany() {
            console.log('create');
        }
    }
}