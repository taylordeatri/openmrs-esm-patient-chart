import React from "react";

export default function CardHeaderItem(props: CardHeaderItemProps) {
  return <p className={props.className}>{props.children}</p>;
}

CardHeaderItem.defaultProps = {
  styles: {},
  className: "omrs-type-body-regular"
};

type CardHeaderItemProps = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};
