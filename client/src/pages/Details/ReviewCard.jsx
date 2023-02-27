import React from "react";
// import profilePng from "../../images/Profile.png";
import { Rating } from "@mui/material";
// import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
  // const { user } = useSelector((state) => state.user);
  // console.log(user);
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img
        src="https://images.freeimages.com/365/images/istock/previews/1009/100996291-male-avatar-profile-picture-vector.jpg"
        alt="User"
      />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
