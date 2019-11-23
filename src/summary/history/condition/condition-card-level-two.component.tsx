import React from "react";
import { match } from "react-router";
import { performPatientConditionSearch } from "../conditions.resource";
import SummarySectionCards from "../../cards/summary-section-cards.component";
import ConditionsListCard from "./conditions-list-card.component";
import styles from "./condition-card-level-two.css";
import ConditionsSection from "./conditions-section.component";
import { createErrorHandler } from "@openmrs/esm-error-handling";

export function ConditionCardLevelTwo(props: ConditionCardLevelTwoProps) {
  const [patientConditions, setPatientConditions] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    performPatientConditionSearch(
      props.currentPatient.id,
      abortController
    )
    .then(condition => setPatientConditions(condition.data.entry))
    .catch(createErrorHandler());
    return () => abortController.abort();
  }, [props.currentPatient.identifier[0].value]);

 return (
  <SummarySectionCards match={props.match}>
    <ConditionsListCard match={props.match} currentPatient={props.currentPatient} conditions={patientConditions}/>
  </SummarySectionCards>
 )
}

type ConditionCardLevelTwoProps =
{
  currentPatient: fhir.Patient;
  match: match;
};
