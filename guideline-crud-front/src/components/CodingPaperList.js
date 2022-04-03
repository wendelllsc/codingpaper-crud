import React, { useState, useEffect, useMemo, useRef } from "react";
import GuidelineService from "../services/CodingPaperService";
import { useTable } from "react-table";
import { useNavigate  } from "react-router-dom"

const CodingPaperList = props => {
  const [guidelines, setGuidelines] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const guidelinesRef = useRef();
  guidelinesRef.current = guidelines;
  const navigate = useNavigate();
  useEffect(() => {
    retrieveGuidelines();
  }, []);
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveGuidelines = () => {
    GuidelineService.getAll()
      .then((response) => {
        setGuidelines(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveGuidelines();
  };
  const removeAllGuidelines = () => {
    GuidelineService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    GuidelineService.findByTitle(searchTitle)
      .then((response) => {
        setGuidelines(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const openGuidelines = (rowIndex) => {
    const id = guidelinesRef.current[rowIndex].id;
    console.log(props)
    navigate("/codingpapers/" + id);
  };
  const deleteGuideline = (rowIndex) => {
    const id = guidelinesRef.current[rowIndex].id;
    GuidelineService.remove(id)
      .then((response) => {
        props.history.push("/codingpapers");
        let newGuidelines = [...guidelinesRef.current];
        newGuidelines.splice(rowIndex, 1);
        setGuidelines(newGuidelines);
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
              <span onClick={() => openGuidelines(rowIdx)}>
                <i className="far fa-edit action mr-2">Edit</i>
              </span>
              <span onClick={() => deleteGuideline(rowIdx)}>
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
    data: guidelines,
  });
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
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
      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllGuidelines}>
          Remove All
        </button>
      </div>
    </div>
  );
};
export default CodingPaperList;