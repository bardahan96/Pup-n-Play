import React from "react";
import { useContext, useEffect } from "react";

import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../../app/context/UserContext";
import { uploadFilesToCloudinary } from "../../app/context/UploadToCloudinary";
import AskingDogName from "../AuthStyle/AskingDogName2.png";

function DogName() {
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
    <>
      <div className="formInput">
        <label htmlFor="dogName">
          Diego is asking what is your dog's name?
        </label>
        <input
          type="text"
          id="dogName"
          name="name"
          value={dog.name}
          onChange={onChangeDogData}
        />
        <img className="asking-dog-name" src={AskingDogName} alt="" />
        <button className="next-btn"> Next</button>
      </div>
    </>
  );
}

export default DogName;
