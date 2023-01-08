<template>
  <b-container fluid="md">
    <b-row>
      <b-col>
        <b-button v-b-modal.register-pet id="register-btn">
          Add a new Pet
        </b-button>
      </b-col>
    </b-row>
    <b-row v-for="pet in pets" :key="pet._id">
      <b-col>
        <b-card class="pet-card">
          <img
            src="https://placekitten.com/300/300"
            alt="Card image"
            class="card-img-"
          />
          <b-card-text>
            <p class="title">Name:</p>
            <p class="attributes">{{ pet.name }}</p>
            <p></p>
            <p class="title">Type:</p>
            <p class="attributes">{{ pet.type }}</p>
            <p></p>
            <p class="title">Gender:</p>
            <p class="attributes">{{ pet.gender }}</p>
            <p></p>
            <p class="title" v-if="pet.allergies">Allergies:</p>
            <p class="attributes">
              {{ pet.allergies.join(' ') }}
            </p>

            <p></p>
            <p class="title" v-if="pet.foodPreferences">Food Preferences:</p>
            <p class="attributes">
              {{ pet.foodPreferences.join(' ') }}
            </p>

            <p></p>
            <p class="title" v-if="pet.petItems">Pet Items:</p>
            <p class="attributes">
              {{ pet.petItems.join(' ') }}
            </p>

            <p></p>
          </b-card-text>
          <b-button
            v-b-modal.del-modal
            id="delete-pet"
            class="card-btn"
            @click="idHandler(pet._id)"
            >Delete</b-button
          >
          <b-button
            v-b-modal.edit-info
            id="edit-pet"
            class="card-btn"
            @click="editHandler(pet)"
            >Edit</b-button
          >
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="register-pet" ref="registeration">
      <template #modal-title>Sign Up Your Pet!</template>
      <b-container fluid="md" class="register-page">
        <b-row>
          <b-col md="3">
            <label>Name:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="editPet.name"
              placeholder="Enter pet's name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Type:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="editPet.type"
              placeholder="Enter pet's type"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Gender:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="editPet.gender"
              placeholder="Enter pet's gender"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Allergies:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="allergy"
              @keyup.188="addAllergy"
              placeholder="Press ',' after entering each allergy"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Food Preferences:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="food"
              @keyup.188="addFood"
              placeholder="Press ',' after entering each food"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Pet Items:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="item"
              @keyup.188="addItem"
              placeholder="Press ',' after entering each item"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <b-button size="lg" variant="outline-secondary" @click="closeReg()">
          Cancel
        </b-button>
        <b-button size="lg" variant="success" @click="petRegister()">
          Sign UP
        </b-button>
      </template>
    </b-modal>
    <b-modal v-bind="editPet" id="edit-info" ref="editModal">
      <template #modal-title>Edit {{ editPet.name }}'s information</template>
      <b-container fluid="md" class="edit-page">
        <b-row>
          <b-col md="3">
            <label>Name:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="editPet.name"
              placeholder="Enter new name here"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Type:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="editPet.type"
              placeholder="Enter new type here"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Gender:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="editPet.gender"
              placeholder="Enter pets gender here"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Allergies:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="allergy"
              @keyup.188="editAllergies"
              placeholder="Press ',' after entering each allergy"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Food Preferences:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="food"
              @keyup.188="editFoods"
              placeholder="Press ',' after entering each food"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <label>Pet Items:</label>
          </b-col>
          <b-col md="9">
            <b-form-input
              v-model="item"
              @keyup.188="editItem"
              placeholder="Press ',' after entering each item"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <b-button size="lg" variant="success" @click="petEditor()">
          Save
        </b-button>
        <b-button size="lg" variant="outline-secondary" @click="closeEdit()">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <b-modal id="del-modal" ref="deleteModal">
      <b-container>
        <b-row>
          <b-col>
            <p>Are you sure you want to delete this Pet?</p>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <b-button size="lg" @click="closeDel()" id="cancel-btn">
          Cancel
        </b-button>
        <b-button size="lg" @click="deletePet()" id="del-btn">
          Delete
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'pets',
  mounted() {
    Api.get('/petowners/' + this.$route.params.id + '/pets')
      .then((res) => {
        console.log(res)
        this.pets = res.data
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
      id: null,
      allergy: null,
      food: null,
      item: null,
      pets: {},
      editPet: {
        name: '',
        type: '',
        gender: '',
        allergies: [],
        foodPreferences: [],
        petItems: []
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
    addAllergy() {
      this.editPet.allergies.push(this.allergy)
      this.allergy = null
    },
    addFood() {
      this.editPet.foodPreferences.push(this.food)
      this.food = null
    },
    addItem() {
      this.editPet.petItems.push(this.item)
      this.item = null
    },
    deletePet() {
      Api.delete('/petowners/' + this.$route.params.id + '/pets/' + this.id)
      location.reload()
    },
    petRegister() {
      Api.post(
        '/petowners/' + this.$route.params.id + '/pets',
        this.editPet
      ).then((res) => this.pets)
      location.reload()
    },
    editHandler(pet) {
      this.editPet = pet
    },
    petEditor() {
      Api.put('petowners/pets/' + this.editPet._id, this.editPet).then(
        (res) => this.pets
      )
      location.reload()
    },
    closeEdit() {
      this.$refs.editModal.hide()
      this.item = null
    },
    closeReg() {
      this.$refs.registeration.hide()
    },
    closeDel() {
      this.$refs.deleteModal.hide()
    },
    editAllergies() {
      this.editPet.allergies.push(this.allergy)
      this.allergy = null
    },
    editFoods() {
      this.editPet.foodPreferences.push(this.food)
      this.food = null
    },
    editItem() {
      this.editPet.petItems.push(this.item)
      this.item = null
    },
    idHandler(id) {
      this.id = id
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/petsPage.css';
</style>
