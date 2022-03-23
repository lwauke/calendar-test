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

  const clickOnDebouncedItem = (selector, wait) =>
    new Promise((res) => {
      setTimeout(async () => {
        const item = await findByTestId(selector);
        console.log("chegou");
        await item.trigger("click");
        res(item);
      }, wait);
    });

  it("should add reminder", async () => {
    // vi methods are somehow quieting my logs, so I cant continue spending time trying to mock a date :/
    // const date = new Date(2022,2,10,12)
    // vi.useFakeTimers()
    // vi.setSystemTime(date)
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const date = 10;
    const dateToTest = `${year}-${month}-${date}`;
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
    global.fetch = vi.fn().mockReturnValueOnce(mockResponse(countriesMock));

    const btn = findByTestId(`btn-add-${dateToTest}`);
    await btn.trigger("click");

    await findByTestId("reminder-input").setValue(reminder.value);
    await findByTestId("color-input").setValue(reminder.color);
    await findByTestId("start-input").setValue(reminder.start);
    await findByTestId("end-input").setValue(reminder.end);

    await findByTestId("country-input").setValue(reminder.country);
    await clickOnDebouncedItem("country-item-brazil", 250);
    findByTestId("city-input").setValue("rio");
    await clickOnDebouncedItem("city-item-rio-de-janeiro", 250);

    await findByTestId("push-reminder").trigger("click");
    await findByTestId("close-modal").trigger("click");

    const reminderItem = await findByTestId(`reminder-item-${dateToTest}`);
    await reminderItem.trigger("click");

    const reminderViewContent = await findByTestId(
      `reminder-view-${dateToTest}`
    ).text();

    expect(reminderViewContent).toContain(reminder.value);
    expect(reminderViewContent).toContain(reminder.city);
    expect(reminderViewContent).toContain(
      `${year}-${month}-${date} from ${reminder.start} to ${reminder.end}`
    );
  });
});
