<template>
  <b-row id="clients">
    <b-col>
      <v-header :title="'Compañías'" :action="'Agregar Cliente'" :modalId="'companyModal'" />
      <b-row>
        <b-col>
          <b-card>
            <v-table
              :items="items"
              :fields="fields"
              :route="'companyDetail'"
              @delete-company="DeleteCompany"
              @edit-company="EditInfo"
            />
          </b-card>
        </b-col>
      </b-row>
    </b-col>
    <b-modal id="companyModal" size="lg" title="Nuevo Cliente" @ok="createCompany">
      <companies-form
        :formSubmit="createCompany"
        :company="newCompany"
        :divisiones="divisiones"
        :cities="cities"
        :availableUser="toggle.newUser"
        :user="newUser"
        :availableManager="toggle.newManager"
        :manager="newManager"
      />
    </b-modal>
  </b-row>
</template>

<script src="./companies">
</script>
