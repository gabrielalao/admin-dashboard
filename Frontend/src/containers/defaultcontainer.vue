<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" style="width: 200px;" to="#">
        <img
          class="navbar-brand-full"
          width="100%"
          height="100%"
          alt="App Logo"
        />
        <img class="navbar-brand-minimized" width="100%" alt="App Logo" />
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" v-show="false" />
      <b-navbar-nav class="d-md-down-none">
        <span class="navbar-toggler-icon" @click="toggleBodyClass()" style="cursor: pointer;"></span>
      </b-navbar-nav>
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">App Name</b-nav-item>
        <b-nav-item v-if="user_permission==1" class="px-3" to="/users" exact>Users</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <DefaultHeaderDropdownAccnt />
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block" /> -->
      <!-- <AsideToggler class="d-lg-none" mobile /> -->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <!-- <SidebarMinimizer/> -->
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside />
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href></a>
        <span class="ml-1">&copy; 2020 Appname.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="">Appname</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from "@/_nav";
import axios from "axios";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";

export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  created() {
    this.user_permission = this.$store.state.user.permission;
  },
  methods: {
    toggleBodyClass() {
      const el = document.body;
      if (this.showhide === true) {
        el.classList.add("sidebar-minimized");
        // el.classList.add('brand-minimized');
      } else {
        el.classList.remove("sidebar-minimized");
        // el.classList.remove('brand-minimized');
      }
      this.showhide = !this.showhide;
    },
    getnotify() {
    }
  },
  data() {
    return {
      nav: nav.items,
      showhide: true,
      notify_cnt: 0,
      user_permission: 0,
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  },
  mounted() {
    setInterval(this.getnotify, 5000);
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
