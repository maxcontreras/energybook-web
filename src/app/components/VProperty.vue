<template>
    <div class="record">
        <div class="property">
            <i class="fas fa-leaf"></i>
            <div style="max-width:80%">
                <h5>{{propertyName}}</h5>
            </div>
        </div>
        <div class="value" v-if="propertyUnit !== undefined && propertyUnit === '$' " :class="{negativeValue: isNegative}">
            <h5>{{isNegative ? '-': ''}} {{propertyUnit}} {{Math.abs(propertyValue)}}</h5>
        </div>
        <div class="value" v-else>
            <h5>{{propertyValue}} {{propertyUnit}}</h5>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        propertyName: {
            type: String,
            required: true
        },
        propertyValue: {
            type: Number,
            default: 0
        },
        propertyUnit: {
            type: String,
            required: false
        }
    },
    computed: {
        isNegative() {
            return this.propertyValue >= 0 ? false : true; 
        }
    }
}
</script>

<style lang="scss" scoped>
.record {
    padding: 0 .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h5 {
        font-size: 1.1rem;
    }

    .negativeValue {
        h5 {
            color: red;
        }
    }

    .property {
        width: 65%;

        * {
            display: inline-block;
        }

        i {
            font-size: 1.3rem;
            color: #1d4e10;
            margin-right: 1rem;
        }
        
        h5 {
            word-wrap:break-word;
        }


    }
}
</style>