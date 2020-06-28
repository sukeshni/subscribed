import React from "react";
import { Input } from "../AppleDesign/atoms/Input";
import { Avatar } from "../AppleDesign/atoms/Avatar";
import { SaveButton } from "../AppleDesign/atoms/buttons/Buttons";
import { Paper } from "../AppleDesign/atoms/Paper";
import { Spacer } from "../AppleDesign/atoms/Spacer";
import { SegmentedControl } from "../AppleDesign/atoms/SegmentedControl";
import { currencies } from "../utils/currencyCode";
import { AutoSuggestionsList } from "../AppleDesign/atoms/AutoSuggestionsList";
import { useState } from "react";

const defaultLogo = "https://source.unsplash.com/RoYujmHrdxA/50x50";

export const AddSubscriptionForm = (props) => {
  const frequencyChoices = ["weekly", "monthly", "yearly"];
  const [frequenceSelected, setFrequency] = useState(frequencyChoices[1]);
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const days = [...Array(31).keys()].map((i) => i + 1);

  return (
    <>
      <div style={{ position: "relative" }}>
        {/* Subscription Name */}
        <Paper dark flat>
          <div style={{ display: "flex" }}>
            <Avatar image={props.subscriptionLogo || defaultLogo} />
            <div style={{ flexGrow: "1" }}>
              <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                <Input
                  instant
                  name="subscription_name"
                  inputType="search"
                  label=""
                  placeholder={"Subscription Name"}
                  initialText={props.subscriptionName}
                  onInputChange={(e) => {
                    props.onFormInputChange &&
                      props.onFormInputChange(e.target.name, e.target.value);
                  }}
                  type="body20-bold"
                  autoFocus
                  dark
                />
              </form>
            </div>
          </div>
        </Paper>

        <AutoSuggestionsList
          suggestions={props.nameSuggestions}
          onSuggestionSelect={props.onServiceSelect}
        />
      </div>

      {/* Plan Type */}
      <div style={{ position: "relative" }}>
        <Paper dark flat>
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <Input
              inputType="search"
              name="subscription_plan"
              list="plans_list"
              label=""
              placeholder="Plan | Other Description"
              initialText={props.subscriptionPlan}
              onInputChange={(e) => {
                props.onFormInputChange &&
                  props.onFormInputChange(e.target.name, e.target.value);
              }}
              type="body20-regular"
              dark
            />
          </form>
        </Paper>
      </div>
      <Spacer y={3} />

      {/* Frquency and Payment Date */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Paper dark flat flexGrow>
          <SegmentedControl
            choices={frequencyChoices}
            defaultChoice={frequencyChoices[1]}
            onSelect={(selected) => {
              setFrequency(selected);
              props.onFormInputChange &&
                props.onFormInputChange("subscription_frequency", selected);
            }}
          />
        </Paper>
        <Paper dark flat flexGrow>
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            {frequenceSelected === "weekly" && (
              <Input
                inputType="search"
                name="subscription_paymentday"
                list="weekdays"
                label=""
                placeholder="Payment day"
                initialText={weekDays[new Date().getDay()]}
                onInputChange={(e) => {
                  props.onFormInputChange &&
                    props.onFormInputChange(e.target.name, e.target.value);
                }}
                type="body20-regular"
                dark
              />
            )}

            {frequenceSelected === "monthly" && (
              <Input
                inputType="tel"
                min="1"
                max="31"
                step="1"
                name="subscription_paymentday"
                list="days"
                label="Payment date of the month"
                placeholder="Day"
                initialText={days[new Date().getDate()]}
                onInputChange={(e) => {
                  props.onFormInputChange &&
                    props.onFormInputChange(e.target.name, e.target.value);
                }}
                type="body20-regular"
                dark
              />
            )}

            {frequenceSelected === "yearly" && (
              <Input
                inputType="tel"
                min="1"
                max="31"
                step="1"
                name="subscription_paymentday"
                list="days"
                label="Payment date"
                placeholder="Day"
                initialText={days[new Date().getDate()]}
                onInputChange={(e) => {
                  props.onFormInputChange &&
                    props.onFormInputChange(e.target.name, e.target.value);
                }}
                type="body20-regular"
                dark
              />
            )}
          </form>
        </Paper>
      </div>

      <Spacer y={3} />

      {/* Currency and Amount */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Paper dark flat flexGrow>
          <Input
            name="subscription_amount"
            inputType="number"
            label=""
            placeholder="Amount"
            onInputChange={(e) => {
              props.onFormInputChange &&
                props.onFormInputChange(e.target.name, e.target.value);
            }}
            type="body20-regular"
            dark
          />
        </Paper>
        <Paper dark flat flexGrow>
          <Input
            name="subscription_currency"
            list="currency_list"
            label=""
            placeholder="Select Currency"
            onInputChange={(e) => {
              props.onFormInputChange &&
                props.onFormInputChange(e.target.name, e.target.value);
            }}
            type="body20-regular"
            dark
          />
        </Paper>
      </div>

      <Spacer y={3} />
      <Paper dark rounded transparent>
        <SaveButton
          onClick={() => props.onFormSubmit && props.onFormSubmit()}
        />
      </Paper>

      <datalist id="currency_list">
        {Object.entries(currencies).map(([currencyCode, currencyName], i) => (
          <option key={currencyCode} value={currencyCode}>
            {currencyName}
          </option>
        ))}
      </datalist>

      <datalist id="plans_list">
        {(props.plans || []).map((plan, i) => (
          <option key={i} value={plan}>
            {plan}
          </option>
        ))}
      </datalist>

      <datalist id="weekdays">
        {weekDays.map((day, i) => (
          <option key={i} value={day}>
            {day}
          </option>
        ))}
      </datalist>

      <datalist id="days">
        {days.map((day, i) => (
          <option key={i} value={day}>
            {day}
          </option>
        ))}
      </datalist>
    </>
  );
};
