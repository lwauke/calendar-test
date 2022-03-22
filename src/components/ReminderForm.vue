<script>
import InputAutoComplete from "./AutoComplete.vue";
import getCountries from "../services/countries.js";
import msToHours from "../helpers/msToHours.js";

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
      weather: "",
      setTimeError: false,
      success: false,
      errorOnDispatch: false,
      incompleteForm: true,
    };
  },
  methods: {
    hoursToMs(formatedTime) {
      const [hours, minutes] = formatedTime.split(/\D/);
      return Date.UTC(70, 0, 1, hours, minutes);
    },
    getReminderInput() {
      return {
        color: this.color,
        reminder: this.reminder,
        start: this.hoursToMs(this.start),
        end: this.hoursToMs(this.end),
        country: this.country,
        city: this.city,
      };
    },
    missingFields() {
      const missing = Object.values(this.getReminderInput()).some(
        (val) => !val || val === ""
      );
      this.incompleteForm = missing;
      return missing;
    },
    async addReminder() {
      if (this.missingFields()) {
        return;
      }
      try {
        await this.$store.dispatch("addReminder", {
          date: this.fullDate,
          reminder: this.getReminderInput(),
        });
        this.success = true;
      } catch {
        this.errorOnDispatch = true;
      }
    },
    editReminder() {
      if (this.missingFields()) {
        return;
      }
      this.$store.commit("edit", {
        date: this.fullDate,
        reminder: this.getReminderInput(),
        uuid: this.uuid,
      });
      this.success = true;
    },
    setCountry(obj) {
      this.country = obj.country;
      this.cities = obj.cities;
    },
    async setCity(city) {
      this.city = city;
    },
    formatHour(time) {
      const { hours, minutes } = msToHours(time);
      return `${hours}`.padStart(2, 0) + ":" + `${minutes}`.padStart(2, 0);
    },
  },
  async mounted() {
    if (this.edit) {
      const { color, start, end, uuid, reminder, city, country } =
        this.$store.getters.getByUUID({ date: this.fullDate, uuid: this.uuid });

      this.color = color;
      this.start = this.formatHour(start);
      this.end = this.formatHour(end);
      this.activeUUID = uuid;
      this.reminder = reminder;
      this.city = city;
      this.country = country;
    }
    this.$watch("country", () => (this.city = ""));
    this.$watch(
      () => this.end < this.start,
      () => {
        this.setTimeError = true;
      }
    );
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
    <label for="start" aria-labelledby="time which the reminder will begin">
      Start
    </label>
    <input type="time" id="start" name="start" v-model="start" />
    <label for="end" aria-labelledby="time which the reminder will finish">
      End
    </label>
    <input type="time" id="end" name="end" v-model="end" />
    <label v-if="setTimeError">Select a time after the start</label>
    <label>Search and select a country:</label>
    <InputAutoComplete
      :list="countries"
      :keySearch="'country'"
      :keyList="'iso3'"
      v-on:selectItem="setCountry($event)"
      :initialFilter="country"
    />
    <label v-if="country" :aria-labelledby="`selected country is ${country}`">{{
      country
    }}</label>
    <label>Search and select a city:</label>
    <InputAutoComplete
      :list="cities"
      v-on:selectItem="setCity($event)"
      :disabled="!country"
      :initialFilter="city"
    />
    <label v-if="city" :aria-labelledby="`selected country is ${city}`">{{
      city
    }}</label>
    <button @click.prevent="editReminder" v-if="edit">edit</button>
    <button @click.prevent="addReminder" v-else>add</button>
    <span v-if="incompleteForm">You need to complete the form :)</span>
    <span v-else-if="success">Done!</span>
    <span v-else-if="errorOnDispatch">Error while sending request :(</span>
    <span v-else>Loading</span>
  </form>
</template>

<style lang="sass" scoped>
.form
  display: grid
  grid-gap: 15px
</style>
