import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeRoute } from "../features/companySlice";

const AdminRouteModal = ({
  setAdminRouteModal,
  companyId,
  routeId,
  setCompanyId,
  setRouteId,
}) => {
  const dispatch = useDispatch();
  const removeTheRoute = () => {
    console.log(companyId);
    dispatch(removeRoute({ routeId: routeId, companyId: companyId }));
    setCompanyId("");
    setRouteId("");
    setAdminRouteModal(false);
  };
  return (
    <div className="h-screen z-30 w-screen top-0 left-0 bg-black opacity-95 fixed flex justify-center items-center">
      <div className="w-[700px] h-[400px] z-50 bg-white text-black shadow-2xl flex flex-col rounded-md">
        <div className="flex justify-end mr-4 mt-4 cursor-pointer">
          <AiOutlineClose
            onClick={() => {
              setCompanyId("");
              setRouteId("");
              setAdminRouteModal(false);
            }}
            className="text-2xl active:scale-90 font-bold transition hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center items-center h-full space-y-14">
          <h2 className="font-bold text-lg text-center">
            Are you sure you want to delete this route?
          </h2>
          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={removeTheRoute}
              className="text-md px-10 py-1 transition focus:outline-none hover:scale-105 active:scale-90 text-white bg-black"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setCompanyId("");
                setRouteId("");
                setAdminRouteModal(false);
              }}
              className="text-md  px-10 py-1 transition focus:outline-none hover:scale-105 active:scale-90 "
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRouteModal;
