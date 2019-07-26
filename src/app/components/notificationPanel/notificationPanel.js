/* eslint-disable */

import Log from '@/app/components/log/Log.vue';

export default {
    props: [],

    components: {
        Log
    },

    data() {
        return {}
    },

    methods: {
        goTo(route) {
            this.$router.push({name: route});
        }
    }
}