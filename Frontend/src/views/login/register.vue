<template>
  <div class="app flex-row align-items-center login-body" >
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form id="login-form" @submit="register">
                  <h1>Sign Up</h1>
                  <p class="text-muted">Sign Up</p>                  
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      v-model="fullname"
                      class="form-control"
                      placeholder="Fullname"
                    />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      v-model="email"
                      class="form-control"
                      placeholder="E-mail"
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
                      <b-button type="submit" variant="primary" class="px-4">Signup</b-button>
                    </b-col>
                    <b-col cols="6">
                      <b-button v-on:click="back()" variant="primary" class="active mt-3">From Login</b-button>
                    </b-col>
                  </b-row>
                  <div style="margin-top:10px;">
                      <b-alert :show="is_error" variant="danger">{{error_msg}}</b-alert>
                  </div>
                </b-form>
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
  name: 'Register',
  data () {
    return {
      fullname: null,
      email: null,
      password: null,
      error_msg: "",
      is_error: false,
    }
  },
  methods: {
    register: function(event) {
      event.preventDefault()
      let vm = this;
      let payload = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
      }
      // console.log(payload);
      //axios.post('/api/auth/', payload).then(function (resp) {
      axios.post('/users/register', payload).then(function (resp) {
        if (resp.status  == 200) {
          vm.$store.dispatch('storeToken', resp.data.token)
          vm.$store.dispatch('storeUser', resp.data)
          vm.$router.push({ name: 'Login' })
        }
        else
        {
          vm.is_error = true;
          vm.error_msg = resp.status;
        }
      })
    },
    back: function(event) {
      let vm = this;
      vm.$router.push({ name: 'Login' });
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