import React from "react";
import { useContext, useEffect } from "react";

import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../../app/context/UserContext";
import { uploadFilesToCloudinary } from "../../app/context/UploadToCloudinary";
import Dogs from "../AuthStyle/Dogs2.png";
function DogDescription() {
  const navigate = useNavigate();
  const { user, signUpDB, authReady } = useContext(UserContext);
  const { onChangeDogData, dog, addDogForUser, dogs, getAllDogs, setDog } =
    useContext(DogContext);

  async function submitDog() {
    const newUser = await signUpDB();
    const urls = await uploadFilesToCloudinary(dog.imgs);

    const updatedDog = { ...dog, imgs: urls };
    setDog(updatedDog);
    await addDogForUser(newUser.id, updatedDog);

    if (authReady && newUser?.username) {
      await getAllDogs();
      navigate(`/${encodeURIComponent(newUser.username)}/home`, {
        replace: true,
      });
    }
  }
  return (
    <div className="dog-description">
      <div className="formInput">
        <label htmlFor="description">How would you describe {dog.name}?</label>
        <input
          type="text"
          id="description"
          value={dog.description}
          name="description"
          onChange={onChangeDogData}
          placeholder="Here you can tell what their hobbies are, their energy level, what they are looking for."
        />
      </div>

      <div className="formInput">
        <label htmlFor="preferences">{dog.name}'s Bread:</label>
        <input
          type="text"
          id="preferences"
          value={dog.bread}
          name="bread"
          onChange={onChangeDogData}
        />
      </div>

      <div className="formInput">
        <label htmlFor="age"> {dog.name}'s Age:</label>
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
      <img src={Dogs} alt="" />

      <button className="submit-btn" onClick={submitDog}>
        Submit
      </button>
    </div>
  );
}

export default DogDescription;
