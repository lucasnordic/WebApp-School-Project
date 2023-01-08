<template>
  <div class="about">
    <b-container class="img_container" fluid="sm">
      <b-row class="img_row">
        <b-col class="left-side">
          <img class="about-img" src="../assets/images/about.png" alt="" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h1 class="text">
            Walkman offers the best experience. Are you worried about your pet’s
            care in your absence? We provide the best pet daycare just for you.
            We will train, and take your pet for walking and give the routine
            feeding in your absence.
            <br />
            <br />
            You can leave the town for work to another place with peace of mind
            that we are there to be with your pet. We - Ediz, Maryam and Lucas -
            love pets. We would like to provide you an environment where you can
            find your favorite pet lover.
          </h1>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.about {
  background-color: aliceblue;
  position: absolute;
  margin-bottom: 50px;
  height: 200%;
  width: 100%;
  border-style: groove;
  border-radius: 5px;
}
.about-img {
  height: 100%;
  width: 100%;
}
.img_container {
  padding: 1em 1em 1em 1em;
}

.text {
  margin: 3em 1em 1em 1em;
  font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS',
    sans-serif;
  font-style: italic;
  width: 100%;
  text-align: left;
  font-size: 30px;
}

@media screen and (max-width: 768px) {
  .about-img {
    max-width: 100%;
    height: auto;
  }
  .text {
    margin: 3em 1em 1em 1em;
    font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS',
      sans-serif;
    font-style: italic;
    width: 400px;
    text-align: left;
    font-size: 15px;
  }
}
</style>
