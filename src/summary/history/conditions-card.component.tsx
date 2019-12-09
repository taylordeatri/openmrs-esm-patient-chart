import React from "react";
import style from "./conditions-card-style.css";
import dayjs from "dayjs";
import SummaryCard from "../cards/summary-card.component";
import SummaryCardRow from "../cards/summary-card-row.component";
import SummaryCardRowContent from "../cards/summary-card-row-content.component";
import { match } from "react-router";
import { performPatientConditionSearch } from "./conditions.resource";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import HorizontalLabelValue from "../cards/horizontal-label-value.component";
import { useCurrentPatient } from "@openmrs/esm-api";

export default function ConditionsCard(props: ConditionsCardProps) {
  const [patientConditions, setPatientConditions] = React.useState(null);
  const [
    isLoadingPatient,
    patient,
    patientUuid,
    patientErr
  ] = useCurrentPatient();

  React.useEffect(() => {
    if (patient) {
      const abortController = new AbortController();
      performPatientConditionSearch(
        patient.identifier[0].value,
        abortController
      )
        .then(condition => setPatientConditions(condition.data))
        .catch(createErrorHandler());

      return () => abortController.abort();
    }
  }, [patient]);

  return (
    <SummaryCard name="Conditions" match={props.match} linkTo="condition">
      <SummaryCardRow>
        <SummaryCardRowContent>
          <HorizontalLabelValue
            label="Active Conditions"
            labelStyles={{
              color: "var(--omrs-color-ink-medium-contrast)",
              fontFamily: "Work Sans"
            }}
            value="Since"
            valueStyles={{
              color: "var(--omrs-color-ink-medium-contrast)",
              fontFamily: "Work Sans"
            }}
          />
        </SummaryCardRowContent>
      </SummaryCardRow>
      {patientConditions &&
        patientConditions.entry
          .map(condition => condition.resource)
          .map(condition => {
            return (
              <SummaryCardRow
                key={condition.id}
                linkTo={"chart/condition/" + condition.id}
              >
                <HorizontalLabelValue
                  label={condition.code.text}
                  labelStyles={{ fontWeight: 500 }}
                  value={dayjs(condition.onsetDateTime).format("MMM-YYYY")}
                  valueStyles={{ fontFamily: "Work Sans" }}
                />
              </SummaryCardRow>
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
};
