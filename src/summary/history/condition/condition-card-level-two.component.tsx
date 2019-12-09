import React from "react";
import { match } from "react-router";
import { performPatientConditionSearch } from "../conditions.resource";
import SummarySectionCards from "../../cards/summary-section-cards.component";
import ConditionsListCard from "./conditions-list-card.component";
import styles from "./condition-card-level-two.css";
import ConditionsSection from "./conditions-section.component";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import { useCurrentPatient } from "@openmrs/esm-api";

export function ConditionCardLevelTwo(props: ConditionCardLevelTwoProps) {
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

      performPatientConditionSearch(patient.id, abortController)
        .then(condition => setPatientConditions(condition.data.entry))
        .catch(createErrorHandler());
      return () => abortController.abort();
    }
  }, [patient]);

  return (
    <SummarySectionCards match={props.match}>
      <ConditionsListCard match={props.match} conditions={patientConditions} />
    </SummarySectionCards>
  );
}

type ConditionCardLevelTwoProps = {
  match: match;
};
