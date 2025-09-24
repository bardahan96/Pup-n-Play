import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import Dogs from "../AuthStyle/Dogs2.png";
function DogDescription() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { submitDog } = useOutletContext();
  return (
    <div className="dog-description">
      <div className="formInput">
        <label htmlFor="description">How Would You Describe {dog.name}?</label>
        <input
          type="text"
          id="description"
          value={dog.description}
          name="description"
          onChange={onChangeDogData}
          placeholder="Hobbies, energy level, and what they're looking for"
        />
      </div>

      <div className="formInput">
        <label htmlFor="preferences">{dog.name}'s Breed:</label>
        <input
          type="text"
          id="preferences"
          value={dog.bread}
          name="bread"
          onChange={onChangeDogData}
          placeholder="e.g. Golden Retriever"
        />
      </div>

      <div className="formInput">
        <label htmlFor="age">{dog.name}'s Age:</label>
        <span>{dog.age}</span>
        <input
          type="range"
          onChange={onChangeDogData}
          value={dog.age}
          name="age"
          min="0"
          max="30"
          step="0.1"
        />
      </div>

      <div className="formInput">
        <label htmlFor="size">Size</label>
        <select onChange={onChangeDogData} name="size" id="size">
          <option disabled={true} value="">
            Select
          </option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <img className="sign-dog-img" src={Dogs} alt="" />

      <button className="submit-btn" onClick={submitDog}>
        Submit
      </button>
    </div>
  );
}

export default DogDescription;
