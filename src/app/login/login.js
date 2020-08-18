/* eslint-disable */

import notify from "@/mixins/notify";
import users from "@/services/eUsers";
export default {
  mixins: [notify("login")],
  data() {
    return {
      email: "",
      password: "",
      checkemail: "",
      newpassword: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password,
      });
    },
    openRegister() {
      this.$router.push({ name: "register" });
    },
    mostrarContrasena() {
      var tipo = document.getElementById("password");
      if (tipo.type == "password") {
        tipo.type = "text";
      } else {
        tipo.type = "password";
      }
    },
    handleOk() {
      if (this.validar()) {
        users
          .find({
            filter: {
              where: {
                email: this.checkemail,
              },
            },
          })
          .then((user) => {
            if (user[0]) {
              // si existe usuario
              users
                .resetPasswordEdited(user[0].id, this.newpassword)
                .then((ok) => {
                  this.notify(
                    "EXITOSAMENTE",
                    "Se hizo el cambio de contraseña",
                    "success"
                  );
                });
            } else {
              this.notify(
                "ERROR",
                "No se encontro a ningun usuario con ese correo",
                "error"
              );
            }
          });
      }
    },
    validar() {
      if (this.checkemail == "") {
        this.notify("ERROR", "El correo esta vacio", "error");
        return false;
      }

      if (this.newpassword == "") {
        this.notify("ERROR", "La Nueva contraseña esta vacia", "error");

        return false;
      }

      return true;
    },
  },
};
