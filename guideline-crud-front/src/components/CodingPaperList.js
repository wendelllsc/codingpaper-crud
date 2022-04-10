import React, { useState, useEffect, useMemo, useRef } from "react";
import CodingPaperService from "../services/CodingPaperService";
import { useTable } from "react-table";
import { useNavigate  } from "react-router-dom"
import AccordionSearch from "./AccordionSearch";
import AlertaNaoEncontrado from "./AlertaNaoEncontrado"


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
  const [mostraErro, setMostraErro] = useState(false);
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

  const showNotFoundError = () => {
    setMostraErro(true)
    setTimeout(function() {setMostraErro(false)},3000)
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
  };;

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
      <div className="container mt-5">
        {mostraErro ? <AlertaNaoEncontrado/> : "" }
        <div className="row">
          <div className="col-md-4">
           <AccordionSearch setCodingPapers={setCodingPapers} retrieveCodingPapers={retrieveCodingPapers} showNotFoundError={showNotFoundError} />
          </div>
      
          <div className="col-md-8">
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
        </div>
      </div>
  );
};
export default CodingPaperList;