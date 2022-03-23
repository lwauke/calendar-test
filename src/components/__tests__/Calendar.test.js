import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Calendar from "../Calendar.vue";
import store from "../../store";

const mockResponse = (data) => ({ json: () => Promise.resolve(data) });

describe("Calendar", () => {
  const wrapper = mount(Calendar, {
    global: {
      mocks: {
        $store: store,
      },
    },
  });

  const findByTestId = (testId) => wrapper.find(`[data-test-id="${testId}"]`);

  it("should add reminder", async () => {
    // vi methods are somehow quieting my logs, so I cant continue spending time trying to mock a date :/
    // const date = new Date(2022,2,10,12)
    // vi.useFakeTimers()
    // vi.setSystemTime(date)
    const now = new Date();
    const dateToTest = `${now.getFullYear()}-${now.getMonth() + 1}-28`;
    const reminder = {
      value: "Lorem ipsum sit dolor amet",
      city: "Rio de Janeiro",
      country: "Brazil",
      color: "green",
      start: "10:00",
      end: "12:00",
    };

    const countriesMock = {
      data: [
        {
          country: "Brazil",
          iso2: "BR",
          iso3: "BRA",
          cities: ["Rio de Janeiro", "Sao Paulo"],
        },
        {
          country: "Argentina",
          iso2: "AR",
          iso3: "ARG",
          cities: ["Buenos Aires", "La Plata"],
        },
      ],
    };
    /* eslint no-undefined: "off" -- there is no way to define global here */
    global.fetch = vi.fn().mockReturnValueOnce(mockResponse(countriesMock));

    const btn = findByTestId(`btn-add-${dateToTest}`);
    await btn.trigger("click");

    await findByTestId("reminder-input").setValue(reminder.value);
    const selectColor = findByTestId(`color-input`);
    selectColor.setValue(reminder.color);
    await findByTestId(`start-input`).setValue(reminder.start);
    await findByTestId(`end-input`).setValue(reminder.end);

    const countryInput = findByTestId(`country-input`);
    await countryInput.setValue(reminder.country);

    const getDebouncedItem = (selector, wait) =>
      new Promise((res) => {
        setTimeout(async () => {
          const item = await findByTestId(selector);
          await item.trigger("click");
          res(item);
        }, wait);
      });
    await getDebouncedItem("country-item-brazil", 250);

    const cityInput = findByTestId(`city-input`);
    await cityInput.setValue("rio");
    await wrapper.html();
    await getDebouncedItem("city-item-rio-de-janeiro", 250);

    const addBtn = findByTestId(`add-reminder`);
    const closeBtn = findByTestId(`close-modal`);

    await addBtn.trigger("click");
    await closeBtn.trigger("click");

    expect(btn).toBeTruthy();
  });
});
