import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { ErrorHandlingContext } from "../../app/context/errorHandlingContext";
import AskingDogName from "../AuthStyle/AskingDogName2.png";

function DogName() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { getFieldError, validateDogName } = useContext(ErrorHandlingContext);
  const { goToDogPicture } = useOutletContext();

  function handleNext() {
    if (validateDogName({ name: dog.name })) {
      goToDogPicture();
    }
  }

  return (
    <>
      <div className="formInput">
        <label htmlFor="dogName" className="typing-label">
          Diego Is Asking What Is Your Dog's Name?
        </label>
        {getFieldError('dogName', 'name') && (
          <div className="field-error" role="alert">
            {getFieldError('dogName', 'name')}
          </div>
        )}
        <input
          type="text"
          id="dogName"
          name="name"
          value={dog.name}
          onChange={onChangeDogData}
          placeholder="Enter your dog's name"
        />
        <img className="asking-dog-name sign-dog-img" src={AskingDogName} alt="" />
        <button className="next-btn" onClick={handleNext}> Next</button>
      </div>
    </>
  );
}

export default DogName;
