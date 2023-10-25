import React from "react";
import "./DownloadLabResult.css";

const DownloadLabResult = (props) => {
    const options = [

        {
            text: "View Lab Results",
            id: 1,
        },
    ];;


    const optionsMarkup = options.map((option) => (
        <button
            className="sherbot-option-button"
            key={option.id}>
            {option.text}
        </button>
    ));

    return <div className="sherbot-options-container">{optionsMarkup}</div>
  };
  
  export default DownloadLabResult;