import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import AskingDogName from "../AuthStyle/AskingDogName2.png";

function DogName() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { goToDogPicture } = useOutletContext();

  return (
    <>
      <div className="formInput">
        <label htmlFor="dogName">
          Diego Is Asking What Is Your Dog's Name?
        </label>
        <input
          type="text"
          id="dogName"
          name="name"
          value={dog.name}
          onChange={onChangeDogData}
          placeholder="Enter your dog's name"
        />
        <img className="asking-dog-name sign-dog-img" src={AskingDogName} alt="" />
        <button className="next-btn" onClick={goToDogPicture}> Next</button>
      </div>
    </>
  );
}

export default DogName;
