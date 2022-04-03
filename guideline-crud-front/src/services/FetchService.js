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

const getAllCodingExperimentSupports = () => {
  return http.get("/codingExperimentSupports");
};

const getAllExperimentalSettings = () => {
  return http.get("/experimentalSettings");
};

const searchByParams = data => {
  return http.post(`/searchCodingpapers`, data);
};

export default {
  getAllGuidelines,
  getAllRecruitingStrategies,
  getAllDesignTypes,
  getAllMeasuringOutcomes,
  getAllTimeMeasurementMethods,
  getAllSubjectiveMeasurementMethods,
  getAllCodingExperimentSupports,
  getAllExperimentalSettings,
  searchByParams
};