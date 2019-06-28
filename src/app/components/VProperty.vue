<template>
    <b-container class="record">
        <b-row>
            <b-col cols="2" class="property flex-item">
                <template v-if="propertyImage">
                    <img :src="propertyImage.src" :alt="propertyImage.alt"/>
                </template>
                <template v-else>
                    <i class="fas fa-leaf"></i>
                </template>
            </b-col>
            <b-col class="property flex-item" cols="5">
                    <h5>{{propertyName}}</h5>
            </b-col>
            <b-col cols="5">
                <div class="value" v-if="propertyUnit !== undefined && propertyUnit === '$' " :class="{negativeValue: isNegative}">
                    <h5>{{isNegative ? '-': ''}} {{propertyUnit}} {{Math.abs(propertyValue)}}</h5>
                </div>
                <div class="value" v-else>
                    <h5>{{propertyValue}} {{propertyUnit}}</h5>
                </div>
            </b-col>
        </b-row>
    </b-container>
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
        },
        propertyImage: {
            type: Object,
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
    h5 {
        font-size: 1.2rem;
    }

    .negativeValue {
        h5 {
            color: red;
        }
    }

    .property {
        * {
            display: inline-block;
        }

        i {
            font-size: 1.3rem;
            color: #1d4e10;
        }
        
        h5 {
            word-wrap:break-word;
        }

        img {
            width: 2.4rem;
            height: 2.4rem;
        }
    }

    .flex-item {
        display: flex;
        align-items: center;
    }

    .value {
        text-align: right;
    }
}
</style>