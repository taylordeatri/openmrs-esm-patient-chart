import React from "react";
import style from "./conditions-list-card-style.css";
import dayjs from "dayjs";
import SummaryCard from "../../cards/summary-card.component";
import CardHeader from "../../cards/card-header.component";
import CardHeaderItem from "../../cards/card-header-item.component";
import CardRow from "../../cards/card-row.component";
import CardItem from "../../cards/card-item.component";
import { match } from "react-router";
import { useCurrentPatient } from "@openmrs/esm-api";
import {
  getConditionAbatementDateMonth,
  getConditionStatus,
  isConditionInactive
} from "./condition-utils";

export default function ConditionListCard(props: ConditionCardProps) {
  const [
    isLoadingPatient,
    patient,
    patientUuid,
    patientErr
  ] = useCurrentPatient();

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
    <SummaryCard name="Conditions" match={props.match} styles={style}>
      <CardHeader className={style.conditionsListHeader}>
        <CardHeaderItem>CONDITION</CardHeaderItem>
        <CardHeaderItem>ONSET DATE</CardHeaderItem>
        <CardHeaderItem>STATUS</CardHeaderItem>
        <div />
      </CardHeader>
      {props.conditions &&
        props.conditions
          .map(condition => condition.resource)
          .map(condition => {
            return (
              <React.Fragment key={condition.id}>
                <CardRow
                  className={
                    (isConditionInactive(condition) &&
                      style.conditionStatusInactive) ||
                    style.conditionsListContent
                  }
                  match={props.match}
                  cardId={"condition/" + condition.id}
                >
                  <CardItem>{condition.code.text}</CardItem>
                  <CardItem>
                    {dayjs(condition.onsetDateTime).format("MMM-YYYY")}
                  </CardItem>
                  <CardItem>{getConditionStatus(condition)}</CardItem>
                </CardRow>
              </React.Fragment>
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

type ConditionCardProps = {
  match: match;
  conditions: any;
};
