import React from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col  w-full">
      <div className="flex flex-col px-12 py-4 marginfrombody w-1/4 ">
        {/* NOTE: this for the product Categorie  */}

        <div className=" flex flex-col my-6">
          <h1 className="text-lg font-semibold">Product Categorie </h1>
          <hr />
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
        </div>

        {/* NOTE: this  should be for the product price   */}
        <div className=" flex flex-col my-6">
          <h1 className="text-lg font-semibold">Product Categorie </h1>
          <hr />
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
