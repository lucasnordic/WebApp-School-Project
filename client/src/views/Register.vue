<template>
  <div class="page_background">
    <!-- TODO: implement -->
    <!-- <div class="header"></div> -->
    <div class="page_background-gradient">
      <div class="page_content">
        <div>
              <div id="animated_image1">
                <img
                  v-bind:src="image4"
                  v-if="form2.user === null"
                  alt="dog image"
                  id="top-image"
                  style="display:none"
                />
              </div>
              <div id="animated_image2">
                <img
                  v-bind:src="image3"
                  v-if="form2.user === 'Pet Lover'"
                  alt="pet lover image"
                  id="top-image"
                />
              </div>
              <div id="animated_image3">
                <img
                  v-bind:src="image2"
                  v-if="form2.user === 'Pet Owner'"
                  alt="pet owner image"
                  id="top-image"
                />
              </div>
            </div>

        <b-jumbotron id="form_content">
          <!-- form = Where a user inputs data -->
          <b-form class="form_inputs" @submit.prevent="onSubmit">
            <!-- Title -->
            <h1 id="register-title">
              <b-form class="form_title">
                <p class="animate__animated animate__pulse">Register</p>
              </b-form>
            </h1>

            <!-- TODO: Fix this: -->
            <!-- For displaying typed Username under "Register" title -->
            <div id="list-username">
              <transition-group name="list" tag="p">
                <!-- TODO fix this usertype bind to display to left of username -->
                <!-- <div v-bind:key="form2.user">{{ form2.user }}</div> -->
                <!-- <div
                  v-for="item in form.userinfo.username"
                  v-bind:key="item"
                  class="list-item"
                >
                  {{ item }}
                </div> -->
              </transition-group>
            </div>

            <!-- Select User Type. PetOwner/PetLover -->
            <div id="usertype-input">
              <hr class="my-4" />

              <b-form-group id="usertype" label="Account role*" label-for="i-9">
                <b-form-select
                  id="i-9"
                  v-model="form2.user"
                  :options="userTypeSelected"
                  required
                  autofocus
                ></b-form-select>

                <!--title="Info"-->
                <!-- Selected user type info box -->
                <div
                  id="user_type_info_box"
                  v-if="form2.user === 'Pet Owner'"
                  class="animate__animated animate__zoomIn"
                >
                  <div>
                    <h1>Info</h1>
                    <p>
                      Become a <em>Pet Owner</em> if you are looking for someone
                      that can take care of your pet!
                    </p>
                    <!-- TODO: Implement more info page -->
                    <!-- <a href="#" class="card-link">More Info</a> -->
                  </div>
                </div>

                <!-- Selected user type info box -->
                <div
                  id="user_type_info_box"
                  v-if="form2.user === 'Pet Lover'"
                  class="animate__animated animate__zoomIn"
                >
                  <div title="PetLover Info">
                    <h1>Info</h1>
                    <p>
                      Become a <em>Pet Lover</em> if you want to offer pet care
                      services to <em>Pet Owners</em>. Create an account, start
                      offering a service, and get ready to make some cash! ..and
                      meet some lovely pets of course ;)
                    </p>
                    <!-- TODO: Implement more info page -->
                    <!-- <b-link href="#" class="card-link">More Info</b-link> -->
                  </div>
                </div>
              </b-form-group>
            </div>

            <!-- input field -->
            <!-- TODO: Add :state to inputs, and implement input validation -->
            <b-form-group id="username" label="Username*" label-for="i-1">
              <b-form-input
                id="i-1"
                v-model="form.userinfo.username"
                required
              ></b-form-input>
            </b-form-group>

            <!-- input field -->
            <b-form-group id="password" label="Password*" label-for="i-2">
              <b-form-input
                id="i-2"
                v-model="form.userinfo.password"
                required
                type="password"
              ></b-form-input>
            </b-form-group>

            <!-- input field -->
            <b-form-group id="fullname" label="Full name*" label-for="i-3">
              <b-form-input
                id="i-3"
                v-model="form.userinfo.fullname"
                required
              ></b-form-input>
              <transition name="slide-fade">
                <div v-if="form.userinfo.fullname.length > 10">
                  <b-form-text id="usertype-help-block">
                    All hail the mighty {{ form.userinfo.fullname }}.
                  </b-form-text>
                </div>
              </transition>
            </b-form-group>

            <!-- input fields for Contact Info -->
            <div id="contactinfo-text"><p>Contact Info</p></div>
            <div class="accordion" id="contactinfo-accordion" role="tablist">
              <!-- TODO Add options for adding a pet or a service when registering -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle.accordion-1
                    variant="light"
                    size="sm"
                    >Open/Close
                  </b-button></b-card-header
                >
                <b-collapse
                  id="accordion-1"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <!-- input field -->
                    <b-form-group
                      id="email"
                      type="email"
                      label="Email"
                      label-for="i-4"
                    >
                      <b-form-input
                        id="i-4"
                        v-model="form.userinfo.contactInfo.email"
                      ></b-form-input>
                    </b-form-group>

                    <!-- input field -->
                    <b-form-group
                      id="phoneNumber"
                      label="Phone number"
                      label-for="i-5"
                    >
                      <b-form-input
                        id="i-5"
                        v-model="form.userinfo.contactInfo.phoneNumber"
                      >
                      </b-form-input>
                    </b-form-group>

                    <!-- input field -->
                    <b-form-group id="city" label="City" label-for="i-6">
                      <b-form-input
                        id="i-6"
                        v-model="form.userinfo.contactInfo.address.city"
                      ></b-form-input>
                    </b-form-group>

                    <!-- input field -->
                    <b-form-group
                      id="streetName"
                      label="Street name"
                      label-for="i-7"
                    >
                      <b-form-input
                        id="i-7"
                        v-model="form.userinfo.contactInfo.address.streetName"
                        placeholder=""
                      ></b-form-input>
                    </b-form-group>

                    <!-- input field -->
                    <b-form-group
                      id="streetNumber"
                      label="Street Number"
                      label-for="i-8"
                    >
                      <b-form-input
                        id="i-8"
                        v-model="form.userinfo.contactInfo.address.streetNumber"
                      ></b-form-input>
                    </b-form-group>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>

            <!-- Submit form -->
            <b-button id="submit_btn" block type="submit" variant="success">
              Register Account
              <b-spinner
                v-if="register === true"
                style="width: 2rem; height: 2rem"
              ></b-spinner
            ></b-button>
            <hr class="my-4" />

            <!-- Bottom text and image -->
            <div class="bottom-wrapper">
              <p>
                Do you already have an account?
                <router-link to="/login">Login here</router-link>
              </p>
              <div id="image-wrapper" :class="registeringDone.animateTestImage">
                <img
                  src="../assets/images/sammy-delivery.png"
                  alt="..."
                  id="top-image"
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
    <!-- TODO: implement -->
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
import { Api } from '@/Api'

// TODO Input error handling
export default {
  name: 'register',
  components: {},
  data() {
    return {
      // TODO Make something better
      form: {
        userinfo: {
          username: '',
          password: '',
          fullname: '',
          contactInfo: {
            email: '',
            phoneNumber: '',
            address: {
              city: '',
              streetName: '',
              streetNumber: ''
            }
          }
        },
        aboutMe: '...',
        imageUrl: ''
      },
      form2: {
        user: null
      },
      userTypeSelected: [
        { text: 'Select One', value: null },
        'Pet Owner',
        'Pet Lover'
      ],
      image: require('@/assets/images/sammy-delivery.png'),
      image2: require('@/assets/images/sammy-remote-work.png'),
      image3: require('@/assets/images/sammy-message-sent.png'),
      image4: require('@/assets/images/sammy-dog.png'),
      images: [],
      imageProfile: false,
      registeringDone: {
        animateTestImage: ''
      },
      register: false,
      index: 0
    }
  },
  mounted() {
    // Happens when page is loaded
    // load profile images
    this.importImages(
      require.context('../assets/images/faces/x250/', true, /\.jpg$/)
    )
    console.log('Page has loaded!') // debugging
  },
  methods: {
    // generate a random number and set profile picture to that image in images.
    importImages(r) {
      r.keys().forEach((key) =>
        this.images.push({ pathLong: r(key), pathShort: key })
      )
      const randomNumber = Math.floor(Math.random() * this.images.length)
      const tempImagePath = this.images[randomNumber].pathShort
      const newTestPath = tempImagePath.slice(2, 10)
      this.form.imageUrl = newTestPath
    },
    makeToast(title, message, variant, solid) {
      // https://bootstrap-vue.org/docs/components/toast
      this.$bvToast.toast(message, {
        title: title, // ex: 'No Access'
        variant: variant, // ex: 'warning'
        solid: solid // ex: boolean
      })
    },
    // Method that handles form submission
    onSubmit(event) {
      event.preventDefault()
      this.register = true // activates spinner

      // animate bottom image
      this.registeringDone.animateTestImage =
        'animate__animated animate__bounceOutRight'

      if (this.form2.user === 'Pet Owner') {
        this.postUser('petowners')
      } else if (this.form2.user === 'Pet Lover') {
        this.form.availableHours = []
        this.postUser('petlovers')
      }
    },
    // Method that handles posting a user to a specific route
    postUser(route = 'route') {
      Api.post('/' + route, this.form)
        .then((response) => {
          this.makeToast(
            'Registered',
            'Registering successful',
            'success',
            true
          )
          // allow animation to play out, and display toast before refresh
          setTimeout(
            function () {
              this.$router.push('/login')
              return this.form
            }.bind(this),
            2000
          )
        })
        .catch((error) => {
          this.makeToast(
            'Register Error',
            String(error) + ', Please try again',
            'danger',
            true
          )
          this.register = false // reset spinner on register btn
        })
    }
  },
  computed: {
    // Validate inputs:
    username_validation(event) {
      return (
        this.form.userinfo.username.length > 4 &&
        this.form.userinfo.username.length < 13
      )
    },
    password_validation(event) {
      return (
        this.form.userinfo.password.length > 5 &&
        this.form.userinfo.password.length < 21
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

#form_title {
  text-align: left;
}
/* Overrides imported .css */

hr {
  border: 2px solid rgb(40, 81, 122, 0.1) !important;
  border-radius: 2px !important;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 0;
}

#register-title {
  font-size: 350%;
  margin-bottom: -32px;
}

#contactinfo-text {
  margin-bottom: -17px;
}

#contactinfo-accordion {
  margin-top: 25px;
}

#animated_image1,
#animated_image2,
#animated_image3 {
  margin-left: 45%;
  margin-top: 10%;
  padding-left: 350px;
  position: absolute;
  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;
  height:0px;
  overflow:visible;
  pointer-events:none;
  background:none !important;
}
#top-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  z-index: 1;
}

/* Animate image above */
@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
}

/* Bottom image */
#image-wrapper {
  margin-top: -25px;
  margin-left: auto;
  margin-right: auto;
  width: 45%;
  display: block;
  overflow: hidden;
}

/* Side image */
#side_image {
  margin-left: auto;
}

@media screen and (max-width: 1200px) {
  #side_image {
    display: none;
  }
  #animated_image1, #animated_image2, #animated_image3 {
    display: none;
  }
}
@media screen and (max-width: 700px) {
  #animated_image1,
  #animated_image2,
  #animated_image3 {
    margin-left: 45%;
  }
}

/**
Only Animation Related below:
*/
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.animate__animated.animate__bounceOutRight {
  --animate-duration: 1.25s;
}

#list-username {
  margin-top: -32px;
  color: gray;
}

.list-item {
  display: inline-block;
  margin-right: 2.5px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
