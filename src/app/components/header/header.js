/* eslint-disable */

export default {
    props: ['title', 'action','filters'],
    data() {
        return {
        }
    },
    methods: {
        filterData() {
            this.$emit('SearchData', this.filters);
        }
    }
}