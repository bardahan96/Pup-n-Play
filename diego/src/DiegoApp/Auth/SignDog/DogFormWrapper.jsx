import React, { useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { UserContext } from "../../app/context/UserContext";
import { DogContext } from "../../app/context/DogContext";
import { uploadFilesToCloudinary } from "../../app/context/UploadToCloudinary";

export default function DogFormWrapper() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { signUpDB, authReady } = useContext(UserContext);
  const { dog, setDog, addDogForUser, getAllDogs, validateField, validateAllFields } = useContext(DogContext);

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

  function goToDogName() {
    navigate(`/${encodeURIComponent(username)}/createDogName`);
  }

  function goToDogPicture() {
    // Validate name before proceeding
    if (validateField('name', dog.name)) {
      navigate(`/${encodeURIComponent(username)}/createDogPicture`);
    }
  }

  function goToDogPlace() {
    // Validate images before proceeding
    if (validateField('imgs', null, dog.imgs)) {
      navigate(`/${encodeURIComponent(username)}/createDogPlace`);
    }
  }

  function goToDogDescription() {
    // Validate location before proceeding
    if (validateField('location', dog.location)) {
      navigate(`/${encodeURIComponent(username)}/createDogDescription`);
    }
  }

  return (
    <>
        <div className="signUpContainer">
            <Outlet context={{ submitDog, goToDogName, goToDogPicture, goToDogPlace, goToDogDescription }} />
        </div>
    </>
  );
}
