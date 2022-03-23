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
      reminder: {
        color: "",
        reminder: "",
        start: "",
        end: "",
        country: "",
        city: "",
      },
      activeUUID: "",
      countries: [],
      cities: [],
      setTimeError: false,
      success: false,
      errorOnDispatch: false,
      incompleteForm: true,
      validate: false,
    };
  },
  methods: {
    hoursToMs(formatedTime) {
      const [hours, minutes] = formatedTime.split(":");
      return Date.UTC(70, 0, 1, hours, minutes);
    },
    getReminderInput() {
      return {
        ...this.reminder,
        start: this.hoursToMs(this.reminder.start),
        end: this.hoursToMs(this.reminder.end),
      };
    },
    missingFields() {
      const missing = Object.values(this.getReminderInput()).some(
        (val) => !val || val === ""
      );
      this.incompleteForm = missing;
      return missing;
    },
    async pushReminder() {
      this.validate = true;
      if (this.missingFields()) {
        return;
      }
      try {
        await this.$store.dispatch("pushReminder", {
          date: this.fullDate,
          reminder: this.getReminderInput(),
          type: this.edit ? "edit" : "add",
          uuid: this.uuid,
        });
        this.success = true;
      } catch {
        this.errorOnDispatch = true;
      }
    },
  },
  watch: {
    reminder: {
      handler() {
        this.validate = false;
      },
      deep: true,
    },
  },
  mounted() {
    getCountries().then((countries) => (this.countries = countries));

    if (this.edit) {
      const { start, end, uuid, ...reminderProps } =
        this.$store.getters.getByUUID({ date: this.fullDate, uuid: this.uuid });

      this.reminder = reminderProps;
      this.reminder.start = msToHours(start);
      this.reminder.end = msToHours(end);
      this.activeUUID = uuid;
    }

    this.$watch("country", () => {
      this.reminder.city = "";
    });

    this.$watch(
      (vm) => [vm.reminder.end, vm.reminder.start],
      () => {
        this.setTimeError = this.reminder.end < this.reminder.start;
      }
    );
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
    <textarea
      maxlength="30"
      v-model="reminder.reminder"
      id="reminder"
      data-test-id="reminder-input"
    />
    <label for="color">Choose a color</label>
    <select
      name="color"
      id="color"
      v-model="reminder.color"
      data-test-id="color-input"
    >
      <option>green</option>
      <option>yellow</option>
      <option>red</option>
    </select>
    <label for="start" aria-labelledby="time which the reminder will begin">
      Start
    </label>
    <input
      type="time"
      id="start"
      name="start"
      v-model="reminder.start"
      data-test-id="start-input"
    />
    <label for="end" aria-labelledby="time which the reminder will finish">
      End
    </label>
    <input
      type="time"
      id="end"
      name="end"
      v-model="reminder.end"
      data-test-id="end-input"
    />
    <label v-if="setTimeError">Select a time greater than start</label>
    <label>Search and select a country:</label>
    <InputAutoComplete
      :list="countries"
      :keySearch="'country'"
      :keyList="'iso3'"
      v-on:selectItem="
        reminder.country = $event.country;
        cities = $event.cities;
      "
      :initialFilter="reminder.country"
      :dataTestIdInput="'country-input'"
      :dataTestIdItem="'country-item'"
    />
    <label
      v-if="reminder.country"
      :aria-labelledby="`selected country is ${reminder.country}`"
      >{{ reminder.country }}</label
    >
    <label>Search and select a city:</label>
    <InputAutoComplete
      :list="cities"
      v-on:selectItem="reminder.city = $event"
      :initialFilter="reminder.city"
      :dataTestIdInput="'city-input'"
      :dataTestIdItem="'city-item'"
    />
    <label
      v-if="reminder.city"
      :aria-labelledby="`selected country is ${reminder.city}`"
      >{{ reminder.city }}</label
    >
    <button @click.prevent="() => pushReminder()" data-test-id="push-reminder">
      {{ edit ? "edit" : "add" }}
    </button>
    <div v-if="validate">
      <span v-if="incompleteForm">You need to complete the form :)</span>
      <span v-else-if="success">Done!</span>
      <span v-else-if="errorOnDispatch">Error while sending request :(</span>
      <span v-else>Loading</span>
    </div>
  </form>
</template>

<style lang="sass" scoped>
.form
  display: grid
  grid-gap: 15px
</style>
