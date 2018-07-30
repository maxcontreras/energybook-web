/* eslint-disable */

export default {
    props: ['items', 'fields'],
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            pageOptions: [ 5, 10, 15 ]
        }
    }
}