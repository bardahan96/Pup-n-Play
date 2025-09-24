import { useContext, useState } from "react"
import '../HomePageStyle/HomePageStyle.css'
import { DogContext } from "../../app/context/DogContext"
import DogImgModal from "./DogImgModal";

export default function DescrptionList() {
  const { myDogData } = useContext(DogContext)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImages = () => {
    setIsModalOpen(true);
  };

  const closeImages = () => {
    setIsModalOpen(false);
  };

  const handleContainerClick = (e) => {
    // Only close if clicking on the container itself, not on child elements
    if (e.target === e.currentTarget) {
      closeImages();
    }
  };

  return (
    <>
      <div onClick={handleContainerClick}>
        <div className="dogForRender_img_container">
          <img 
            className="dogForRender_img" 
            src={myDogData.imgs?.[0] || ''} 
            alt={myDogData.name} 
            width="180" 
            onClick={openImages} 
            style={{ cursor: "pointer" }} 
          />
        </div>
        <div className="dog_info">
          <h2>{myDogData.name || 'No name'}</h2>
          <div className="info_bubble">
            <span className="info_label">Breed:</span>
            <span className="info_value">{myDogData.bread || 'Not specified'}</span>
          </div>
          <div className="info_bubble">
            <span className="info_label">Age:</span>
            <span className="info_value">{myDogData.age || 'Not specified'}</span>
          </div>
          <div className="info_bubble">
            <span className="info_label">Size:</span>
            <span className="info_value">{myDogData.size || 'Not specified'}</span>
          </div>
          <div className="info_bubble">
            <span className="info_label">Location:</span>
            <span className="info_value">{myDogData.location || 'Not specified'}</span>
          </div>
          <div className="description">
            {myDogData.description || 'No description available'}
          </div>
        </div>
      </div>
      <DogImgModal 
        isOpen={isModalOpen} 
        images={myDogData?.imgs || []} 
        onClose={closeImages} 
      />
    </>
  )
};
