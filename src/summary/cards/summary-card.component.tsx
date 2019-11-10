import React, { ReactChildren } from "react";
import styles from "./summary-card.css";
import { match,  useHistory } from "react-router";
import { render } from "@testing-library/react";


export default function SummaryCard(props: SummaryCardProps) {
  let history = useHistory();
  function handleHeaderClick() {
    props.level2 && history.push(props.match.url + "/" + props.level2);
  }
  return (
    <div className={`omrs-card ${styles.card}`} style={props.styles}>
      <div className={styles.header}>
        <h2 className={`omrs-margin-0`}>{props.name}</h2>
        <div onClick={handleHeaderClick} >
          <svg className="omrs-icon" fill="rgba(0, 0, 0, 0.54)">
            <use xlinkHref="#omrs-icon-chevron-right" />
          </svg>
        </div>
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
  level2?: string;
};
