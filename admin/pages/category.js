import React, { useState ,useRef} from 'react'
import styles from "../styles/Home.module.css";
import  axios from '../axios'
const category = () => {

     const dummyimg =
    "https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg";
    const [category,setCategory] = useState("")
    const [img,setImage]=useState({});
    const input = useRef()
    const triggerInput = (target) => {
        target.current.click();
      };
    const selectimg = (e) => {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          const url = URL.createObjectURL(file);
    
          setImage({ file, url });
        }
      };

      const addCategory =()=>{
          const formData = new FormData();
          console.log(img.file);
          console.log(category);
          formData.append('img',img.file);
          formData.append('category',JSON.stringify(category));
          console.log(JSON.stringify(formData),'this is formdata');
          axios.post('/add/category',formData,{
              headers:{
                  "Content-Type":"multipart/form-data",
              },
          }).then((resp)=>{
              console.log(resp);
          }).catch(err=> console.log(err))
      }
    
  return (
    <div className={styles.contentcontainer}>
      <div className='container'>
      <h3 className='text-center mt-5'>Add Category</h3>
          
      <div className='align-items-center justify-content-center '>
              <img className="rounded mx-auto d-block mt-5 shadow-lg" 
                onClick={() => {
                  triggerInput(input);
                }}
                style={{ height: "150px" }}
                src={img.url || dummyimg}
              />
              <input
                hidden
                ref={input}
                type="file"
                name="file2"
                onChange={selectimg}
              />
            </div> 
          
            <div className="text-align-center mt-5">
    <div className="col-lg-4 col-lg-offset-4">
        <div className="input-group">
            
            <input type="text" className="form-control" placeholder="Enter Category" onChange={(e)=>setCategory(e.target.value)} /> 
            <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={addCategory}>Submit</button>
            </span>
        </div>
    </div>
</div>

</div>            </div>     
    
  )
}

export default category