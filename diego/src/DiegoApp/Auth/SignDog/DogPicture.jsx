import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { ErrorHandlingContext } from "../../app/context/errorHandlingContext";
import DogTakingAPic from "../AuthStyle/DogTakingAPic2.png";

function DogPicture() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { getFieldError, validateDogPhotos } = useContext(ErrorHandlingContext);
  const { goToDogPlace } = useOutletContext();

  function handleNext() {
    if (validateDogPhotos({ imgs: dog.imgs })) {
      goToDogPlace();
    }
  }

  return (
    <div className="formInput">
      <label htmlFor="uploadImgs" className="typing-label">
        Please Upload {dog ? dog.name : "Your dog"}'s Best Picture
      </label>
      {getFieldError('dogPhotos', 'imgs') && (
        <div className="field-error" role="alert">
          {getFieldError('dogPhotos', 'imgs')}
        </div>
      )}
      <input
        type="file"
        name="imgs"
        multiple
        accept="image/*"
        id="uploadImgs"
        onChange={onChangeDogData}
      />
      <img className="sign-dog-img" src={DogTakingAPic} alt="" />
      <button className="next-btn" onClick={handleNext}> Next</button>
    </div>
  );
}

export default DogPicture;
