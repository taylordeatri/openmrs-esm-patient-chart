import React from "react";
import { match, Switch, Route } from "react-router";
import { AllergyCardLevelTwo } from "./history/allergy-card-level-two.component";
import { ConditionCardLevelTwo } from "./history/condition/condition-card-level-two.component";
import { ConditionCardLevelThreeEdit } from "./history/condition/condition-card-level-three-edit.component";
import DimensionsCardLevelTwo from "./documentation/dimensions-card-level-two.component";

export function LevelThreeRoutes(props: LevelThreeRoutesProps) {
  return (
    <main className="omrs-main-content">
      <Switch>
        <Route
          exact
          path="/patient/:patientUuid/chart/condition/:condId"
          render={routeProps => (
            <ConditionCardLevelThreeEdit
              match={props.match}
              patientConditionId={routeProps.match.params.condId}
            />
          )}
        />
        {/*
        }
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
        {
          */}
      </Switch>
    </main>
  );
}

type LevelThreeRoutesProps = {
  match: match;
};
