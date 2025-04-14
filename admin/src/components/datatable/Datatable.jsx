import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./datatablesource.jsx";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import axios from 'axios';


const Datatable = ({type,columns}) => {
  // const [data, setData] = useState(userRows);
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  // console.log(path)
  const [list, setList] = useState([]);
  const {data,loading,error} = useFetch(`http://localhost:3200/api/${path}`);

  useEffect(()=>{
    setList(data)
  },[data])
  //todo; Delete handler
  const handleDelete = async(id) => {
    console.log(id)
    try{
      const res = await axios.delete(
        type==='users'||'hotels'?`http://localhost:3200/api/${path}/${id}`:
        `http://localhost:3200/api/${path}/${id}`,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
      }
      })
      console.log(res.data)
      setList(list.filter((item) => item._id !== id));
    }catch(error){
      console.log('error in deleting user: ', error)
    }
  };

  //todo; Action buttons View and Delete in Data Table;
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/userId" style={{ textDecoration: "none" }}> */}
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
       {path}
        {/* <Link to="/users/new" className="link"> */}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
