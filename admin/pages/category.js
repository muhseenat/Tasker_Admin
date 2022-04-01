import React from 'react'
import styles from "../styles/Home.module.css";

const category = () => {
  return (
    <div className={styles.contentcontainer}>
      
      <img src="..." className="rounded mx-auto d-block mt-3" alt="..."/>
      <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <div className="input-group-append">
    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
  </div>
</div>
      
      </div>
  )
}

export default category