<script>
import Modal from "./Modal.vue";
import ReminderForm from "./ReminderForm.vue";
import ReminderView from "./ReminderView.vue";
import ReminderItem from "./ReminderItem.vue";

export default {
  props: ["fullDate"],
  components: {
    ReminderItem,
    Modal,
    ReminderForm,
    ReminderView,
  },
  data() {
    return {
      showModal: false,
      activeUUID: "",
      editMode: false,
    };
  },
  computed: {
    reminders: function () {
      return this.$store?.getters?.getByDate(this.fullDate) || [];
    },
  },
};
</script>

<template>
  <div>
    <Modal
      v-if="showModal"
      @close="
        showModal = false;
        editMode = false;
      "
    >
      <template v-slot:header>
        Reminder
        <button v-if="!editMode" @click="editMode = true">edit</button>
      </template>
      <template v-slot:body>
        <ReminderForm
          v-if="editMode"
          :edit="true"
          :uuid="activeUUID"
          :fullDate="fullDate"
        />
        <ReminderView
          v-else
          :edit="true"
          :uuid="activeUUID"
          :fullDate="fullDate"
        />
      </template>
    </Modal>
    <ul class="list">
      <ReminderItem
        v-for="reminder in reminders"
        :key="reminder.uuid"
        v-bind="reminder"
        :fullDate="fullDate"
        @click="
          showModal = true;
          activeUUID = reminder.uuid;
        "
      />
    </ul>
  </div>
</template>

<style lang="sass" scoped>
.list
  padding: 0
  margin: 0
  overflow: auto
</style>
