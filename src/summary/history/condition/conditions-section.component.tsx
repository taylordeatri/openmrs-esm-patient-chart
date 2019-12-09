import React from "react";
import { match } from "react-router";
import SummarySectionCards from "../../cards/summary-section-cards.component";
import { getCurrentPatient } from "@openmrs/esm-api";
import ConditionsListCard from "./conditions-list-card.component";

export default function ConditionsSection(props: HistorySectionProps) {
  return (
    <SummarySectionCards match={props.match}>
      <ConditionsListCard match={props.match} conditions={props.conditions} />
    </SummarySectionCards>
  );
}

type HistorySectionProps = {
  conditions: any;
  match: match;
};
