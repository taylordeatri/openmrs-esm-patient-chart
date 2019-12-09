import React from "react";
import { match } from "react-router";
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
  isConditionInactive
} from "./condition-utils";

export function ConditionCardLevelThreeEdit(
  props: ConditionCardLevelThreeEditProps
) {
  const [patientCondition, setPatientCondition] = React.useState(null);
  const [
    isLoadingPatient,
    patient,
    patientUuid,
    patientErr
  ] = useCurrentPatient();

  React.useEffect(() => {
    if (patient) {
      const abortController = new AbortController();

      lookupPatientConditionById(props.patientConditionId, abortController)
        .then(condition => setPatientCondition(condition))
        .catch(createErrorHandler());
      return () => abortController.abort();
    }
  }, [props.patientConditionId]);

  return (
    <SummaryCard match={props.match} name="EditCondition">
      <div className={styles.conditionEditHeader}>
        <h1>Edit Conditions</h1>
      </div>
      <br />
      <div className={styles.conditionEditHeader}>
        <p>Condition</p>
        <h4>{patientCondition && patientCondition.code.text}</h4>
      </div>
      <br />
      <div className={styles.conditionEditParagraph}>
        <h4>Date of Onset</h4>
        <h4>
          {patientCondition &&
            dayjs(patientCondition.onsetDateTime).format("MM/DD/YYYY")}
        </h4>
      </div>
      <div className={styles.conditionEditParagraph}>
        <input
          type="text"
          name="date_picker_thing"
          value={
            patientCondition &&
            dayjs(patientCondition.onsetDateTime).format("MM/DD/YYYY")
          }
        />
        <br />
      </div>
      <br />
      <div className={styles.conditionEditParagraph}>
        <h4>Current Status</h4>
        <label>
          <input
            type="radio"
            name="cs_active"
            value="active"
            checked={
              patientCondition && patientCondition.clinicalStatus === "active"
            }
          />
          Active
          <br />
        </label>
        <label>
          <input
            type="radio"
            name="cs_inactive"
            value="inactive"
            checked={
              patientCondition && patientCondition.clinicalStatus === "inactive"
            }
          />
          Inactive
          <br />
        </label>
        <label>
          <input
            type="radio"
            name="cs_historyof"
            value="history_of"
            checked={
              patientCondition &&
              patientCondition.clinicalStatus === "history_of"
            }
          />
          History of
          <br />
        </label>
        <label>
          <input
            type="radio"
            name="cs_resolved"
            value="resolved"
            checked={
              patientCondition && patientCondition.clinicalStatus === "resolved"
            }
          />
          Resolved
          <br />
        </label>
      </div>
      <div className={styles.conditionEditParagraph}>
        <h4>Date of inactivity</h4>
        <input
          type="text"
          name="date_picker_thing"
          value={
            patientCondition && getConditionAbatementDate(patientCondition)
          }
        />
        <br />
      </div>
      {/*
        }
        <div className="footer">
            <button className="delete">Delete condition</button>
            <button className="cancle">Cancle changes</button>
            <button className="signnsave">Sign &gt; Save</button>
        </div>
        {
          */}
    </SummaryCard>
  );
}

type ConditionCardLevelThreeEditProps = {
  match: match;
  patientConditionId: string;
};
