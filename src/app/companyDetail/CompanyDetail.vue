<template>
  <b-row id="company-details" class="main">
    <b-col>
      <v-header
        :title="company.company_name"
        :action="'Ver Perfil'"
        :route="'companyProfile'"
      />
      <b-row class="list">
        <b-col>
          <b-card no-body>
            <b-tabs v-model="tabIndex" pills card>
              <b-tab title="Dashboard">
                <Dashboard :companyIdProp="companyId" />
              </b-tab>
              <b-tab title="Gráficas">
                <Graphs :companyIdProp="companyId" />
              </b-tab>
              <b-tab title="Costos">
                <div>
                  <costtab :companyIdProp="companyId"> </costtab>
                </div>
              </b-tab>
              <b-tab title="Código de red">
                <netcodetab :companyIdProp="companyId"> </netcodetab>
              </b-tab>
              <b-tab title="Historial">
                <historytab :companyIdProp="companyId"> </historytab>
              </b-tab>
              <b-tab title="Huella de carbono">
                <carbonfootprintab :companyIdProp="companyId">
                </carbonfootprintab>
              </b-tab>
              <b-tab title="Generacion">
                <generationtab :companyIdProp="companyId"> </generationtab>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script src="./companyDetail"></script>
