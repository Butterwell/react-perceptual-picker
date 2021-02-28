import React from "react";
import PerceptualPicker from "./perceptual-picker";

export default {
  title: "Perceptual Picker",
  component: PerceptualPicker,
};

const onChange = (string) => console.log(string);
export const Default = (): React.ReactNode => (
  <PerceptualPicker onChange={onChange} centerColor="#aaaaaa" />
);
