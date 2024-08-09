import React from "react";
import Coffe from "../../Images/Coffe.jpg";
// import "../../CSS/AboutUs/OurStory.css";
const OurStory = () => {
  return (
    <div className="flex flex-row  w-full h-screen  items-center">
      <div className="">{/* <img src={Coffe} alt="about us " /> */}</div>
      <div className="w-1/2 flex flex-col items-center h-full justify-around">
        <h1>Our Story</h1>
        <p>
          As a well-known Online Store, we offer a variety of high-quality and
          affordable items accompanied by thoughtful and efficient service.
          Since day one, we’ve been working tirelessly to expand our offerings
          and supply our customers with the latest products. Our passion for
          excellence has driven us from the beginning and continues to inspire
          us going forward. The team at Dari knows that every product counts,
          and strives to make the entire shopping experience as easy and
          rewarding as possible. Check out our store and special offers, and get
          in touch with questions or requests. We are happy to help!
        </p>

        <span>Learn more</span>
      </div>
    </div>
  );
};

export default OurStory;
