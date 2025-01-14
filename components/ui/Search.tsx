import { useForm, SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import searchIcon from "./assets/icons/search.svg";

interface FormValues {
  search: string;
}

const Search = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<FormValues>();

  // const navigate = useNavigate();

  // const onSubmit: SubmitHandler<FormValues> = (data) => {
  //   if (isValid) {
  //     navigate(`/store/all/${data.search}`);
  //   } else {
  //     const errorMessage = errors.search?.message || "Invalid input";
  //     alert(errorMessage);
  //     console.log(errorMessage);
  //   }
  // };
  //
  return (
    <>
      <form>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-lg pl-10 bg-gray-200 w-full"
          />
          <div className="absolute inset-y-0 left-2 pl-2 flex items-center pointer-events-none">
            <img src={searchIcon} alt="Search" className="w-4 h-4" />
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;
