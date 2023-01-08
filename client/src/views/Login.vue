<template>
  <div class="page_background">
    <div class="header"></div>
    <div class="page_background-gradient">
      <div class="page_content">
        <b-jumbotron id="form_content">
          <!-- form = Where a user inputs data -->
          <b-form class="form_inputs" @submit="onSubmit">
            <!-- Title -->
            <h1 id="login-title">
              <div class="form_title">
                <b-form>
                  <p class="animate__animated animate__pulse">Log-in</p>
                </b-form>
              </div>
            </h1>

            <hr class="my-4" />

            <!-- Select User Type. PetOwner/PetLover -->
            <b-form-group id="usertype" label="Account type*" label-for="i-9">
              <b-form-select
                id="i-9"
                v-model="form.userType"
                :options="userTypeSelected"
                required
                autofocus
              ></b-form-select>
            </b-form-group>

            <!-- input field -->
            <b-form-group id="username" label="Username*" label-for="i-1">
              <b-form-input
                id="i-1"
                v-model="form.username"
                required
              ></b-form-input>
            </b-form-group>

            <!-- input field -->
            <b-form-group id="password" label="Password*" label-for="i-2">
              <b-form-input
                id="i-2"
                v-model="form.password"
                required
                type="password"
              ></b-form-input>
            </b-form-group>

            <!-- Submit form -->
            <b-button id="submit_btn" block type="submit" variant="success"
              >Login<b-spinner
                v-if="loginPressed === true"
                style="width: 2rem; height: 2rem"
              ></b-spinner
            ></b-button>

            <hr class="my-4" />

            <!-- Bottom text and image -->
            <div class="bottom-wrapper">
              <p>
                Don't have an account yet?
                <router-link to="/register">Register here</router-link>
              </p>
              <div id="image-wrapper">
                <img
                  src="../assets/images/sammy-searching.png"
                  alt="..."
                  id="bottom-image"
                />
              </div>
              <div>
                Illustration by
                <a
                  href="https://icons8.com/illustrations/author/6101992cfc3ba40007aa1554"
                  >Fruzka</a
                >
                from <a href="https://icons8.com/illustrations">Ouch!</a>
              </div>
            </div>
          </b-form>
        </b-jumbotron>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        error: '',
        userType: null
      },
      userTypeSelected: [
        { text: 'Select One', value: null },
        'Pet Owner',
        'Pet Lover'
      ],
      loginPressed: false
    }
  },
  mounted() {
    // Happens when page is loaded
    console.log('Login page has loaded')
  },
  methods: {
    // TODO Add working method to login user
    onSubmit(event) {
      event.preventDefault()
      this.login()
    },
    makeToast(title, message, variant, solid) {
      // https://bootstrap-vue.org/docs/components/toast
      this.$bvToast.toast(message, {
        title: title, // ex: 'No Access'
        variant: variant, // ex: 'warning'
        solid: solid // ex: boolean
      })
    },
    login() {
      let route = ''
      if (this.form.userType === 'Pet Owner') {
        route = 'loginowner'
      } else {
        route = 'loginlover'
      }
      this.loginPressed = true // for login btn spinner animation
      Api.post('/authenticate/' + route, this.form).then(
        (res) => {
          console.log('Authenticated') // debugging
          // login successfull
          if (res.status === 200) {
            // set localstorage data, for use in navigation
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userType', res.data.userType)
            localStorage.setItem('userId', res.data.userId)

            this.makeToast('Log-in', 'Log-in successful', 'success', true)

            // Wrap the "if" in a timeout, then push
            setTimeout(
              function () {
                this.loginPressed = false // for login btn spinner animation
                if (this.form.userType === 'Pet Owner') {
                  this.$router.push('/profile/petowners/' + res.data.userId)
                  window.location.reload() // TODO: Remove this; This forces page reload in order to refresh navigation bar
                } else {
                  this.$router.push('/profile/petLovers/' + res.data.userId)
                  window.location.reload() // TODO: Remove this; This forces page reload in order to refresh navigation bar
                }
              }.bind(this),
              1000
            )
          }
        },
        (err) => {
          this.loginPressed = false
          this.makeToast(
            'Log-in Error',
            String(err) + ', Please try again',
            'danger',
            true
          )
          localStorage.removeItem('token')
          this.error = err.response.data.error // save the error
        }
      )
    }
  }
}
</script>

<style>
@import '../assets/styles/login-register_light.css';

/* Overrides imported .css */
#page_background {
  height: 100%;
}

#page_content {
  height: 100%;
}
/* Overrides imported .css */

hr {
  border: 2px solid rgb(40, 81, 122, 0.1) !important;
  border-radius: 2px !important;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 0;
}

#login-title {
  font-size: 350%;
  margin-bottom: -32px;
}

/* Bottom image */
#image-wrapper {
  margin-top: -25px;
  margin-left: auto;
  margin-right: auto;
  width: 45%;
  display: block;
}

#bottom-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  z-index: 1;
}
</style>
