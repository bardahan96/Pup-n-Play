import { useContext } from "react"

import "./AuthStyle/AuthStyle.css";
import { DogContext } from "../app/context/DogContext";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../app/context/UserContext";


export default function SignDog() {


    const Navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { onChangeDogData , dog, dogs, addDogForUser } = useContext(DogContext);

   async function submitDog () {
      await addDogForUser()
      Navigate(`/:${user.username}/home`)
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
            <input type="file" />
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
