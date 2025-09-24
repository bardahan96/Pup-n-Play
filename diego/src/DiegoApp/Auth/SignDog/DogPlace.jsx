import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import DogWithAMap from "../AuthStyle/DogWithAMap2.png";

function DogPlace() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { goToDogDescription } = useOutletContext();

  return (
    <div>
      <div className="formInput">
        <label htmlFor="location">Where Is {dog.name} From?</label>
        <input
          type="text"
          id="location"
          value={dog.location}
          name="location"
          onChange={onChangeDogData}
          placeholder="City, Country"
        />
        <img className="sign-dog-img" src={DogWithAMap} alt="" />
        <button className="next-btn" onClick={goToDogDescription}> Next</button>
      </div>
    </div>
  );
}

export default DogPlace;
