import React, { useContext } from "react";
import { Context } from "../store/appContext";


import "../../styles/home.css";

export const Testimonys = () => {
  const { store, actions } = useContext(Context);

  
  return (
    <div class="container-fluid border text-center">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div class="row row-cols-4">
            <div class="col-12">
              <h1>Testimonios</h1>
            </div>
          </div>
    
          <br></br>
          <br></br>
          
    
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      );
    };







export default Testimonys;