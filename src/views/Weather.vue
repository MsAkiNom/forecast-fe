<template>
  <h1 class="mt-3" header-test="header">Weather Forecast</h1>

  <hr>

  <div class="row" v-if="weathers.length">
    <div class="col-md-3">
     <h5>Pick a Date </h5>
      <select class="form-select"
              @change="currentWeather = weathers.find(w => w.date == $event.target.value)">
        <option :value="weather.date"
                v-for="(weather, i) in weathers"
                :key="'weather_'+i">{{ weather.date }}</option>
      </select>
    </div>
  </div>

  <div class="row mt-3 mb-3" v-if="currentWeather">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header text-bg-primary">
          Day
        </div>
        <div class="card-body day1">
          <h4 class="mb-4">Min: {{ currentWeather.day.tempmin }}&deg;C | Max: {{ currentWeather.day.tempmax }}&deg;C</h4>
          <h4 class="mb-4">{{ currentWeather.day.phenomenon }}</h4>
          <p class="mb-3">{{ currentWeather.day.text }}</p>
          <p class="mb-3" v-if="currentWeather.day.peipsi"><b>Peipsi </b> <br> {{ currentWeather.day.peipsi }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row" v-if="currentWeather && currentWeather.day.place">
    <div class="col-md-4 mb-3" v-for="(place, i) in currentWeather.day.place" :key="'place_'+i">
      <div class="card">
        <div class="card-header text-bg-primary">
          {{ place.name }}
        </div>
        <div class="card-body">
          <h5 class="mb-1">{{ place.tempmax }}&deg;C</h5>
          <p>{{ place.phenomenon }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-3 mb-3" v-if="currentWeather">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header text-bg-secondary">
          Night
        </div>
        <div class="card-body">
          <h4 class="mb-4">Min: {{ currentWeather.night.tempmin }}&deg;C | Max: {{ currentWeather.night.tempmax }}&deg;C</h4>
          <h4 class="mb-4">{{ currentWeather.night.phenomenon }}</h4>
          <p class="mb-3">{{ currentWeather.night.text }}</p>
          <p class="mb-3" v-if="currentWeather.night.peipsi"><b>Peipsi </b> <br> {{ currentWeather.night.peipsi }}</p>
          <p class="mb-3" v-if="currentWeather.night.sea"><b>Sea </b> <br> {{ currentWeather.night.sea }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row" v-if="currentWeather && currentWeather.night.place">
    <div class="col-md-4 mb-3" v-for="(place, i) in currentWeather.night.place" :key="'place_'+i">
      <div class="card">
        <div class="card-header text-bg-secondary">
          {{ place.name }}
        </div>
        <div class="card-body">
          <h5 class="mb-1">{{ place.tempmin }}&deg;C</h5>
          <p>{{ place.phenomenon }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherApp',
  data() {
    return {
      weathers: [],
      currentWeather: null,
    }
  },
  created() {
    this.loadWeather()
  },
  methods: {
    loadWeather() {
      this.axios.get('https://wforecast-be.herokuapp.com/weather')
        .then(res => {
          this.weathers = res.data.forecast;
          this.currentWeather = this.weathers[0];
        })
    }
  }
}
</script>

<style>
.card {
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease-out;
  text-decoration: none;
}

.card:hover {
  transform: translateY(-5px) scale(1.005) translateZ(0);
  box-shadow: 0 25px 37px rgba(0,0,0,0.12),
    0 25px 47px;
}
</style>