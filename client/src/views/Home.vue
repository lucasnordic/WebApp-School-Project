<template>
  <div class="main">
    <b-container class="services-page" fluid="sm">
      <b-container class="carousel-img" fluid="sm">
        <b-row>
          <b-col>
            <b-carousel
              id="carousel-1"
              class="carousel"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide fluid="sm">
                <template #img>
                  <img
                    class="dog-walking-img"
                    caption="First slide"
                    width="1120"
                    height="560"
                    src="../assets/images/dog-walking.png"
                    alt=""
                  />
                </template>
                <h1 class="get-pet-lover">FIND A PET LOVER”</h1>
                <h1 class="dog-walking-text">
                  “It is not where you walk, it's who walks with you.”
                </h1>
              </b-carousel-slide>

              <b-carousel-slide>
                <template #img>
                  <img
                    class="veterinary-img"
                    caption="Second slide"
                    width="1120"
                    height="520"
                    src="../assets/images/Veterinarian.png"
                    alt=""
                  />
                </template>
                <h1 class="veterinary-text">
                  “The best doctor in the world is the veterinarian. They can't
                  ask their patiens what is the matter - they've got to just
                  know”
                </h1>
              </b-carousel-slide>

              <b-carousel-slide>
                <template #img>
                  <img
                    class="retriever-img"
                    caption="Third slide"
                    width="1120"
                    height="520"
                    src="../assets/images/Golden.png"
                    alt="image slot"
                  />
                </template>
                <h1 class="retriever-text">
                  “Dogs do speak, but only to those who know how to listen.”
                </h1>
              </b-carousel-slide>

              <!-- Slides with img slot -->
              <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
              <b-carousel-slide>
                <template #img>
                  <img
                    class="terier-img"
                    caption="Forth slide"
                    width="1120"
                    height="520"
                    src="../assets/images/beauty_service.png"
                    alt=""
                  />
                </template>
                <h1 class="terier-text">
                  “Give your pet the stylish service it deserves”
                </h1>
              </b-carousel-slide>

              <!-- Slide with blank fluid image to maintain slide aspect ratio -->
              <b-carousel-slide>
                <template #img>
                  <img
                    class="a-sad-dog-img"
                    caption="Fifth slide"
                    width="1120"
                    height="520"
                    src="../assets/images/Dog-looking-up.png"
                    alt=""
                  />
                </template>
                <h1 class="a-sad-dog-text">“Let me out, please!”</h1>
              </b-carousel-slide>
            </b-carousel>
          </b-col>
        </b-row>
      </b-container>

      <div class="overflow-auto">
        <p class="mt-3">Current Page: {{ currentPage }}</p>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="pet_lover_row"
          align="center"
        ></b-pagination>
      </div>

      <b-container
        class="pet-lover-container"
        fluid="sm"
        id="entire-container"
        small
      >
        <b-row
          class="pet_lover_row"
          v-for="item in currentPagePetlovers"
          v-bind:key="item.userinfo._id"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <b-col md="4" class="leftside">
            <img
              class="profile-picture"
              :src="require('@/assets/images/faces/x250/' + item.imageUrl)"
              :alt="item.imageUrl"
              width="120"
              height="120"
            />
            <div>
              <b-form-rating v-model="value"></b-form-rating>
              <p
                class="rating_mt-2"
                border-variant="transparent"
                align="center"
              ></p>
            </div>

            <!-- TODO: Maybe have a "send email button"? -->
            <b-button
              class="profile"
              variant="primary"
              v-if="item.userinfo.contactInfo.email"
              :href="`mailto:${item.userinfo.contactInfo.email}`"
              >Send Email</b-button
            >
          </b-col>

          <b-col md="4" class="middle" cols="8">
            <p class="Pet-Lover-Name">Petlover: {{ item.userinfo.username }}</p>
            <hr class="rounded" />
            <p class="aboutMe">About me: {{ item.aboutMe }}</p>
            <ul
              v-if="item.userinfo.contactInfo.phoneNumber"
              class="contact-phone"
              align="left"
            >
              Phone:
              {{
                item.userinfo.contactInfo.phoneNumber
              }}
            </ul>
            <ul
              v-if="item.userinfo.contactInfo.email"
              class="contact-email"
              align="left"
            >
              E-mail:
              {{
                item.userinfo.contactInfo.email
              }}
            </ul>
            <ul
              v-if="item.userinfo.contactInfo.address.city"
              class="contact-email"
              align="left"
            >
              City:
              {{
                item.userinfo.contactInfo.address.city
              }}
            </ul>
            <ul
              v-if="item.userinfo.contactInfo.address.streetName"
              class="contact-email"
              align="left"
            >
              Street:
              {{
                item.userinfo.contactInfo.address.streetName
              }}
              {{
                item.userinfo.contactInfo.address.streetNumber
              }}
            </ul>
          </b-col>

          <b-col md="4" class="right-side">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68391.29304160277!2d11.853376600415995!3d57.61060663610402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464fed6e967e63fd%3A0x7cdfe3785b255e0c!2sAskim%2C%20Gothenburg!5e0!3m2!1sen!2sse!4v1632870578904!5m2!1sen!2sse"
              width="200"
              height="200"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </b-col>

          <b-row
            id="bottomside"
            class="border-top border-black"
            v-for="(service, index) in item._services"
            v-bind:key="service._id"
          >
            <h4>Service {{ index + 1 }}</h4>

            <ul>
              <li>Price: {{ service.price }}</li>
              <li>Description: {{ service.description }}</li>
            </ul>
          </b-row>
        </b-row>
      </b-container>
    </b-container>

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="pet_lover_row"
        align="center"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
  </div>
</template>

<script scoped>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  mounted() {
    console.log('Page is loaded')
    this.getPetLovers()
  },
  data() {
    return {
      servicesShown: 'Services',
      petLovers: [],
      msgbox: '',
      value: null,
      slide: 0,
      sliding: null,
      perPage: 3,
      currentPage: 1
    }
  },
  computed: {
    rows() {
      return this.petLovers.length
    },
    currentPagePetlovers: function () {
      return this.petLovers.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    showMsgBox() {
      this.msgbox = ''
      this.$bvModal
        .msgBoxOk('Message submitted successfully', {
          title: 'Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then((value) => {
          this.msgbox = value
        })
        .catch((err) => {
          this.msgbox = []
          console.log(err)
        })
    },
    makeToast(title, message, variant, solid) {
      // https://bootstrap-vue.org/docs/components/toast
      this.$bvToast.toast(message, {
        title: title, // ex: 'No Access'
        variant: variant, // ex: 'warning'
        solid: solid // ex: boolean
      })
    },
    getPetLovers() {
      Api.get('/petlovers')
        .then((response) => {
          this.petLovers = response.data
        })
        .catch((error) => {
          this.petLovers = []
          this.makeToast('Error', String(error), 'warning', true)
        })
        .then(() => {
          console.log(this.petLovers)
        })
    },
    getServices() {
      Api.get(
        '/petLovers/:petLoverId/services' + this.$route.params.id + '/services',
        this.pet
      )
        .then((response) => {
          this.services = response.data.services
        })
        .catch((error) => {
          this.services = []
          this.makeToast('Error', String(error), 'warning', true)
        })
    }
  }
}
</script>

<style>
.main {
  background-color: aliceblue;
}

.services-page {
  background-color: aliceblue;
  width: 100%;
  min-width: 75%;
  height: auto;
  min-height: 100%;
  margin: auto;
}

.services {
  background-color: aliceblue;
  position: absolute;
  border-style: groove;
  height: 100%;
  min-height: 100%;
  will-change: auto;
  border-style: groove;
  border-radius: 5px;
  margin-left: 2em;
  margin-right: 2em;
  padding: 2em 2em;
}

.carousel {
  margin-top: 1em;
}

.collapse_container {
  padding-top: 20px;
  padding-bottom: 0px;
  padding-left: 40px;
  padding-right: 40px;
  max-width: 1500px;
  margin: auto;
  border-radius: 5px;
  margin: 0.5em 0.5em 0.5em 0.5em;
}

.pet-lover-container {
  border-style: groove;
  background: rgb(220, 246, 255);
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.pet_lover_row {
  background: white;
  border-radius: 10px;
  border-style: groove;
  height: 100%;
  min-height: 100%;
  margin-bottom: 5px;
}

#bottomside {
  text-align: left;
  margin-left: 0px;
  padding: 15px;
  border-top: #ffffff 4px;
  width: 100%;
}

.leftside {
  border-radius: 10px;
  align-self: center;
}

.profile-picture {
  border-radius: 10px;
  margin: 0.5em 0.5em;
}

.middle {
  border-radius: 10px;
  text-align: center;
  width: auto;
  margin: auto;
  height: auto;
  align-self: center;
}

.right-side {
  border-radius: 10px;
  padding: 1.5em 1.5em 1.5em 1.5em;
  /* width: auto;
  height: auto;
  align-self:center; */
}

.b-dropdown-form {
  margin: 0%;
  width: 10;
  border-width: 5px;
  scale: 10;
}

.aboutMe {
  font-family: Arial;
  font-style: italic;
  text-align: left;
  font-size: 100%;
}

.contact-phone {
  margin: 0em;
  padding: 0em;
}
.contact-email {
  margin: 0em;
  padding: 0em;
}
.contact-price {
  margin: 0em;
  padding: 0em;
}
.contact-services {
  margin: 0em;
  padding: 0em;
}

.Pet-Lover-Name {
  font-size: 1.5em;
  align-self: center;
}

.dropdown {
  margin-bottom: 1em;
}

.all-services {
  margin: 0.5em 0.5em 0.5em 0.5em;
}

.walking {
  margin: 0.5em 0.5em 0.5em 0.5em;
}

.beauty {
  margin: 0.5em 0.5em 0.5em 0.5em;
}

.veterinary {
  margin: 0.5em 0.5em 0.5em 0.5em;
}

.hostel {
  margin: 0.5em 0.5em 0.5em 0.5em;
}

.profile {
  margin: 0.5em;
  align-self: center;
}

.get-pet-lover {
  text-align: left;
  color: black;
}

.dog-walking-text {
  font-size: 1.5em;
  text-align: left;
  color: black;
  text-shadow: 2px 2px 4px #ffffff;
  font-family: cursive;
  text-decoration: overline;
}

.veterinary-text {
  color: black;
  font-size: 20px;
  text-align: right;
  font-variant: small-caps;
  font-synthesis: weight;
  width: 330px;
  outline-style: ridge;
  float: right;
  margin-left: 0%;
  padding-right: 0%;
}

.a-sad-dog-text {
  font-size: 30px;
  text-align: left;
}

.terier-text {
  font-size: 30px;
  text-align: right;
  color: black;
  width: 350px;
  font-style: italic;
}

.retriever-text {
  text-align: left;
  color: black;
  width: 1100px;
  font-size: 30px;
  font-style: italic;
}
.overflow-auto {
  background: aliceblue;
  padding: 1em;
}
.b-rating {
  margin: 0em;
  padding: 0em;
}

@media screen and (max-width: 768px) {
  .dog-walking-img {
    max-width: 100%;
    height: auto;
  }
  .dog-walking-text {
    font-size: 1em;
    text-align: left;
    color: black;
    text-shadow: 2px 2px 4px #ffffff;
    font-family: cursive;
    text-decoration: overline;
  }

  .middle {
    margin: auto;
  }

  .get-pet-lover {
    text-align: left;
    color: black;
    font-size: 100%;
  }
  .veterinary-img {
    max-width: 100%;
    height: auto;
  }
  .veterinary-text {
    color: black;
    font-size: 80%;
  }

  .terier-img {
    max-width: 100%;
    height: auto;
  }
  .terier-text {
    font-size: 100%;
    text-align: right;
    color: black;
    width: 350px;
    font-style: italic;
  }
  .retriever-img {
    max-width: 100%;
    height: auto;
  }
  .retriever-text {
    text-align: left;
    color: black;
    width: 1100px;
    font-size: 80%;
    font-style: italic;
  }
  .a-sad-dog-img {
    max-width: 100%;
    height: auto;
  }
  .a-sad-dog-text {
    font-size: 80%;
    text-align: left;
  }
  .pet_lover_row {
    background: white;
    border-radius: 10px;
    border-style: groove;
    height: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 70%;
  }

  .profile-picture {
    border-radius: 10px;
    margin: 0.5em 0.5em;
    max-width: 100%;
    height: auto;
  }
}
</style>
