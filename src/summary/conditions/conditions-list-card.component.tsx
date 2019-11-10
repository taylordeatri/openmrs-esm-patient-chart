import React from "react";
import style from "./conditions-list-card-style.css";
import dayjs from "dayjs";
import SummaryCard from "../cards/summary-card.component";
import SummaryCardRow from "../cards/summary-card-row.component";
import SummaryCardRowContent from "../cards/summary-card-row-content.component";
import { match } from "react-router";
import { performPatientConditionSearch } from "../history/conditions.resource";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import HorizontalLabel from "../cards/horizontal-label.component";
import HorizontalValue from "../cards/horizontal-value.component";

export default function ConditionsListCard(props: ConditionsCardProps) {
  const [patientConditions, setPatientConditions] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    performPatientConditionSearch(
      props.currentPatient.identifier[0].value,
      abortController
    )
      .then(condition => setPatientConditions(condition))
      .catch(createErrorHandler());

    return () => abortController.abort();
  });

  const summaryStyle = {
    width : '100%'
  };


  return (
    <SummaryCard name="Conditions" match={props.match} styles={summaryStyle}>
      <div className={style.conditionsListHeader}>
        <p className="omrs-type-body-regular">CONDITION</p>
        <p className="omrs-type-body-regular">ONSET DATE</p>
        <p className="omrs-type-body-regular">STATUS</p>
      </div>
      {patientConditions &&
        patientConditions.entry.map(condition => {
          return (
            <div className={style.conditionsListContent}>
              <p className="omrs-bold">{condition.resource.code.text}</p>
              <p className="omrs-bold">{dayjs(condition.resource.onsetDateTime).format("MMM-YYYY")}</p>
              <p className="omrs-bold">{condition.resource.clinicalStatus.text}</p>
            </div>
          );
        })}
      <div className={style.conditionMore}>
        <svg className="omrs-icon">
          <use
            xlinkHref="#omrs-icon-chevron-down"
            fill="var(--omrs-color-ink-low-contrast)"
          ></use>
        </svg>
        <p>more</p>
      </div>
    </SummaryCard>
  );
}

type ConditionsCardProps = {
  match: match;
  currentPatient: any;
};
