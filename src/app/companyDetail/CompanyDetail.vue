<template>
    <b-row id="company-details" class="main">
        <b-col>
            <Header :title="company.company_name" :action="'Ver Perfil'" :route="'companyProfile'"/>
            <b-row class="list">
                <b-col>
                    <b-card no-body>
                        <b-tabs v-model="tabIndex" pills card>
                            <b-tab title="Dashboard"> 
                                <Dashboard :companyIdProp="companyId"/>
                            </b-tab>
                            <b-tab title="Gráficas">
                                <Graphs :companyIdProp="companyId"/>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script src="./companyDetail"></script>