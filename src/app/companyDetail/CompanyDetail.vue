<template>
    <b-row id="company-details" class="main">
        <b-col>
            <Header :title="company.company_name"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <b-tabs>
                            <b-tab title="Dashboard">
                                <Analysis :meters="company.meters"/>
                            </b-tab>
                            <b-tab title="Gráficas">
                                <Chart/>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./companyDetail"></script>