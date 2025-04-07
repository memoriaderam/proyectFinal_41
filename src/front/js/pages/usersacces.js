import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Acerca from "../../img/Acerca.jpg";
import Acerca2 from "../../img/Acerca2.jpg";

import "../../styles/home.css";

export const Users = () => {
  const { store, actions } = useContext(Context);

  return (
    <div class="container-fluid border text-center">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div class="row row-cols-4">
            <div class="col-12">
              <h1>Acceso de Usuario</h1>
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



export default Users;
