import React from "react";
import styles from "./horizontal-label.css";

export default function HorizontalLabel(props: HorizontalLabelProps) {
  return (
      <p className={props.labelClassName || "omrs-type-body-regular"} style={props.labelStyles}>{props.label}</p>
  );
}

HorizontalLabel.defaultProps = {
  labelStyles: {},
  valueStyles: {},
  specialKey: false
};

type HorizontalLabelProps = {
  label: string;
  labelStyles?: React.CSSProperties;
  specialKey: boolean;
  labelClassName?: string;
};
