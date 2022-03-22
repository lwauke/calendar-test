<script>
import InputAutoComplete from "./AutoComplete.vue";
import getWeather from "../services/weather.js";
import getCountries from "../services/countries.js";

export default {
  props: ["fullDate", "edit", "uuid"],
  components: {
    InputAutoComplete,
  },
  data() {
    return {
      color: "",
      reminder: "",
      start: "",
      end: "",
      activeUUID: "",
      country: "",
      city: "",
      countries: [],
      cities: [],
      weather: '',
      setTimeError: false,
      success: false
    };
  },
  methods: {
    handleTimeEnd(e) {
      const time = e.target.valueAsNumber
      if (time < this.start) {
        this.setTimeError = true
        return
      }
      this.end = time
    },
    getReminderInput() {
      return {
        color: this.color,
        reminder: this.reminder,
        start: this.start,
        end: this.end,
        country: this.country,
        city: this.city,
        weather: this.weather,
      };
    },
    addReminder() {
      this.$store.commit("add", {
        date: this.fullDate,
        reminder: this.getReminderInput(),
      });
      this.success = true
    },
    editReminder() {
      this.$store.commit("edit", {
        date: this.fullDate,
        reminder: this.getReminderInput(),
        uuid: this.uuid,
      });
      this.success = true
    },
    setCountry(obj) {
      this.country = obj.country;
      this.cities = obj.cities;
    },
    async setCity(city) {
      this.city = city;
      this.weather = await getWeather(city, this.fullDate, this.start);
    },
  },
  async mounted() {
    if (this.edit) {
      const { color, start, end, uuid, reminder, city, country } =
        this.$store.getters.getByUUID({ date: this.fullDate, uuid: this.uuid });

      this.color = color;
      this.start = start;
      this.end = end;
      this.activeUUID = uuid;
      this.reminder = reminder;
      this.city = city;
      this.country = country;
    }

    this.countries = await getCountries();
  },
};
</script>

<template>
  <form class="form">
    <label
      for="reminder"
      aria-labelledby="Type a description for your reminder"
    >
      Reminder:
    </label>
    <textarea maxlength="30" v-model="reminder" id="reminder" />
    <label for="color">Choose a color</label>
    <select name="color" id="color" v-model="color">
      <option>green</option>
      <option>yellow</option>
      <option>red</option>
    </select>
    <label
      for="start"
      aria-labelledby="time which the reminder will begin"
    >
      Start
    </label>
    <input type="time" id="start" name="start" @change="start = $event.target.valueAsNumber"/>
    <label
      for="end"
      aria-labelledby="time which the reminder will finish"
    >
      End
    </label >
    <input type="time" id="end" name="end" @change="handleTimeEnd"/>
    <label v-if="setTimeError">Select a time after the start</label>
    <label>Search and select a country:</label>
    <InputAutoComplete
      :list="countries"
      :keySearch="'country'"
      :keyList="'iso3'"
      v-on:selectItem="setCountry($event)"
      :initialFilter="country"
    />
    <label v-if="country" :aria-labelledby="`selected country is ${country}`">{{ country }}</label>
    <label>Search and select a city:</label>
    <InputAutoComplete
      :list="cities"
      v-on:selectItem="setCity($event)"
      :disabled="!country"
      :initialFilter="city"
    />
    <label v-if="city" :aria-labelledby="`selected country is ${city}`">{{ city }}</label>
    <button @click.prevent="editReminder" v-if="edit">edit</button>
    <button @click.prevent="addReminder" v-else>add</button>
    <span v-if="success">Done!</span>
  </form>
</template>

<style lang="sass" scoped>
.form
  display: grid
  grid-gap: 15px
</style>
