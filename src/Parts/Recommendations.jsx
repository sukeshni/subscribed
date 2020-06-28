import React from "react";
import { ListHeader } from "../Atoms/ListHeader";
import { Paper } from "../AppleDesign/atoms/Paper";
import { Avatar } from "../AppleDesign/atoms/Avatar";
import { Headline } from "../AppleDesign/atoms/Headline";
import { FlatCircleButton } from "../AppleDesign/atoms/buttons/FlatCircleButton";
import { services } from "../utils/services";
import { toPairs, scrollToTop } from "../utils/helpers";
import { inject, observer } from "mobx-react";
import { subscriptionFormStore } from "../stores/SubscriptionFormStore";

export const Recommendations = inject("stores")(
  observer(({ stores, dark }) => {
    const handleAddClick = (service) => {
      subscriptionFormStore.updateFormStateFromSuggestion({...service, name: service.search + ' '});
      subscriptionFormStore.updateFormVisibility(true);
      scrollToTop()
    };
    return (
      <div className="mb-2">
        <ListHeader title="Suggestions" />

        {toPairs(Object.keys(services)).map(
          ([serviceKey1, serviceKey2], index) => (
            <div style={{ display: "flex", flexWrap: "wrap" }} key={index}>
              <Paper transparent flexGrow rounded dark={dark}>
                <div className="flex" style={{ minWidth: "30vw" }}>
                  <Avatar image={services[serviceKey1].logo} dark={dark} />
                  <div
                    style={{
                      flexGrow: 1,
                      alignSelf: "center",
                      marginRight: "20px",
                    }}
                  >
                    <Headline type="body20-bold" dark={dark}>
                      {services[serviceKey1].name}
                    </Headline>
                    {/* <BodyText type="body15-regular" colorClass={"basic-gray"}>
                  Deewana bana de
                </BodyText> */}
                  </div>
                  <div style={{ alignSelf: "center", textAlign: "end" }}>
                    <FlatCircleButton
                      text="+ Add"
                      onTap={() => {
                        handleAddClick(services[serviceKey1]);
                      }}
                    />
                  </div>
                </div>
                <div className="thin-line" />
              </Paper>
              {serviceKey2 && (
                <Paper transparent flexGrow rounded dark={dark}>
                  <div className="flex" style={{ minWidth: "30vw" }}>
                    <Avatar image={services[serviceKey2].logo} dark={dark} />
                    <div
                      style={{
                        flexGrow: 1,
                        alignSelf: "center",
                        marginRight: "20px",
                      }}
                    >
                      <Headline type="body20-bold" dark={dark}>
                        {services[serviceKey2].name}
                      </Headline>
                      {/* <BodyText type="body15-regular" colorClass={"basic-gray"}>
                  Deewana bana de
                </BodyText> */}
                    </div>
                    <div style={{ alignSelf: "center", textAlign: "end" }}>
                      <FlatCircleButton
                        text="+ Add"
                        onTap={() => {
                          handleAddClick(services[serviceKey2]);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginLeft: "5px" }} className="thin-line" />
                </Paper>
              )}
            </div>
          )
        )}
      </div>
    );
  })
);
