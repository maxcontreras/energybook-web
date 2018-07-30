/* eslint-disable */

export default {
    props: ['title', 'action','filters','buttons', 'isDashboard'],
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
        }  
    },
    methods: {
        filterData(val) {
            console.log(this.filters[0].selected !== null, this.isDashboard);
            this.dashboardSelected = val;
            this.companySelected = this.filters[0] && this.filters[0].selected !== null;
            if(this.isAdmin) {
                this.$emit('SearchData', this.dashboardSelected, this.filters[0].selected);
            } else {
                this.$emit('SearchData', this.dashboardSelected)
            }
        }
    }
}