<script>
import debounce from "lodash.debounce";
export default {
  props: [
    "list",
    "keySearch",
    "keyList",
    "initialFilter",
    "dataTestIdInput",
    "dataTestIdItem",
  ],
  data() {
    return {
      filter: "",
      filteredList: [],
      show: false,
    };
  },
  watch: {
    filter(input) {
      debounce(() => {
        this.show = true;
        this.filteredList = this.list.filter((item) =>
          new RegExp(input, "ig").test(item[this.keySearch] || item)
        );
      }, 150)();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.filter = this.initialFilter;
    });
  },
};
</script>

<template>
  <div class="container">
    <input
      type="text"
      @keyup.stop.esc="show = false"
      v-model="filter"
      class="filter"
      :data-test-id="`${dataTestIdInput}`"
    />
    <ul v-if="show && filter && filteredList.length" class="autocomplete">
      <li
        class="item"
        v-for="item in new Set(filteredList)"
        tabindex="0"
        @keyup.stop.esc="show = false"
        :data-test-id="`${dataTestIdItem}-${(item[keySearch] || item)
          .replace(/\s/g, '-')
          .toLowerCase()}`"
        :key="item[keyList] || item"
        @click="
          $emit('selectItem', item);
          show = false;
        "
      >
        {{ item[keySearch] || item }}
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
.autocomplete
  list-style: none
  padding: 0
  position: absolute
  top: 100%
  margin: 0
  z-index: 1
  max-height: 100px
  overflow: auto
  background: #fff
  box-shadow: 0px 0px 5px 5px rgb(0 0 0 / 20%)
.filter, .autocomplete
  width: 100%
.filter
  box-sizing: border-box
.item
  padding: 5px
  cursor: pointer
  &::hover
    background: #e7e7e7
.container
  position: relative
</style>
