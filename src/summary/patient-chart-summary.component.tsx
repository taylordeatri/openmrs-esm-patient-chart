import React from "react";
import { RouteComponentProps } from "react-router";
import { getCurrentPatient } from "@openmrs/esm-api";
import styles from "./patient-chart-summary.css";
import ProfileSection from "./profile/profile-section.component";

export default function PatientChartSummary(props: PatientChartSummaryProps) {
  const [currentPatient, setCurrentPatient] = React.useState(null);

  React.useEffect(() => {
    const subscription = getCurrentPatient().subscribe(patient => {
      setCurrentPatient(patient);
    });

    return () => subscription.unsubscribe();
  });

  return (
    <main className={`omrs-main-content ${styles.patientSummary}`}>
      <ProfileSection match={props.match} patient={currentPatient} />
    </main>
  );
}

type PatientChartSummaryProps = RouteComponentProps & {};
