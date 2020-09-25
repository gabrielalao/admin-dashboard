<template>
  <div class="app flex-row align-items-center login-body" >
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form id="login-form" @submit="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      v-model="username"
                      class="form-control"
                      placeholder="Username"
                      autocomplete="username email"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      v-model="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                  <div style="margin-top:10px;">
                      <b-alert :show="is_error" variant="danger">{{error_msg}}</b-alert>
                  </div>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button
                    v-on:click="register()"
                    variant="primary"
                    class="active mt-3"
                  >Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null,
      error_msg: "",
      is_error: false,
    }
  },
  methods: {
    login: function(event) {
      event.preventDefault()
      let vm = this;
      let payload = {
        email: this.username,
        password: this.password
      }
      // console.log(payload);
      //axios.post('/api/auth/', payload).then(function (resp) {
      axios.post('/api/users/login', payload).then(function (resp) {
        if (resp.data.status  == 'success') {
          vm.$store.dispatch('storeToken', resp.data.token)
          vm.$store.dispatch('storeUser', resp.data.user)
          vm.$router.push({ name: 'Dashboard' })
        }
        else
        {
          console.log(resp.data.status);
          vm.is_error = true;
          vm.error_msg = resp.data.status;
        }
      })
    },
    register: function(event) {
      window.location.href = '#/register';
    }
  }
};
</script>

<style>
  /* IE fix */
  .login-body {
    background-position: center top;
    background-repeat: no-repeat;
    width: 100%;
    background-attachment: fixed;
    background-size: cover;
  }
</style>