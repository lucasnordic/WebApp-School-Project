<template>
  <b-container v-if="petLover" fluid="md">
    <b-row v-model="petLover">
      <b-col>
        <b-card class="greeting-user">
          <b-card-text> Hello {{ petLover.userinfo.username }}! </b-card-text>
        </b-card>
        <b-card class="user-info">
          <b-card-text>
            <p id="header">Profile information:</p>
            <p class="key">
              Username:
              <span class="value"> {{ petLover.userinfo.username }}</span>
            </p>
            <p class="key">
              Full Name:
              <span class="value"> {{ petLover.userinfo.fullname }}</span>
            </p>
            <p class="key">
              Email:
              <span class="value">
                {{ petLover.userinfo.contactInfo.email }}</span
              >
            </p>
            <p class="key">
              Phone Number:
              <span class="value">
                {{ petLover.userinfo.contactInfo.phoneNumber }}</span
              >
            </p>
            <p class="key">
              City:
              <span class="value">
                {{ petLover.userinfo.contactInfo.address.city }}</span
              >
            </p>
            <p class="key">
              Street Name:
              <span class="value">
                {{ petLover.userinfo.contactInfo.address.streetName }}</span
              >
            </p>
            <p class="key">
              Street Number:
              <span class="value">
                {{ petLover.userinfo.contactInfo.address.streetNumber }}</span
              >
            </p>
            <p class="key" v-if="petLover.acceptablePets">
              Acceptable Pets:
              <span class="value">
                {{ petLover.acceptablePets.join(' ') }}</span
              >
            </p>
            <p class="key">Description:</p>
            <p class="value">{{ petLover.aboutMe }}</p>
            <b-button
              variant="danger"
              id="delete-button"
              v-b-modal.deleteAccount
              >Delete Account</b-button
            >
            <b-button variant="primary" id="edit-button" v-b-modal.edit-user
              >Edit Information</b-button
            >
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row id="service-row">
      <b-col md="12">
        <b-button variant="success" @click="servicePage()" id="service-btn"
          >View Your services</b-button
        >
      </b-col>
    </b-row>
    <b-modal id="edit-user" title="Edit Information" ref="editModal">
      <b-container fluid="md">
        <h5>Security settings</h5>

        <b-row>
          <b-col md="3">
            <label>Password:</label>
          </b-col>
          <b-col md="9">
            <b-form-input v-model="patchInputs.password"></b-form-input>
          </b-col>
          <b-button
            size="lg"
            variant="success"
            id="savepassword-btn"
            @click="editByPatch(patchPasswordData)"
            >Change Password</b-button
          >
        </b-row>

        <hr />

        <h5>Other settings</h5>
        <b-row>
          <b-col md="3">
            <label>Username:</label>
          </b-col>
          <b-col md="9">
            <b-form-input v-model="petLover.userinfo.username"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>fullname:</label>
          </b-col>
          <b-col md="9">
            <b-form-input v-model="petLover.userinfo.fullname"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Email:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="petLover.userinfo.contactInfo.email"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Phone Number:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="petLover.userinfo.contactInfo.phoneNumber"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>City:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="petLover.userinfo.contactInfo.address.city"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Street Name:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="petLover.userinfo.contactInfo.address.streetName"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Street Number:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="petLover.userinfo.contactInfo.address.streetNumber"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Description:</label>
          </b-col>
          <b-col md="9">
            <b-form-input v-model="petLover.aboutMe"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Acceptable Pets:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="accPet"
              @keyup.188="addPets"
              placeholder="Press ',' after entering each pet"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <b-button size="lg" variant="success" @click="edit()"> Save </b-button>
        <b-button size="lg" variant="outline-secondary" @click="close()">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <b-modal ref="delAcc" id="deleteAccount">
      <b-container>
        <b-row>
          <b-col>
            <p>Are you sure you want to delete your account?</p>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <b-button size="lg" @click="closeDel()" id="cancel-btn">
          Cancel
        </b-button>
        <b-button size="lg" @click="delAcc()" id="del-btn"> Delete </b-button>
      </template>
    </b-modal>
  </b-container>
</template>
<script>
import { Api } from '@/Api'

export default {
  name: 'petlover',
  mounted() {
    Api.get('/petlovers/' + this.$route.params.id)
      .then((res) => {
        console.log(res)
        this.petLover = res.data
      })
      .catch((err) => {
        this.makeToast(
          'Connection Error',
          String(err) + ', Please try again',
          'danger',
          true
        )
      })
  },
  data() {
    return {
      accPet: null,
      petLover: {
        userinfo: {
          username: null,
          password: null,
          fullname: null,
          contactInfo: {
            email: null,
            phoneNumber: null,
            address: {
              city: null,
              streetName: null,
              streetNumber: null
            }
          }
        },
        aboutMe: null,
        acceptablePets: null
      },
      patchInputs: {
        password: null
      }
    }
  },
  methods: {
    makeToast(title, message, variant, solid) {
      // https://bootstrap-vue.org/docs/components/toast
      this.$bvToast.toast(message, {
        title: title, // ex: 'No Access'
        variant: variant, // ex: 'warning'
        solid: solid // ex: boolean
      })
    },
    edit() {
      Api.put('/petlovers/' + this.$route.params.id, this.petLover).then(
        (res) => {
          this.petLover = res
          location.reload()
        }
      )
    },
    editByPatch(dataToPatch) {
      // if input is empty, return.
      if (!dataToPatch) {
        // TODO: Show error message to user
        console.log('No password entered')
        return
      }

      Api.patch('/petlovers/' + this.$route.params.id, dataToPatch)
        .then((res) => {
          // TODO: Show a success message to the user
          this.petLover = res
          location.reload()
        })
        .catch((err) => {
          // TODO: Show an error message to the user
          console.log(err)
        })
    },
    delAcc() {
      Api.delete('/petlovers/' + this.$route.params.id)
      this.$router.push('/noprofile')
    },
    servicePage() {
      this.$router.push(
        '/profile/petLovers/' + this.$route.params.id + '/services'
      )
    },
    close() {
      this.$refs.editModal.hide()
      location.reload()
    },
    closeDel() {
      this.$refs.delAcc.hide()
    },
    addPets() {
      this.petLover.acceptablePets.push(this.accPet)
      this.accPet = null
    }
  },
  computed: {
    patchPasswordData() {
      return { password: this.patchInputs.password }
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/profile.css';

#savepassword-btn {
  margin-top: 15px;
  margin-left: 62%;
  width: 35%;
  font-size: 100%;
}
</style>
