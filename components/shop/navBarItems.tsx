import React from "react";

import BorderInnerIcon from "@mui/icons-material/BorderInner";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ArrowDropDown } from "@mui/icons-material";
const NavBarItems = () => {
  return (
    <div className="flex flex-row justify-between w-full my-6 marginfrombody">
      <div
        className="w-full flex flex-row
     "
      >
        <div className="flex flex-row px-2 border text-gray-700">
          <p>Default Sorting </p>
          <ArrowDropDownIcon />
        </div>

        <div className="mx-2">
          <BorderInnerIcon />
        </div>
      </div>
      <div className="flex flex-row">
        <p>Showing </p>
        <div className="flex flex-row px-2 border text-gray-700">
          <p>12</p>
          <ArrowDropDownIcon />
        </div>
      </div>
    </div>
  );
};

export default NavBarItems;
