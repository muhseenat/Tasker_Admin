import React, { useState, useEffect } from 'react'
import styles from "../styles/Home.module.css";
import axios from '../axios'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faTimesCircle 
  } from "@fortawesome/free-solid-svg-icons";
const category = () => {

    const [allCategory, setAllCategory] = useState([]);
    const [category, setCategory] = useState("")

    useEffect(() => {
        axios.get('/get/category').then((resp) => {
            console.log(resp);
            setAllCategory(resp?.data)
        }).catch(err => { console.log(err) })
    }, [])
    const addCategory = () => {
        axios.post('/add/category', category, { headers: { "Content-Type": 'application/json' } })
            .then((resp) => {
                console.log(resp.data);
                setAllCategory(resp?.data)
                setCategory("");
            }).catch(err => console.log(err))
    }
const deleteCatg=(id)=>{
      axios.delete(`/delete/category/${id}`).then((resp)=>{
        console.log(resp.data);
        setAllCategory(resp?.data)
    }).catch(err => console.log(err))
}
    return (
        <>
            <Sidebar />
            <Navbar />
            <div className={styles.contentcontainer}>
                <div className='container'>
                    <h3 className='text-center mt-5'>Add Category</h3>
                    <div className="text-align-center mt-5">
                        <div className="col-lg-4 ">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Enter Category" onChange={(e) => setCategory(e.target.value)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={addCategory}>Submit</button>
                                </span>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <table className="table w- ">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCategory.map((catg, index) => (

                                            <tr>
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
                            </div></div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default category