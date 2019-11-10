import React from "react";

export default function CardItem(props: CardItemProps) {
  return (
    <p className={props.className || "omrs-bold"}>{props.children}</p>
  );
}

CardItem.defaultProps = {
  styles: {}
};

type CardItemProps = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};
