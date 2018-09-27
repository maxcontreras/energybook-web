<template>
    <b-row id="company-details" class="main">
        <b-col>
            <Header :title="company.company_name" :action="'Ver Perfil'" :route="'companyProfile'" :params="company.id"/>
            <b-row class="list">
                <b-col>
                    <b-card>
                        <b-tabs v-model="tabIndex">
                            <b-tab title="Dashboard"> 
                                <Dashboard/>
                            </b-tab>
                            <b-tab title="Gráficas">
                                <Chart v-show="tabIndex === 1"/>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./companyDetail"></script>