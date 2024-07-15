import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({loading}){

    return (
      <div className="Loading" style={loading?{display: "flex"}:{display: "none"}}>
        <Spinner animation="border" size="500px" />
      </div>
    );
  
}

export default Loading;
