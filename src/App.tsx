import { Component, For, createEffect, createSignal } from "solid-js";
import { Checkbox, RadioGroup } from "@kobalte/core";
import "./App.css";
import { createForm, toCustom } from "@modular-forms/solid";

type CheckedTest = {
  testChecked: boolean;
  fruits: string;
};

const App: Component = () => {
  const [checkedWorking, setCheckedWorking] = createSignal(false);
  const [checkedNotWorking, setCheckedNotWorking] = createSignal(false);
  const [radioGroupValueWorking, setRadioGroupValueWorking] =
    createSignal(false);
  const [radioGroupValueNotWorking, setRadioGroupValueNotWorking] =
    createSignal(false);

  const [form, { Form, Field, FieldArray }] = createForm<CheckedTest>({
    initialValues: {
      testChecked: true,
      fruits: "Orange",
    },
  });

  return (
    <div class="App">
      <Form
        onSubmit={(values) => {
          console.log("Submitted", values);
        }}
      >
        <Field name="testChecked" type="boolean">
          {(field, props) => (
            <Checkbox.Root
              class="checkbox"
              name="works"
              defaultChecked={field.value}
            >
              <Checkbox.Input class="checkbox__input" {...props} />
              <Checkbox.Control class="checkbox__control">
                <Checkbox.Indicator>x</Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label class="checkbox__label">Works</Checkbox.Label>
            </Checkbox.Root>
          )}
        </Field>
        <Field name="fruits" type="string">
          {(field, props) => (
            <RadioGroup.Root class="radio-group" defaultValue={field.value}>
              <RadioGroup.Label class="radio-group__label">
                Favorite fruit not working
              </RadioGroup.Label>
              <div class="radio-group__items">
                <For each={["Apple", "Orange", "Watermelon"]}>
                  {(fruit) => (
                    <RadioGroup.Item value={fruit} class="radio">
                      <RadioGroup.ItemInput class="radio__input" {...props} />
                      <RadioGroup.ItemControl class="radio__control">
                        <RadioGroup.ItemIndicator class="radio__indicator" />
                      </RadioGroup.ItemControl>
                      <RadioGroup.ItemLabel class="radio__label">
                        {fruit}
                      </RadioGroup.ItemLabel>
                    </RadioGroup.Item>
                  )}
                </For>
              </div>
            </RadioGroup.Root>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default App;
