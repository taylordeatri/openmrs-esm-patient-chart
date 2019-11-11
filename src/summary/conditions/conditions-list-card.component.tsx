import React from "react";
import style from "./conditions-list-card-style.css";
import dayjs from "dayjs";
import SummaryCard from "../cards/summary-card.component";
import CardHeader from "../cards/card-header.component";
import CardHeaderItem from "../cards/card-header-item.component";
import CardRow from "../cards/card-row.component";
import CardItem from "../cards/card-item.component";
import { match } from "react-router";
import { performPatientConditionSearch } from "../history/conditions.resource";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import { conditionalExpression } from "@babel/types";

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

  function getConditionAbatementDate(condition:any) {
    const abatementStr = 
      ( condition.abatementDateTime && dayjs(condition.abatementDateTime).format("MMM-YYYY") ) ||
      ( condition.abatementAge && condition.abatementAge ) ||
      ( condition.abatementBoolean && condition.abatementBoolean ) ||
      ( condition.abatementPeriod && dayjs(condition.abatementPeriod.end).format("MMM-YYYY")) ||
      ( condition.abatementRange && dayjs(condition.abatementPeriod.high).format("MMM-YYYY")) ||
      ( condition.abatementString && condition.abatementString);
    return abatementStr;
  }

  function isConditionInactive(condition) {
    if ( condition.resource.clinicalStatus && 
      (
        condition.resource.clinicalStatus === "inactive" || 
        condition.resource.clinicalStatus === "resolved" ||
        condition.resource.clinicalStatus === "remission" 
      ) ) {
        return true;
      } else {
        return false;
      }
}

  function getConditionStatus(condition) {
    if ( isConditionInactive(condition) ) {
      const condAbatementDateStr = getConditionAbatementDate(condition.resource);
      return "Inactive" + ( condAbatementDateStr && (" since " + condAbatementDateStr ) || "");
    } else {
      return "Active";
    }
  }

  /*
      <div className={style.conditionsListHeader}>
        <p className="omrs-type-body-regular">CONDITION</p>
        <p className="omrs-type-body-regular">ONSET DATE</p>
        <p className="omrs-type-body-regular">STATUS</p>
      </div>

      <div className={style.conditionsListContent}>
        <p className="omrs-bold">{condition.resource.code.text}</p>
        <p className="omrs-bold">{dayjs(condition.resource.onsetDateTime).format("MMM-YYYY")}</p>
        <p className="omrs-bold">{condition.resource.clinicalStatus.text}</p>
      </div>

  */

  return (
    <SummaryCard name="Conditions" match={props.match} styles={summaryStyle}>
      <CardHeader className={style.conditionsListHeader}>
        <CardHeaderItem>CONDITION</CardHeaderItem>
        <CardHeaderItem>ONSET DATE</CardHeaderItem>
        <CardHeaderItem>STATUS</CardHeaderItem>
        <div />
      </CardHeader>
      {patientConditions && patientConditions.entry.map(condition => {
          return (
            <CardRow className={isConditionInactive(condition) && style.conditionStatusInactive || style.conditionsListContent} match={props.match} cardId={condition.resource.id}>
              <CardItem>{condition.resource.code.text}</CardItem>
              <CardItem>{dayjs(condition.resource.onsetDateTime).format("MMM-YYYY")}</CardItem>
              <CardItem>{getConditionStatus(condition)}</CardItem>
            </CardRow>
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
