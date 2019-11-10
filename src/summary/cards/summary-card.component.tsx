import React, { ReactChildren } from "react";
import styles from "./summary-card.css";
import { match, Link } from "react-router-dom";
import { render } from "@testing-library/react";


export default function SummaryCard(props: SummaryCardProps) {
  return (
    <div className={`omrs-card ${styles.card}`} style={props.styles}>
      <div className={styles.header}>
        <h2 className={`omrs-margin-0`}>{props.name}</h2>
        { props.linkTo &&
        <Link to={ (props.linkTo && (props.match.url + "/" + props.linkTo) ) || ''}>
          <svg className="omrs-icon" fill="rgba(0, 0, 0, 0.54)">
              <use xlinkHref="#omrs-icon-chevron-right" />
          </svg>
        </Link>
        }
      </div>
      {props.children}
    </div>
  );
}

SummaryCard.defaultProps = {
  styles: {}
};

type SummaryCardProps = {
  name: string;
  match: match;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  linkTo?: string;
};
