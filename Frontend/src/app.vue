<template>
  <router-view></router-view>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  mounted() {
    let vm = this;
    axios.get("/api/auth/me")
    .then(function(resp) {
      if (resp.data.status == "success") {
        vm.$store.dispatch("storeToken", resp.data.token);
        vm.$store.dispatch("storeUser", resp.data.user);
      }
    })
    .catch(function(err) {
      vm.$store.dispatch("storeToken", null);
      vm.$store.dispatch("storeUser", null);
      vm.$router.push({ name: "Login" });
    });
  }
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/coreui-icons.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";
</style>
