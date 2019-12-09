import React from "react";
import { match, Switch, Route } from "react-router";
import { AllergyCardLevelTwo } from "./history/allergy-card-level-two.component";
import { ConditionCardLevelTwo } from "./history/condition/condition-card-level-two.component";
import DimensionsCardLevelTwo from "./documentation/dimensions-card-level-two.component";

export function LevelTwoRoutes(props: LevelTwoRoutesProps) {
  return (
    <main className="omrs-main-content">
      <Switch>
        <Route
          exact
          path="/patient/:patientUuid/chart/condition"
          render={routeProps => <ConditionCardLevelTwo match={props.match} />}
        />
        <Route
          exact
          path={`/patient/:patientUuid/chart/allergy`}
          render={routeProps => <AllergyCardLevelTwo match={props.match} />}
        />
        <Route
          exact
          path={`/patient/:patientUuid/chart/dimensions`}
          render={routeProps => <DimensionsCardLevelTwo match={props.match} />}
        />
      </Switch>
    </main>
  );
}

type LevelTwoRoutesProps = {
  match: match;
};
