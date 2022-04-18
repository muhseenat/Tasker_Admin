import React, { useState, useEffect } from 'react'
import styles from "../styles/Home.module.css";
import axios from '../axios'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faTimesCircle 
  } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

const Category = () => {

    const [allCategory, setAllCategory] = useState([]);
    const [category, setCategory] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get('/get/category').then((resp) => {
            setAllCategory(resp?.data)
        }).catch(err => { console.log(err) })
    }, [])
    const handleCategory=(e)=>{
        setCategory(e.target.value)
        setError(false)
    }
    const addCategory = () => {
        if(category==""){
            setError(true)
        }
        else{
            axios.post('/add/category', category, { headers: { "Content-Type": 'application/json' } })
            .then((resp) => {
                setAllCategory(resp?.data)
                setCategory("");
                setError(false)
                swal({
                    title: "Success",
                    text: "Category added successfully",
                    icon: "success",
                  });
            }).catch(err => console.log(err))
        }
        
    }
const deleteCatg=(id)=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            axios.delete(`/delete/category/${id}`).then((resp)=>{
                setAllCategory(resp?.data)
            swal("Poof! Category has been deleted!", {
              icon: "success",
            });
          }).catch(err => console.log(err))
         
        } else {
          swal("Category is still there");
        }
      });
    
}



    return (
        <>
            <Sidebar />
            <Navbar />
            <div className={styles.contentcontainer}>
                <div className='container'>
                    <h3 className='text-center mt-5'>Add Category</h3>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="col-lg-4">
                            <div className="input-group">
                                <input type="text" className="form-control"value={category} placeholder="Enter Category" onChange={(e) => handleCategory(e)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={addCategory}>Submit</button>
                                </span>
                            </div>
                            {error&&<p style={{color:"red"}}>This field is required</p>}

                        </div>
                       </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col-auto">
                                <table className="table w- ">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCategory.map((catg, index) => (

                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                <td>{catg.name}</td>
                                                <td onClick={(e)=>{deleteCatg(catg._id)}}>
                                                    <FontAwesomeIcon
                                                    icon={  faTimesCircle }
                                                    style={{ width: "18px", cursor: "pointer", color: "dark" }}
                                                />{" "}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                    
                </div>


            </div>
        </>
    )
}

export default Category