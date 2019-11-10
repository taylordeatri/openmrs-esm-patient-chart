import React from "react";
import { match } from "react-router";
import SummarySectionCards from "../cards/summary-section-cards.component";
import { getCurrentPatient } from "@openmrs/esm-api";
import ConditionsListCard from "./conditions-list-card.component";

export default function ConditionsSection(props: HistorySectionProps) {
  const [currentPatient, setCurrentPatient] = React.useState(null);

  React.useEffect(() => {
    const subscription = getCurrentPatient().subscribe(patient =>
      setCurrentPatient(patient)
    );

    return () => subscription.unsubscribe();
  });

  return (
    <>
      {currentPatient && (
        <SummarySectionCards match={props.match}>
          <ConditionsListCard match={props.match} currentPatient={currentPatient} />
        </SummarySectionCards>
      )}
    </>
  );
}

type HistorySectionProps = {
  match: match;
};
