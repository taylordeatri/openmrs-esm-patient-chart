import React from "react";
import { match, useHistory } from "react-router";
import {
  performPatientConditionSearch,
  lookupPatientConditionById
} from "../conditions.resource";
import SummaryCard from "../../cards/summary-card.component";
import styles from "./condition-card-level-three-edit-style.css";
import dayjs from "dayjs";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import { useCurrentPatient } from "@openmrs/esm-api";
import {
  getConditionAbatementDate,
  getConditionStatus,
  isConditionInactive,
  CONDITION_STATUS
} from "./condition-utils";

export function ConditionCardLevelThreeEdit(
  props: ConditionCardLevelThreeEditProps
) {
  const [patientCondition, setPatientCondition] = React.useState(null);

  const [condStatus, setCondStatus] = React.useState("");
  const [condOnsetDate, setCondOnsetDate] = React.useState("");
  const [condAbatementDate, setCondAbatementDate] = React.useState("");
  const [
    condAbatementDateDisabled,
    setCondAbatementDateDisabled
  ] = React.useState(true);

  const [
    isLoadingPatient,
    patient,
    patientUuid,
    patientErr
  ] = useCurrentPatient();

  let history = useHistory();

  React.useEffect(() => {
    if (patient) {
      const abortController = new AbortController();

      lookupPatientConditionById(props.patientConditionId, abortController)
        .then(condition => setPatientCondition(condition))
        .catch(createErrorHandler());
      return () => abortController.abort();
    }
  }, [patient, props.patientConditionId]);

  React.useEffect(() => {
    setCondStatus(patientCondition && patientCondition.clinicalStatus);
    setCondOnsetDate(
      (patientCondition &&
        dayjs(patientCondition.onsetDateTime).format("MM/DD/YYYY")) ||
        ""
    );
    setCondAbatementDate(
      (patientCondition && getConditionAbatementDate(patientCondition)) || ""
    );
  }, [patientCondition]);

  React.useEffect(() => {
    if (condStatus === CONDITION_STATUS.ACTIVE) {
      setCondAbatementDate("");
      setCondAbatementDateDisabled(true);
    } else {
      setCondAbatementDate(
        (patientCondition && getConditionAbatementDate(patientCondition)) || ""
      );
      setCondAbatementDateDisabled(false);
    }
  }, [condStatus, patientCondition]);

  function updateCondition() {
    // Update Condition
    patientCondition.clinicalStatus = condStatus;
    patientCondition.onsetDateTime = condOnsetDate;
    patientCondition.abatementDateTime = condAbatementDate;

    // Send update to server.
    //console.log("We should be sending update to the server here!");

    // We should close the form and return to the previous page.
    //console.log("We should close the form.")
    history.goBack();
  }

  return (
    <SummaryCard match={props.match} name="EditCondition">
      <div className={styles.conditionEditHeader}>
        <h1>Edit Conditions</h1>
      </div>
      <br />
      <div className={styles.conditionEditHeader}>
        <h4>{patientCondition && patientCondition.code.text}</h4>
      </div>
      <br />
      <div className={styles.conditionEditParagraph}>
        <h4>Date of Onset</h4>
      </div>
      <div className={styles.conditionEditParagraph}>
        <input
          type="text"
          value={condOnsetDate}
          onChange={event => setCondOnsetDate(event.target.value)}
        />
        <br />
      </div>
      <br />
      <div className={styles.conditionEditParagraph}>
        <h4>Current Status</h4>
        <label>
          <input
            type="radio"
            name="current_status"
            value={CONDITION_STATUS.ACTIVE}
            checked={condStatus === CONDITION_STATUS.ACTIVE}
            onChange={() => setCondStatus(CONDITION_STATUS.ACTIVE)}
          />
          Active
          <br />
        </label>
        <label>
          <input
            type="radio"
            name="current_status"
            value={CONDITION_STATUS.INACTIVE}
            checked={condStatus === CONDITION_STATUS.INACTIVE}
            onChange={() => setCondStatus(CONDITION_STATUS.INACTIVE)}
          />
          Inactive
          <br />
        </label>
        <label>
          <input
            type="radio"
            name="current_status"
            value={CONDITION_STATUS.HISTORYOF}
            checked={condStatus === CONDITION_STATUS.HISTORYOF}
            onChange={() => setCondStatus(CONDITION_STATUS.HISTORYOF)}
          />
          History of
          <br />
        </label>
        <label>
          <input
            type="radio"
            name="current_status"
            value={CONDITION_STATUS.RESOLVED}
            checked={condStatus === CONDITION_STATUS.RESOLVED}
            onChange={() => setCondStatus(CONDITION_STATUS.RESOLVED)}
          />
          Resolved
          <br />
        </label>
      </div>
      <div className={styles.conditionEditParagraph}>
        <h4>Date of inactivity</h4>
        <input
          type="text"
          name="dateOfInactivity"
          disabled={condAbatementDateDisabled}
          value={condAbatementDate}
          onChange={event => setCondAbatementDate(event.target.value)}
        />
        <br />
      </div>
      <div className="footer">
        <button className="delete" disabled={true}>
          Delete condition
        </button>
        <button className="cancel" onClick={() => history.goBack()}>
          Cancel changes
        </button>
        <button className="signnsave" onClick={updateCondition}>
          Sign &gt; Save
        </button>
      </div>
    </SummaryCard>
  );
}

//history.push(props.match.url)

type ConditionCardLevelThreeEditProps = {
  match: match;
  patientConditionId: string;
};
