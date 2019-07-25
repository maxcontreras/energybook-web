/**eslint-disable */

export default {
    data() {
        return {

        }
    },
    methods: {
        goTo(route) {
            this.$router.push({name: route});
        }
    }
}