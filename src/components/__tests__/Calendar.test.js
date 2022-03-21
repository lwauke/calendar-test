import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Calendar from "../Calendar.vue";

describe("Calendar", () => {
  it("should render calendar table", () => {
    const wrapper = mount(Calendar);

    expect(wrapper.find("table")).not.toBeNull();
  });
});
