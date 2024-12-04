import React from "react";
import "./Enroll.css";
import img from "../../../assets/Background.jpg";

function Enroll() {
  return (
    <div className="enroll">
      <div className="enroll-container">
        <p className="enroll-desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          maxime dolorum veniam corporis, impedit illum. Minima reiciendis,
          fugit iure ipsum architecto ullam sapiente praesentium? Consectetur
          ipsam magni pariatur dignissimos nihil tempora iure perferendis
          asperiores ad voluptates, nulla distinctio quisquam possimus suscipit,
          omnis eos enim, rem dicta. Harum exercitationem, dolore at veritatis
          consequatur voluptatum quidem deserunt officiis inventore qui corrupti
          beatae laborum iusto unde excepturi nihil nisi dolorem quas saepe
          reiciendis. Eaque illum et corporis vel, rem fugiat cum dolore sed, ab
          cumque maxime fuga iusto exercitationem? Ipsam aperiam ex, voluptate,
          explicabo provident impedit quibusdam quam corporis illum reiciendis
          error tenetur dolorum, possimus molestiae aliquam ducimus! Quos quam
          temporibus a est. Expedita, at temporibus.
        </p>

        <img src={img} alt="enrollment image" className="enroll-img" />
      </div>
      <button className="enroll-btn">Enroll</button>
    </div>
  );
}

export default Enroll;
