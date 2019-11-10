import React from "react";

export default function CardHeader(props: CardHeaderProps) {
  return (
    <div className={props.className} style={props.styles}>
      {props.children}
    </div>
  );
}

CardHeader.defaultProps = {
  styles: {},
  className: "omrs-type-body-regular"
};

type CardHeaderProps = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};
