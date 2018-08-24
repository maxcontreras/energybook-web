/* eslint-disable */

export default {
    props: ['title', 'action','filters','buttons', 'isDashboard', 'modalId', 'isMeters','route','params'],
    data() {
        return {
            dashboardSelected: 0,
            companySelected: false
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isManager() {
            return this.$store.state.isManager;
        },
        showAction() {
            return (this.isAdmin && this.isMeters) || !this.isMeters;
        }
    },
    methods: {
        filterData(val) {
            this.dashboardSelected = val;
            this.companySelected = this.filters[0] && this.filters[0].selected !== null;
            if(this.isAdmin) {
                this.$emit('SearchData', this.dashboardSelected, this.filters[0].selected);
            } else {
                this.$emit('SearchData', this.dashboardSelected)
            }
        },
        goTo() {
            if(this.route) {
                this.$router.push({name: this.route, params: { id: this.params } });
            }
        }
    }
}