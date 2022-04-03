import React, { useState, useEffect } from 'react'
import styles from "../styles/Home.module.css";
import axios from '../axios'
const category = () => {

    const [allCategory,setAllCategory]= useState([]);
    const [category, setCategory] = useState("")

  useEffect(()=>{
     axios.get('/get/category').then((resp)=>{
         console.log(resp);
         setAllCategory(resp?.data)
     }).catch(err=>{console.log(err)})
  },[])
    const addCategory = () => {
        axios.post('/add/category',category)
            .then((resp) => {
                console.log(resp);
            }).catch(err => console.log(err))
    }
    console.log(allCategory);

    return (
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
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <table class="table w- ">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allCategory.map((catg,index)=>(
                                    
                                        <tr>
                                        <th scope="row">{index}</th>
                                        <td>{catg}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div></div>
                </div>
            </div>

            {/* //category delete section   */}
        </div>

    )
}

export default category