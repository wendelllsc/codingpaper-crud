import React, { useEffect, useState } from "react";
import CodingPaperService from "../services/CodingPaperService";
import FetchService from "../services/FetchService";
import Select from 'react-select'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const AddCodingPaper = () => {
  const initialCodingPaperState = {
    id: null,
    title: "",
    description: "",
    guidelines:[],
    sampleSize:0,
    recruitingStrategies:[],
    tagsCharacterization:[],
    hasStudents:false,
    hasProfessionals:false,
    designTypes:[],
    taskDuration:0,
    experimentalSetting:"",
    measuringOutcomes:[],
    timeMeasurementMethods:[],
    subjectiveMeasurementMethods:[]
  
    // Ver como pega o relacionado
  };
  const [codingPaper, setCodingPaper] = useState(initialCodingPaperState);
  const [submitted, setSubmitted] = useState(false);
  const [isMeasuringTemporal, setMeasuringTemporal] = useState(false);
  const [isMeasuringSubjective, setMeasuringSubjective] = useState(false);
  const [optionsGuidelines, setOptionsGuidelines] = useState([]);
  const [optionsRecruitingStrategies, setOptionsRecruitingStrategies] = useState([]);
  const [characterizationTags, setCharacterizationTags] = useState([])
  const [optionsDesignTypes, setOptionsDesignTypes] = useState([]);
  const [optionsMeasuringOutcomes, setMeasuringOutcomes] = useState([]);
  const [optionsTimeMeasurementMethods, setOptionsTimeMeasurementMethods] = useState([]);
  const [optionsSubjectiveMeasurementMethods, setSubjectiveMeasurementMethods] = useState([]);



  useEffect(() => {
    retrieveGuidelines();
    retrieveRecruitingStrategy();
    retrieveDesignTypes();
    retrieveMeasuringOutcomes();
    retrieveTimeMeasurementMethods();
    retrieveSubjectiveMeasurementMethods();
  }, []);

  const retrieveGuidelines = () => {
    FetchService.getAllGuidelines()
      .then((response) => {
        var optionsGuidelinesFormatado = []
        response.data.forEach((x, i) => optionsGuidelinesFormatado.push({ value: x.id, label: x.title+" - "+x.author }) );
        setOptionsGuidelines(optionsGuidelinesFormatado)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRecruitingStrategy = () => {
    FetchService.getAllRecruitingStrategies()
      .then((response) => {
        var optionsRecruitingFormatado = []
        response.data.forEach((x, i) => optionsRecruitingFormatado.push({ value: x.id, label: x.name }) );
        setOptionsRecruitingStrategies(optionsRecruitingFormatado)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveDesignTypes = () => {
    FetchService.getAllDesignTypes()
      .then((response) => {
        var optionsDesignTypesFormatado = []
        response.data.forEach((x, i) => optionsDesignTypesFormatado.push({ value: x.id, label: x.name }) );
        setOptionsDesignTypes(optionsDesignTypesFormatado)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveTimeMeasurementMethods = () => {
    FetchService.getAllTimeMeasurementMethods()
      .then((response) => {
        var optionsTimeMeasurementMethodsFormatado = []
        response.data.forEach((x, i) => optionsTimeMeasurementMethodsFormatado.push({ value: x.id, label: x.name }) );
        setOptionsTimeMeasurementMethods(optionsTimeMeasurementMethodsFormatado)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveSubjectiveMeasurementMethods = () => {
    FetchService.getAllSubjectiveMeasurementMethods()
      .then((response) => {
        var optionsSubjectiveMeasurementMethodsFormatado = []
        response.data.forEach((x, i) => optionsSubjectiveMeasurementMethodsFormatado.push({ value: x.id, label: x.name }) );
        setSubjectiveMeasurementMethods(optionsSubjectiveMeasurementMethodsFormatado)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveMeasuringOutcomes = () => {
    FetchService.getAllMeasuringOutcomes()
      .then((response) => {
        var optionsMeasuringOutcomesFormatado = []
        response.data.forEach((x, i) => optionsMeasuringOutcomesFormatado.push({ value: x.id, label: x.name }) );
        setMeasuringOutcomes(optionsMeasuringOutcomesFormatado)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCodingPaper({ ...codingPaper, [name]: value });
  };

  const handleSelectRecruitingStrategiesChange = event => {
    var optionsRecruitingFormatado = []
    event.forEach((x, i) => optionsRecruitingFormatado.push( { id: x.value , name: x.label}) );
    setCodingPaper({ ...codingPaper, ["recruitingStrategies"]: optionsRecruitingFormatado });
  };

  const handleSelectGuidelineChange = event => {
    var guideline = []
    event.forEach((x, i) => guideline.push( { id: x.value , name: x.label}) );
    setCodingPaper({ ...codingPaper, ["guidelines"]: guideline }); 
  };

  
  const handleCharacterizationTagsChange = newTags => {
    setCharacterizationTags(newTags)
    setCodingPaper({ ...codingPaper, ["tagsCharacterization"]: newTags }); 
  };

  const handleCheckbox = event => {
    const { name, checked } = event.target;
    setCodingPaper({ ...codingPaper, [name]: checked }); 
  };

  const handleSelectDesignTypes = event => {
    var designTypesFormatado = []
    event.forEach((x, i) => designTypesFormatado.push( { id: x.value , name: x.label}) );
    setCodingPaper({ ...codingPaper, ["designTypes"]: designTypesFormatado });
  };

  const handleMeasuringOutcomes = event => {
    var measuringOutcomesFormatado = [{ id: event.value , name: event.label}]
    setCodingPaper({ ...codingPaper, ["measuringOutcomes"]: measuringOutcomesFormatado });
    if(event.value == 2){
      setMeasuringTemporal(true)
      setMeasuringSubjective(false)
      setCodingPaper({ ...codingPaper, ["subjectiveMeasurementMethods"]: [] });
    }
    else if(event.value == 3){
      setMeasuringSubjective(true)
      setMeasuringTemporal(false)
      setCodingPaper({ ...codingPaper, ["timeMeasurementMethods"]: [] });

    }
    else if(event.value == 4){
      setMeasuringTemporal(true)
      setMeasuringSubjective(false)
      setCodingPaper({ ...codingPaper, ["subjectiveMeasurementMethods"]: [] });
    }
    else if(event.value == 5){
      setMeasuringSubjective(true)
      setMeasuringTemporal(true)
    }else{
      setMeasuringSubjective(false)
      setMeasuringTemporal(false)
      setCodingPaper({ ...codingPaper, ["timeMeasurementMethods"]: [], ["subjectiveMeasurementMethods"]: [] });
    }
  }

  const handleTemporalMethods = event => {
    var timeMeasurementMethodFormatado = []
    event.forEach((x, i) => timeMeasurementMethodFormatado.push( { id: x.value , name: x.label}) );
    setCodingPaper({ ...codingPaper, ["timeMeasurementMethods"]: timeMeasurementMethodFormatado });
  };

  const handleSubjectiveMethods = event => {
    var timeMeasurementMethodFormatado = []
    event.forEach((x, i) => timeMeasurementMethodFormatado.push( { id: x.value , name: x.label}) );
    setCodingPaper({ ...codingPaper, ["subjectiveMeasurementMethods"]: timeMeasurementMethodFormatado });
  };



  const saveCodingPaper = () => {
    var data = {
      title: codingPaper.title,
      description: codingPaper.description,
      guidelines: codingPaper.guidelines,
      sampleSize:codingPaper.sampleSize,
      recruitingStrategies:codingPaper.recruitingStrategies,
      tagsCharacterization:codingPaper.tagsCharacterization,
      hasStudents:codingPaper.hasStudents,
      hasProfessionals:codingPaper.hasProfessionals,
      taskDuration:codingPaper.taskDuration,
      experimentalSetting:codingPaper.experimentalSetting,
      measuringOutcomes:codingPaper.measuringOutcomes,
      timeMeasurementMethods:codingPaper.timeMeasurementMethods,
      subjectiveMeasurementMethods:codingPaper.subjectiveMeasurementMethods
    };
    return
    CodingPaperService.create(data)
      .then(response => {
        setCodingPaper({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          guidelines: response.data.description,
          sampleSize:response.data.sampleSize,
          recruitingStrategies:response.data.recruitingStrategies,
          tagsCharacterization:response.data.tagsCharacterization,
          hasStudents:response.data.hasStudents,
          hasProfessionals:response.data.hasProfessionals,
          taskDuration:response.data.taskDuration,
          experimentalSetting:response.data.experimentalSetting,
          measuringOutcomes:codingPaper.data.measuringOutcomes,
        });
        console.log(response)
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const newCodingPaper = () => {
    setCodingPaper(initialCodingPaperState);
    setSubmitted(false);
    setMeasuringTemporal(false);
    setMeasuringSubjective(false);
    setCharacterizationTags([]);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCodingPaper}>
            Add
          </button>
        </div>
      ) : (
        <div className="container">
          <h3>New Coding Paper</h3>
          <div className="row">
              <div className="col-md-6">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={codingPaper.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={codingPaper.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>
              <h4 className="mt-3">Sampling</h4>
              <div className="col-md-3">
                <label htmlFor="sampleSize">Sample Size</label>
                <input
                  type="number"
                  className="form-control"
                  id="sampleSize"
                  required
                  value={codingPaper.sampleSize}
                  onChange={handleInputChange}
                  name="sampleSize"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="recruitingStrategy">Recruiting sample strategy</label>
                <Select
                  className=""
                  isMulti
                  id="recruitingStrategy"
                  required
                  options={optionsRecruitingStrategies}
                  onChange={handleSelectRecruitingStrategiesChange}
                  name="recruitingStrategy"
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="guidelines">Guidelines</label>
                <Select
                  className=""
                  isMulti
                  id="guidelines"
                  required
                  options={optionsGuidelines}
                  onChange={handleSelectGuidelineChange}
                  name="guidelines"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="sampleCharacterization">Sample characterization</label>
                <ReactTagInput
                id="sampleCharacterization"
                name="sampleCharacterization"
                tags={characterizationTags}
                placeholder="Type and press enter"
                editable={true}
                removeOnBackspace={true}
                onChange={(newTags) => handleCharacterizationTagsChange(newTags)}
              />
              </div>

              <div className="col-md-6 checkbox-container">
                <div className="form-check form-check-inline">
                  <input onChange={handleCheckbox} className="form-check-input" type="checkbox" name="hasStudents" id="hasStudents" value="1"/>
                  <label className="form-check-label" htmlFor="hasStudents">Sample has Students</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={handleCheckbox} className="form-check-input" type="checkbox" name="hasProfessionals" id="hasProfessionals" value="1"/>
                  <label className="form-check-label" htmlFor="hasProfessionals">Sample has Professionals</label>
                </div>
              </div>

              <h4 className="mt-3">Experiment Design</h4>

              <div className="col-md-6">
                <label htmlFor="recruitingStrategy">Design Types</label>
                <Select
                  className=""
                  isMulti
                  id="designTypes"
                  required
                  options={optionsDesignTypes}
                  onChange={handleSelectDesignTypes}
                  name="designTypes"
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="sampleSize">Task Duration (Hour)</label>
                <input
                  type="number"
                  className="form-control"
                  id="taskDuration"
                  required
                  value={codingPaper.taskDuration}
                  onChange={handleInputChange}
                  name="taskDuration"
                />
              </div>

              <h4 className="mt-3">Control and Measuring</h4>

              <div className="col-md-3">
                <label htmlFor="title">Experimental Setting</label>
                <input
                  type="text"
                  className="form-control"
                  id="experimentalSetting"
                  required
                  value={codingPaper.experimentalSetting}
                  onChange={handleInputChange}
                  name="experimentalSetting"
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="recruitingStrategy">Measurement Variable</label>
                <Select
                  className=""
                  id="measuringOutcome"
                  required
                  options={optionsMeasuringOutcomes}
                  onChange={handleMeasuringOutcomes}
                  name="measuringOutcome"
                />
              </div>

              {isMeasuringTemporal &&

                  <div className="col-md-3">
                    <label htmlFor="recruitingStrategy">Measurement Temporal</label>
                    <Select
                      className=""
                      isMulti
                      id="timeMeasurementMethod"
                      required
                      options={optionsTimeMeasurementMethods}
                      onChange={handleTemporalMethods}
                      name="timeMeasurementMethod"
                    />
                  </div>
              }

              {isMeasuringSubjective &&

                  <div className="col-md-3">
                    <label htmlFor="recruitingStrategy">Measurement Subjective</label>
                    <Select
                      className=""
                      isMulti
                      id="subjectiveMeasurementMethods"
                      required
                      options={optionsSubjectiveMeasurementMethods}
                      onChange={handleSubjectiveMethods}
                      name="subjectiveMeasurementMethods"
                    />
                  </div>
              }

              <button onClick={saveCodingPaper} className="btn btn-success mt-3">
                Submit
              </button>
            </div>
        </div>

        
      )}
    </div>
  );;
};
export default AddCodingPaper;