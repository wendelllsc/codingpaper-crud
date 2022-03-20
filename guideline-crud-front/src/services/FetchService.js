import http from "../http-common";
const getAllGuidelines = () => {
  return http.get("/guidelines");
};

const getAllRecruitingStrategies = () => {
  return http.get("/recruitingStrategies");
};

const getAllDesignTypes = () => {
  return http.get("/designTypes");
};

const getAllMeasuringOutcomes = () => {
  return http.get("/measuringOutcomes");
};

const getAllTimeMeasurementMethods = () => {
  return http.get("/timeMeasurementMethods");
};

const getAllSubjectiveMeasurementMethods = () => {
  return http.get("/subjectiveMeasurementMethods");
};

export default {
  getAllGuidelines,
  getAllRecruitingStrategies,
  getAllDesignTypes,
  getAllMeasuringOutcomes,
  getAllTimeMeasurementMethods,
  getAllSubjectiveMeasurementMethods
};