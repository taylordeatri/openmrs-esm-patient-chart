import dayjs from "dayjs";

export enum CONDITION_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  HISTORYOF = "history_of",
  RESOLVED = "resolved"
}

export function getConditionAbatementDate(condition: any) {
  const abatementStr =
    (condition.abatementDateTime &&
      dayjs(condition.abatementDateTime).format("MM/DD/YYYY")) ||
    (condition.abatementAge && condition.abatementAge) ||
    (condition.abatementBoolean && condition.abatementBoolean) ||
    (condition.abatementPeriod &&
      dayjs(condition.abatementPeriod.end).format("MM/DD/YYYY")) ||
    (condition.abatementRange &&
      dayjs(condition.abatementPeriod.high).format("MM/DD/YYYY")) ||
    (condition.abatementString && condition.abatementString);
  return abatementStr;
}

export function getConditionAbatementDateMonth(condition: any) {
  const abatementStr =
    (condition.abatementDateTime &&
      dayjs(condition.abatementDateTime).format("MMM-YYYY")) ||
    (condition.abatementAge && condition.abatementAge) ||
    (condition.abatementBoolean && condition.abatementBoolean) ||
    (condition.abatementPeriod &&
      dayjs(condition.abatementPeriod.end).format("MMM-YYYY")) ||
    (condition.abatementRange &&
      dayjs(condition.abatementPeriod.high).format("MMM-YYYY")) ||
    (condition.abatementString && condition.abatementString);
  return abatementStr;
}

export function isConditionInactive(condition) {
  if (
    condition.clinicalStatus &&
    (condition.clinicalStatus === "inactive" ||
      condition.clinicalStatus === "resolved" ||
      condition.clinicalStatus === "remission")
  ) {
    return true;
  } else {
    return false;
  }
}

export function getConditionStatus(condition) {
  if (isConditionInactive(condition)) {
    const condAbatementDateStr = getConditionAbatementDate(condition);
    return (
      "Inactive" +
      ((condAbatementDateStr && " since " + condAbatementDateStr) || "")
    );
  } else {
    return "Active";
  }
}
