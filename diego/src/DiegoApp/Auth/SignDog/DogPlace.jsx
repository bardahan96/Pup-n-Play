import React from "react";
import { useContext, useEffect } from "react";

import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../../app/context/UserContext";
import { uploadFilesToCloudinary } from "../../app/context/UploadToCloudinary";
import DogWithAMap from "../AuthStyle/DogWithAMap2.png";

function DogPlace() {
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
    <div>
      <div className="formInput">
        <label htmlFor="location">Where is {dog.name} from? </label>
        <input
          type="text"
          id="location"
          value={dog.location}
          name="location"
          onChange={onChangeDogData}
        />
        <img src={DogWithAMap} alt="" />
        <button className="next-btn"> Next</button>
      </div>
    </div>
  );
}

export default DogPlace;
