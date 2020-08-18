<template>
  <b-modal class="z-confirm-dialog" ref="confirmDialog" :title="title" @hidden="$emit('hidden')">
    <slot></slot>
    <div slot="modal-footer" class="property flex-item">
      &nbsp;
      &nbsp;
      &nbsp;
      <b-button
        v-if="showAcceptButton"
        @click="$emit('accept')"
        :disabled="acceptDisable"
      >{{acceptText}}</b-button>&nbsp;
      &nbsp;
      &nbsp;
      <b-button
        variant="secondary"
        class="float-right btn-cancel"
        @click="$emit('cancel')"
        :disabled="cancelDisable"
      >{{cancelText}}</b-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props: {
    acceptText: {
      type: String,
      default: "Aceptar",
    },
    showAcceptButton: {
      type: Boolean,
      default: true,
    },
    acceptDisable: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
      default: "Cancelar",
    },
    cancelDisable: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Mensaje de confirmación",
    },
  },
  watch: {
    show(newShow) {
      if (newShow === true) {
        this.showModal();
      } else {
        this.hideModal();
      }
    },
  },
  methods: {
    hideModal() {
      this.$refs.confirmDialog.hide();
    },
    showModal() {
      this.$refs.confirmDialog.show();
    },
  },
};
</script>

<style lang="scss" scoped>
.z-confirm-dialog {
  .btn-cancel {
    margin-right: 5px;
  }
}
</style>
