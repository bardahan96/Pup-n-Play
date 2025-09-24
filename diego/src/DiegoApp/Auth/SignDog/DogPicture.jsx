import React from "react";
import { useContext, useEffect } from "react";

import "../AuthStyle/AuthStyle.css";
import { DogContext } from "../../app/context/DogContext";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../../app/context/UserContext";
import { uploadFilesToCloudinary } from "../../app/context/UploadToCloudinary";
import DogTakingAPic from "../AuthStyle/DogTakingAPic2.png";

function DogPicture() {
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
    <div className="formInput">
      <label htmlFor="uploadImgs">
        Please upload {dog.name}'s best picture
      </label>
      <input
        type="file"
        name="imgs"
        multiple
        accept="image/*"
        id="uploadImgs"
        onChange={onChangeDogData}
      />
      <img src={DogTakingAPic} alt="" />
      <button className="next-btn"> Next</button>
    </div>
  );
}

export default DogPicture;
