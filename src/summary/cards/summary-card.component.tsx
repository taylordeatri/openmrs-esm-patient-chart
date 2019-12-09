import React, { ReactChildren } from "react";
import styles from "./summary-card.css";
import { match, Link } from "react-router-dom";
import { render } from "@testing-library/react";

export default function SummaryCard(props: SummaryCardProps) {
  return (
    <div style={props.styles} className={`omrs-card ${styles.card}`}>
      <div className={styles.title}>
        <h2 className={`omrs-margin-0`}>{props.name}</h2>
        {props.linkTo && (
          <Link to={props.match.url + "/" + props.linkTo}>
            <svg className="omrs-icon" fill="rgba(0, 0, 0, 0.54)">
              <use xlinkHref="#omrs-icon-chevron-right" />
            </svg>
          </Link>
        )}
        <button className={`omrs-unstyled ${styles.addBtn}`}>Add</button>
      </div>
      {props.children}
    </div>
  );
}

type SummaryCardProps = {
  name: string;
  match: match;
  children: React.ReactNode;
  styles?: React.CSSProperties;
  linkTo?: string;
};

type Styles = {};
