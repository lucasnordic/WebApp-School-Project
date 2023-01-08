<template>
  <div id="navbar-bg">
    <b-navbar toggleable="sm" type="light" variant="light" id="navbar">
      <b-navbar-brand href="#">
        <img src="../assets/images/favicon.jpg" alt="website logo">
        Walkman
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!loggedIn" to="/login">Login</b-nav-item>
        <b-nav-item v-if="!loggedIn" to="/register">Register</b-nav-item>
        <b-nav-item v-if="loggedIn" v-on:click="routerPush">Profile</b-nav-item>
        <b-nav-item v-if="loggedIn" v-on:click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-navbar toggleable type="light" variant="light" id="hamburger-navbar">
      <b-navbar-brand href="#">Walkman</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template>
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item v-if="!loggedIn" to="/login">Login</b-nav-item>
          <b-nav-item v-if="!loggedIn" to="/register">Register</b-nav-item>
          <b-nav-item v-if="loggedIn" v-on:click="routerPush"
            >Profile</b-nav-item
          >
          <b-nav-item v-if="loggedIn" v-on:click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  methods: {
    makeToast(title, message, variant, solid) {
      // https://bootstrap-vue.org/docs/components/toast
      this.$bvToast.toast(message, {
        title: title, // ex: 'No Access'
        variant: variant, // ex: 'warning'
        solid: solid // ex: boolean
      })
    },
    logout() {
      localStorage.clear()
      this.loggedIn = false
      this.makeToast('Logged out', 'You are logged out', 'primary', true)

      this.$router.push('/login')
    },
    routerPush() {
      if (this.userType === 'petlovers') {
        this.$router.push('/profile/petLovers/' + this.userId)
      } else if (this.userType === 'petowners') {
        this.$router.push('/profile/petowners/' + this.userId)
      }
    }
  },
  data() {
    return {
      loggedIn: false,
      userType: '',
      userId: ''
    }
  },
  mounted() {
    if (!(localStorage.getItem('token') === null)) {
      this.userId = localStorage.getItem('userId')
      this.loggedIn = true
    } else {
      this.loggedIn = false
    }

    // TODO: Change storing user info in a cookie, or add authentication library
    if (localStorage.getItem('userType') === 'petlover') {
      this.userType = 'petlovers'
    } else if (localStorage.getItem('userType') === 'petowner') {
      this.userType = 'petowners'
    }
  }
}
</script>

<style>
/* OVERRIDE: */
.navbar-light .navbar-toggler {
  color: rgba(0, 0, 0, 0.5) !important;
  border-color: rgba(0, 0, 0, 0) !important;
}
/* OVERRIDE */

#navbar {
  padding: 20px;
  padding-left: 10%;
  padding-right: 10%;
}

#hamburger-navbar {
  padding: 20px;
  display: none;
  text-align: right;
  font-size: 200%;
}

#navbar-bg {
  padding-bottom: 5px;
  background-color: rgba(40, 81, 122, 0.2);
}

/* Overrides the css above, when page width is below x.px */
@media screen and (max-width: 768px) {
  #navbar {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  #hamburger-navbar {
    display: flex;
  }
}
</style>
