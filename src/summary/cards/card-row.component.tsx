import React from "react";
import {match, Link} from "react-router-dom";

export default function CardRow(props: CardRowProps) {
  return (
    <div className={props.className || "omrs-type-body-regular"} style={props.styles}>
      {props.children}
      {props.cardId && <Link to={props.match && props.match.url + "/" + props.cardId}>
          <svg className="omrs-icon" fill="rgba(0, 0, 0, 0.54)">
              <use xlinkHref="#omrs-icon-chevron-right" />
          </svg>
        </Link> 
      }

    </div>
  );
}

CardRow.defaultProps = {
  styles: {}
};

type CardRowProps = {
  match: match;
  cardId?: string;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};
