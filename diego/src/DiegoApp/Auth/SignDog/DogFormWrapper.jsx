import React, { useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { UserContext } from "../../app/context/UserContext";
import { DogContext } from "../../app/context/DogContext";
import { ErrorHandlingContext } from "../../app/context/ErrorHandlingContext";
import { uploadFilesToCloudinary } from "../../app/context/UploadToCloudinary";

export default function DogFormWrapper() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { signUpDB, authReady } = useContext(UserContext);
  const { dog, setDog, addDogForUser, getAllDogs } = useContext(DogContext);
  const { validateDogName, validateDogPhotos, validateDogLocation, validateDogDescription } = useContext(ErrorHandlingContext);

  async function submitDog() {
    // Validate all fields before submitting
    if (validateDogDescription({ 
      description: dog.description, 
      bread: dog.bread, 
      size: dog.size 
    })) {
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
  }

  function goToDogName() {
    navigate(`/${encodeURIComponent(username)}/createDogName`);
  }

  function goToDogPicture() {
    // Validate name before proceeding
    if (validateDogName({ name: dog.name })) {
      navigate(`/${encodeURIComponent(username)}/createDogPicture`);
    }
  }

  function goToDogPlace() {
    // Validate images before proceeding
    if (validateDogPhotos({ imgs: dog.imgs })) {
      navigate(`/${encodeURIComponent(username)}/createDogPlace`);
    }
  }

  function goToDogDescription() {
    // Validate location before proceeding
    if (validateDogLocation({ location: dog.location })) {
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
