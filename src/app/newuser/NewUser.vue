<template>
    <b-row id="clients">
     
            <v-header
                :title="'Compañías'"
                :action="'Agregar compañia'"
                :modalId="'companyModal'"
                />
            <b-row>
            </b-row>
      
        <b-modal
            id="companyModal"
            size="lg"
            title="Compañía Nueva"
            @ok="createCompany">
            <companies-form
                :formSubmit="createCompany"
                :company="newCompany"
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
