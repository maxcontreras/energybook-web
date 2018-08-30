/* eslint-disable */

export default {
    props: ['items', 'fields', 'route'],
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            pageOptions: [ 5, 10, 15 ]
        }
    },
    methods: {
        rowClickHandler(record, index) {
            if(this.route) {
                this.$router.push({name: this.route, params: {id: record.id}});
            } else {
                this.$emit('clicked', {id: record.id, index });
            }
        }
    }
}