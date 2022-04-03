import React, { useState, useEffect, useMemo, useRef } from "react";
import CodingPaperService from "../services/CodingPaperService";
import { useTable } from "react-table";
import { useNavigate  } from "react-router-dom"

const CodingPaperList = props => {
  const initialSearchParams = {
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
    taskDesignTypesTags:[],
    taskDuration:0,
    experimentalSetting:"",
    measuringOutcomes:[],
    timeMeasurementMethods:[],
    subjectiveMeasurementMethods:[],
    codingExperimentSupport:[]
  
    // Ver como pega o relacionado
  };

  const [codingpapers, setCodingPapers] = useState([]);
  const [searchParams, setSearchTitle] = useState(initialSearchParams);
  const codingPaperRef = useRef();
  codingPaperRef.current = codingpapers;
  const navigate = useNavigate();
  useEffect(() => {
    retrieveCodingPapers();
  }, []);
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchParams);
  };
  const retrieveCodingPapers = () => {
    CodingPaperService.getAll()
      .then((response) => {
        setCodingPapers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCodingPapersFiltered = () => {
    CodingPaperService.getAll()
      .then((response) => {
        setCodingPapers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const refreshList = () => {
    retrieveCodingPapers();
  };
  const removeCodingPapers = () => {
    CodingPaperService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    CodingPaperService.findByTitle(searchParams)
      .then((response) => {
        setCodingPapers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const openCodingPapers = (rowIndex) => {
    const id = codingPaperRef.current[rowIndex].id;
    console.log(props)
    navigate("/codingpapers/" + id);
  };
  const deleteCodingPapers = (rowIndex) => {
    const id = codingPaperRef.current[rowIndex].id;
    CodingPaperService.remove(id)
      .then((response) => {
        props.history.push("/codingpapers");
        let newCodingPapers = [...codingPaperRef.current];
        newCodingPapers.splice(rowIndex, 1);
        setCodingPapers(newCodingPapers);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openCodingPapers(rowIdx)}>
                <i className="far fa-edit action mr-2">Edit</i>
              </span>
              <span onClick={() => deleteCodingPapers(rowIdx)}>
                <i className="fas fa-trash action"> - Delete</i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: codingpapers,
  });
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchParams}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeCodingPapers}>
          Remove All
        </button>
      </div> */}
    </div>
  );
};
export default CodingPaperList;