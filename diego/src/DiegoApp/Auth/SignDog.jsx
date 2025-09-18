import { useContext, useEffect } from "react"

import "./AuthStyle/AuthStyle.css";
import { DogContext } from "../app/context/DogContext";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../app/context/UserContext";
import { uploadFilesToCloudinary } from "../app/context/UploadToCloudinary";


export default function SignDog() {


    const navigate = useNavigate()
    const { user, signUpDB } = useContext(UserContext)
    const { onChangeDogData , dog,setSignedIn, addDogForUser ,getAllDogs, setDog} = useContext(DogContext);

    async function submitDog() {
      const newUser = await signUpDB();
      const urls = await uploadFilesToCloudinary(dog.imgs);
    
      const updatedDog = { ...dog, imgs: urls };
      setDog(updatedDog);
      await addDogForUser(newUser.id, updatedDog); // pass it directly
    
      setSignedIn(true);
      await getAllDogs?.();
      const username = newUser?.username || "user";
      navigate(`/${username}/home`);
    }

    return (
        <>
        <div className="signUpContainer">
        <div className="signUpForm">
            <div className="formInput">
            <label htmlFor="dogName">dog name:</label>
            <input type="text" id="dogName" name="name" value={dog.name} onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="description">description :</label>
            <input type="text" id="description" value={dog.description} name="description" onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="preferences">bread :</label>
            <input type="text" id="preferences" value={dog.bread} name="bread" onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="age">Age</label>
            <input type="range" onChange={onChangeDogData} value={dog.age} name="age" min="0" max="30" step="0.1" />
            <span>{dog.age}</span>
          </div>

          <div className="formInput">
            <label htmlFor="size">Size</label>
            <select onChange={onChangeDogData} name="size" id="size">
              <option disabled={true} value="">Select</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </div>

          <div className="formInput">
            <label htmlFor="uploadImgs">Upload img</label>
            <input type="file" name="imgs" multiple accept="=image/*" id="uploadImgs" onChange={onChangeDogData} />
          </div>

          <div className="formInput">
            <label htmlFor="location">Location :</label>
            <input type="text" id="location" value={dog.location} name="location" onChange={onChangeDogData} />
          </div>

          <button onClick={submitDog}>Submit</button>

        </div>
        </div>

        </>
    )
    
};
