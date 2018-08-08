/* eslint-disable */
import Header from '@/app/components/header/Header.vue';
import companies from '@/services/companies';
import Analysis from '@/app/components/analysis/Analysis.vue';
import Chart from '@/app/components/chart/Chart.vue';

export default {
    components: {
        Header, Analysis, Chart
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isUser() {
            return this.$store.state.isUser;
        },
        isManager() {
            return this.$store.state.isManager;
        },
        isAccounting() {
            return this.$store.state.isAccounting;
        }
    }, 
    data() {
        return {
            company: {
                users: [],
                meters: []
            },
            edit: false,
            originalData: {}
        }
    },

    beforeMount() {
        companies.find({
            id: this.$route.params.id, 
            filter: {
                include: ['users', 'meters']
            } 
        }).then(company => {
            this.company = company;
            this.originalData = JSON.parse(JSON.stringify(this.company));
        });
    },

    methods: {
        cancel() {
            this.edit = false;
            this.company = JSON.parse(JSON.stringify(this.originalData));
        },
        saveChanges() {

        },
        addUser(user) {
            this.items.push({
                name : `${user.name} ${user.lastname}`,
                created_at: moment(user.created_at).format('LL'),
                email: user.email,
                role: user.role_id,
                status: companyStatus[company.status],
                id: user.id
            });
        }
    }
}