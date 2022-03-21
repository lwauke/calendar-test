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
    };
  },
  methods: {
    getReminderInput() {
      return {
        color: this.color,
        reminder: this.reminder,
        start: this.start,
        end: this.end,
        country: this.country,
        city: this.city,
      };
    },
    addReminder() {
      this.$store.commit("add", {
        date: this.fullDate,
        reminder: this.getReminderInput(),
      });
    },
    editReminder() {
      this.$store.commit("edit", {
        date: this.fullDate,
        reminder: this.getReminderInput(),
        uuid: this.uuid,
      });
    },
    setCountry(obj) {
      this.country = obj.country;
      this.cities = obj.cities;
    },
    async setCity(city) {
      this.city = city;
      const weather = await getWeather(city);

      console.log(weather);
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
  <form>
    <textarea maxlength="30" v-model="reminder" />
    <select name="" id="" v-model="color">
      <option>green</option>
      <option>yellow</option>
      <option>red</option>
    </select>
    <label for="start" aria-labelledby="time which the reminder will begin"
      >Start</label
    >
    <input type="time" id="start" name="start" v-model="start" />
    <label for="end" aria-labelledby="time which the reminder will finish"
      >End</label
    >
    <input type="time" id="end" name="end" v-model="end" />
    <InputAutoComplete
      :list="countries"
      :keySearch="'country'"
      :keyList="'iso3'"
      v-on:selectItem="setCountry($event)"
      :initialFilter="country"
    />
    <InputAutoComplete
      :list="cities"
      v-on:selectItem="setCity($event)"
      :disabled="!country"
      :initialFilter="city"
    />
    <button @click.prevent="editReminder" v-if="edit">edit</button>
    <button @click.prevent="addReminder" v-else>add</button>
  </form>
</template>

<style lang="sass" scoped></style>
