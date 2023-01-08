<template>
  <b-container fluid="md">
    <b-row>
      <b-col>
        <b-jumbotron>
          <h1>Your account is successfully Deleted. Good Luck!</h1>
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button @click="home()"> Go to home page</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'void',
  methods: {
    home() {
      this.$router.push('/')
    }
  }
}
</script>
