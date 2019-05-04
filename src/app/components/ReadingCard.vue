<template>
    <b-card class="standard-card">
        <b-row class="standard-card-header">
            <b-col xl="4">
                <slot name="left-header"></slot>
            </b-col>
            <b-col xl="8" class="text-right">
                <slot name="right-header"></slot>
            </b-col>
        </b-row>
        <div class="standard-card-body">
            <slot name="body"></slot>
        </div>
        <b-row class="mt-3">
            <b-col class="text-right">
                <slot name="footer"></slot>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
$gray: #ADADAD;
$white: #ffffff;

.standard-card {
    box-shadow: 5px 5px 13px 2px rgba(0, 0, 0, 0.322);
    margin-bottom: 1rem;

    .standard-card-header {
        background-color: $white;
        border-bottom: 1px solid $gray;
        padding: 0 1rem .2rem;

        * {
            font-size: 1.1rem;
            letter-spacing: 1px;
        }
    }

    .standard-card-body {
        padding-top: 1rem;
    }
}
</style>