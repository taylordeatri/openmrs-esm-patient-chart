import React from "react";
import styles from "./horizontal-value.css";

export default function HorizontalValue(props: HorizontalValueProps) {
  return (
    <p className={props.valueClassName || "omrs-type-body-regular"} style={props.valueStyles}>{props.value}</p>
  );
}

HorizontalValue.defaultProps = {
  valueStyles: {},
  specialKey: false
};

type HorizontalValueProps = {
  label: string;
  value: React.ReactNode;
  valueStyles?: React.CSSProperties;
  specialKey: boolean;
  valueClassName?: string;
};
