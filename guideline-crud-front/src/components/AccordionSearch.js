import React, { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactTagInput from "@pathofdev/react-tag-input";
import FetchService from "../services/FetchService";
import Select from 'react-select'


const AccordionSearch = params => {

    const initialSearchParams = {
      title: "",
      description: "",
      guidelines:[],
      sampleSize:0,
      recruitingStrategies:[],
      tagsCharacterization:[],
      hasStudents:false,
      hasProfessionals:false,
      designTypes:[],
      taskDesignTypesTags:[],
      taskDuration:0,
      experimentalSetting:[],
      measuringOutcomes:[],
      timeMeasurementMethods:[],
      subjectiveMeasurementMethods:[],
      codingExperimentSupport:[],
      isReplicable:false
    
    
    };

    const [searchParams, setSearchParams] = useState(initialSearchParams);
    const [optionsRecruitingStrategies, setOptionsRecruitingStrategies] = useState([]);
    const [optionsGuidelines, setOptionsGuidelines] = useState([]);
    const [characterizationTags, setCharacterizationTags] = useState([])
    const [taskDesignTypesTags, setTaskDesignTypesTags] = useState([])
    const [optionsDesignTypes, setOptionsDesignTypes] = useState([]);
    const [optionsMeasuringOutcomes, setMeasuringOutcomes] = useState([]);
    const [isMeasuringTemporal, setMeasuringTemporal] = useState(false);
    const [isMeasuringSubjective, setMeasuringSubjective] = useState(false);
    const [optionsTimeMeasurementMethods, setOptionsTimeMeasurementMethods] = useState([]);
    const [optionsSubjectiveMeasurementMethods, setSubjectiveMeasurementMethods] = useState([]);
    const [optionsExperimentalSetting, setOptionsExperimentalSetting] = useState([]);


    useEffect(() => {
        retrieveRecruitingStrategy();
        retrieveGuidelines();
        retrieveDesignTypes();
        retrieveMeasuringOutcomes()
        retrieveTimeMeasurementMethods();
        retrieveSubjectiveMeasurementMethods();
        retrieveExperimentalSetting();
    }, []);

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

      const retrieveExperimentalSetting = () => {
        FetchService.getAllExperimentalSettings()
          .then((response) => {
            var optionsSubjectiveMeasurementMethodsFormatado = []
            response.data.forEach((x, i) => optionsSubjectiveMeasurementMethodsFormatado.push({ value: x.id, label: x.name }) );
            setOptionsExperimentalSetting(optionsSubjectiveMeasurementMethodsFormatado)
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

      const handleCharacterizationTagsChange = newTags => {
        setCharacterizationTags(newTags)
      };

      const handleTaskDesignTypesTagsChange = newTags => {
        setTaskDesignTypesTags(newTags)
      };

      const handleMeasuringOutcomes = event => {
        var measuringOutcomesFormatado = [];
        if (event.some( event => event.value == 2 )) {
          setMeasuringTemporal(true)
        }else{
          setMeasuringTemporal(false)
        }
        if (event.some( event => event.value == 3 )) {
          setMeasuringSubjective(true)
        }else{
          setMeasuringSubjective(false)
        }
      }

      const handleClickSearch = () => {
        var data = {
          title: searchParams.title,
          description: searchParams.description,
          guidelines: searchParams.guidelines,
          sampleSize:searchParams.sampleSize,
          recruitingStrategies:searchParams.recruitingStrategies,
          tagsCharacterization:searchParams.tagsCharacterization,
          hasStudents:searchParams.hasStudents,
          hasProfessionals:searchParams.hasProfessionals,
          taskDuration:searchParams.taskDuration,
          experimentalSetting:searchParams.experimentalSetting,
          measuringOutcomes:searchParams.measuringOutcomes,
          timeMeasurementMethods:searchParams.timeMeasurementMethods,
          subjectiveMeasurementMethods:searchParams.subjectiveMeasurementMethods,
          codingExperimentSupport:searchParams.codingExperimentSupport,
          taskDesignTypesTags:searchParams.taskDesignTypesTags,
          designTypes:searchParams.designTypes,
          isReplicable:searchParams.isReplicable
    
        };
        FetchService.searchByParams(data)
          .then((response) => {
           if(response.data != null && response.data.length > 0) {
            params.setCodingPapers(response.data)
           }else{
             console.log("Não achou nenhum com esses parâmetros")
           }
          })
          .catch((e) => {
            console.log(e);
          });
      }

      const handleInputChange = event => {
        const { name, value } = event.target;
        setSearchParams({ ...searchParams, [name]: value });
      };

      const handleSelectRecruitingStrategiesChange = event => {
        var optionsRecruitingFormatado = []
        event.forEach((x, i) => optionsRecruitingFormatado.push( { id: x.value , name: x.label}) );
        setSearchParams({ ...searchParams, ["recruitingStrategies"]: optionsRecruitingFormatado });
      };

      const handleSelectGuidelineChange = event => {
        var guideline = []
        event.forEach((x, i) => guideline.push( { id: x.value , name: x.label}) );
        setSearchParams({ ...searchParams, ["guidelines"]: guideline }); 
      };

      const handleCheckbox = event => {
        const { name, checked } = event.target;
        setSearchParams({ ...searchParams, [name]: checked }); 
      };

      const handleSelectDesignTypes = event => {
        var designTypesFormatado = [{ id: event.value , name: event.label}]
        setSearchParams({ ...searchParams, ["designTypes"]: designTypesFormatado });
      };

      const handleExperimentalSetting = event => {
        var guideline = []
        event.forEach((x, i) => guideline.push( { id: x.value , name: x.label}) );
        setSearchParams({ ...searchParams, ["experimentalSetting"]: guideline }); 
      };

      const handleTemporalMethods = event => {
        var timeMeasurementMethodFormatado = []
        event.forEach((x, i) => timeMeasurementMethodFormatado.push( { id: x.value , name: x.label}) );
        setSearchParams({ ...searchParams, ["timeMeasurementMethods"]: timeMeasurementMethodFormatado });
      };

      const handleSubjectiveMethods = event => {
        var timeMeasurementMethodFormatado = []
        event.forEach((x, i) => timeMeasurementMethodFormatado.push( { id: x.value , name: x.label}) );
        setSearchParams({ ...searchParams, ["subjectiveMeasurementMethods"]: timeMeasurementMethodFormatado });
      };
      
  return (
    <div>
      <div className="card p-3">
        <Typography className="mb-2" variant="h5">Search coding experiments</Typography>
        
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="general-content"
          id="general-header"
        >
          <Typography>General</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
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
                    onChange={handleInputChange}
                    name="description"
                    />
                </div>
            </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="sampling-header"
          id="sampling-header"
        >
          <Typography>Sampling</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="sampleSize">Sample Size</label>
                    <input
                    type="number"
                    className="form-control"
                    id="sampleSize"
                    required
                    onChange={handleInputChange}
                    name="sampleSize"
                    />
                </div>

                <div className="col-md-8">
                    <label htmlFor="recruitingStrategy">Recruiting sample strategy</label>
                    <Select
                    className=""
                    isMulti
                    id="recruitingStrategy"
                    required
                    onChange={handleSelectRecruitingStrategiesChange}
                    options={optionsRecruitingStrategies}
                    name="recruitingStrategy"
                    />
                </div>

                <div className="col-md-12">
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

              <div className="col-md-12">
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

              <div className="col-md-12 checkbox-container mt-3">
                <div className="form-check form-check-inline">
                  <input onChange={handleCheckbox} className="form-check-input" type="checkbox" name="hasStudents" id="hasStudents" value="1"/>
                  <label className="form-check-label" htmlFor="hasStudents">Sample has Students</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="hasProfessionals" id="hasProfessionals" value="1"/>
                  <label className="form-check-label" htmlFor="hasProfessionals">Sample has Professionals</label>
                </div>
              </div>

            </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="general-content"
          id="general-header"
        >
          <Typography>Experiment Design</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="recruitingStrategy">Design Types</label>
                    <Select
                    className=""
                    id="designTypes"
                    required
                    options={optionsDesignTypes}
                    onChange={handleSelectDesignTypes}
                    name="designTypes"
                    />
                </div>

                <div className="col-md-12">
                    <label htmlFor="taskDesignTypes">Task Design Types</label>
                    <ReactTagInput
                    id="taskDesignTypes"
                    name="taskDesignTypes"
                    tags={taskDesignTypesTags}
                    placeholder="Type and press enter"
                    editable={true}
                    removeOnBackspace={true}
                    onChange={(newTags) => handleTaskDesignTypesTagsChange(newTags)}
                />
                </div>
            </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="general-content"
          id="general-header"
        >
          <Typography>Control and Measuring</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="experimentalSetting">Experimental Setting</label>
                    <Select
                      className=""
                      id="experimentalSetting"
                      required
                      isMulti
                      options={optionsExperimentalSetting}
                      onChange={handleExperimentalSetting}
                      name="experimentalSetting"
                    />
                  </div>

                <div className="col-md-6">
                    <label htmlFor="recruitingStrategy">Measurement Variable</label>
                    <Select
                    className=""
                    id="measuringOutcome"
                    required
                    isMulti
                    options={optionsMeasuringOutcomes}
                    onChange={handleMeasuringOutcomes}
                    name="measuringOutcome"
                    />
                </div>

                {isMeasuringTemporal &&

                    <div className="col-md-6">
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

                    <div className="col-md-6">
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

                <div className="col-md-6 checkbox-container">
                  <div className="form-check form-check-inline">
                      <input onChange={handleCheckbox} className="form-check-input" type="checkbox" name="isReplicable" id="isReplicable" value="1"/>
                      <label className="form-check-label" htmlFor="isReplicable">Experiment is replicable</label>
                  </div>
                </div>
            </div>
        </AccordionDetails>
      </Accordion>
      <button onClick={() => handleClickSearch()} className="btn btn-success mt-2">
            Search
      </button>
    </div>
    </div>
  );
};
export default AccordionSearch;