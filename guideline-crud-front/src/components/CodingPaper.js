import React, { useState, useEffect } from "react";
import GuidelineService from "../services/CodingPaperService";
const Guideline = props => {
  const initialGuidelineState = {
    id: null,
    title: ""
  };
  const [currentGuideline, setCurrentGuideline] = useState(initialGuidelineState);
  const [message, setMessage] = useState("");
  const getGuideline = id => {
    GuidelineService.get(id)
      .then(response => {
        setCurrentGuideline(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getGuideline(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentGuideline({ ...currentGuideline, [name]: value });
  };
  const updatePublished = status => {
    var data = {
      id: currentGuideline.id,
      title: currentGuideline.title,
    };
    GuidelineService.update(currentGuideline.id, data)
      .then(response => {
        setCurrentGuideline({ ...currentGuideline, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const updateGuideline = () => {
    GuidelineService.update(currentGuideline.id, currentGuideline)
      .then(response => {
        console.log(response.data);
        setMessage("The guideline was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const deleteGuideline = () => {
    GuidelineService.remove(currentGuideline.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/codingpapers");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentGuideline ? (
        <div className="edit-form">
          <h4>Guideline</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentGuideline.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentGuideline.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentGuideline.published ? "Published" : "Pending"}
            </div>
          </form>
          {currentGuideline.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <button className="badge badge-danger mr-2" onClick={deleteGuideline}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateGuideline}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Guideline...</p>
        </div>
      )}
    </div>
  );
};
export default Guideline;