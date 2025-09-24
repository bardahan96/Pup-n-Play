import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { ErrorHandleContext } from "../../app/context/ErrorHandleContext";
import Dogs from "../AuthStyle/Dogs2.png";

function DogDescription() {
  const { onChangeDogData, dog } = useContext(DogContext);
  const { getFieldError, validateDogDescription } = useContext(ErrorHandleContext);
  const { submitDog } = useOutletContext();

  function handleSubmit() {
    if (validateDogDescription({ 
      description: dog.description, 
      bread: dog.bread, 
      size: dog.size 
    })) {
      submitDog();
    }
  }
  return (
    <div className="dog-description">
      <div className="formInput">
        <label htmlFor="description" className="typing-label">How Would You Describe {dog.name}?</label>
        {getFieldError('dogDescription', 'description') && (
          <div className="field-error" role="alert">
            {getFieldError('dogDescription', 'description')}
          </div>
        )}
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
        <label htmlFor="preferences" className="typing-label">{dog ? dog.name : "Your dog"}'s Breed:</label>
        {getFieldError('dogDescription', 'bread') && (
          <div className="field-error" role="alert">
            {getFieldError('dogDescription', 'bread')}
          </div>
        )}
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
        <label htmlFor="age" className="typing-label">{dog ? dog.name : "Your dog"}'s Age:</label>
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
        <label htmlFor="size" className="typing-label">Size</label>
        {getFieldError('dogDescription', 'size') && (
          <div className="field-error" role="alert">
            {getFieldError('dogDescription', 'size')}
          </div>
        )}
        <select onChange={onChangeDogData} name="size" id="size" value={dog.size || 'small'}>
          <option disabled={true} value="">
            Select
          </option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <img className="sign-dog-img" src={Dogs} alt="" />

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default DogDescription;
