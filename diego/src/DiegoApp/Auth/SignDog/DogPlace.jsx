import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { ErrorHandlingContext } from "../../app/context/errorHandlingContext";
import DogWithAMap from "../AuthStyle/DogWithAMap2.png";

function DogPlace() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { getFieldError, validateDogLocation } = useContext(ErrorHandlingContext);
  const { goToDogDescription } = useOutletContext();

  function handleNext() {
    if (validateDogLocation({ location: dog.location })) {
      goToDogDescription();
    }
  }

  return (
    <div>
      <div className="formInput">
        <label htmlFor="location" className="typing-label">Where Is {dog ? dog.name : "Your dog"} From?</label>
        {getFieldError('dogLocation', 'location') && (
          <div className="field-error" role="alert">
            {getFieldError('dogLocation', 'location')}
          </div>
        )}
        <input
          type="text"
          id="location"
          value={dog.location}
          name="location"
          onChange={onChangeDogData}
          placeholder="City, Country"
        />
        <img className="sign-dog-img" src={DogWithAMap} alt="" />
        <button className="next-btn" onClick={handleNext}> Next</button>
      </div>
    </div>
  );
}

export default DogPlace;
