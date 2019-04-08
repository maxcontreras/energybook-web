/* eslint-disable */
export default function (group) {
    return {
        methods: {
            notify(title, text, type) {
                this.$notify({
                    group,
                    title,
                    text,
                    type,
                    duration: 5000
                });
            }
        }
    };
}
