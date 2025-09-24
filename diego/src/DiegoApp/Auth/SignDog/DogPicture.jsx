import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import DogTakingAPic from "../AuthStyle/DogTakingAPic2.png";

function DogPicture() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { goToDogPlace } = useOutletContext();

  return (
    <div className="formInput">
      <label htmlFor="uploadImgs">
        Please Upload {dog.name}'s Best Picture
      </label>
      <input
        type="file"
        name="imgs"
        multiple
        accept="image/*"
        id="uploadImgs"
        onChange={onChangeDogData}
      />
      <img className="sign-dog-img" src={DogTakingAPic} alt="" />
      <button className="next-btn" onClick={goToDogPlace}> Next</button>
    </div>
  );
}

export default DogPicture;
