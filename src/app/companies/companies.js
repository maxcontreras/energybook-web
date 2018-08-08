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
                key: 'name',
                sortable: true,
                label: 'Nombre'
            }, { 
                label :'Teléfono',
                key: 'phone'
            }, {
                label: 'Fecha de Registro',
                key: 'created_at'
            }, {
                label: 'No. de Empleados',
                key: 'size'
            }, {
                label:'Tipo',
                key: 'type'
            }, {
                label:'Estado',
                key: 'status'}],
            newCompany: {
                company_name: '',
                phone: '',
                size: '',
                businessLine: '',
                created_at: new Date(),
                legal_name: ''
            },
            newManager: {
                name: '',
                lastname: '',
                email: ''
            },
            newUser: {
                name: '',
                lastname: '',
                email: ''
            },
            toggle: {
                newManager: true,
                newUser: true
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
                    this.addCompany(company);
                });
            });
        },
        createCompany(evt) {
            /*evt.preventDefault();
            alert('Please enter your name')
            console.log('create');*/
            this.newCompany.company_type = 1;
            delete this.newCompany.businessLine;
            companies.create({data:this.newCompany}).then(newCompany => {
                this.addCompany(newCompany);
                this.newCompany = {};
            });
        },
        addCompany(company) {
            this.items.push({
                name : company.company_name,
                phone: company.phone,
                created_at: moment(company.created_at).format('LL'),
                size: company.size,
                type: company.company_type,
                status: companyStatus[company.status],
                id: company.id
            });
        }
    }
}