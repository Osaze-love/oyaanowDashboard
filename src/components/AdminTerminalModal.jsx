import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeTerminal } from "../features/companySlice";

const AdminTerminalModal = ({
  setAdminTerminalModal,
  companyId,
  terminalId,
  setCompanyId,
  setTerminalId,
}) => {
  const dispatch = useDispatch();
  const removeTheTerminal = () => {
    console.log(companyId);
    dispatch(removeTerminal({ terminalId: terminalId, companyId: companyId }));
    setCompanyId("");
    setTerminalId("");
    setAdminTerminalModal(false);
  };
  return (
    <div className="h-screen z-30 w-screen top-0 left-0 bg-black opacity-95 fixed flex justify-center items-center">
      <div className="w-[700px] h-[400px] z-50 bg-white text-black shadow-2xl flex flex-col rounded-md">
        <div className="flex justify-end mr-4 mt-4 cursor-pointer">
          <AiOutlineClose
            onClick={() => {
              setCompanyId("");
              setTerminalId("");
              setAdminTerminalModal(false);
            }}
            className="text-2xl active:scale-90 font-bold transition hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center items-center h-full space-y-14">
          <h2 className="font-bold text-lg text-center">
            Are you sure you want to delete this terminal?
          </h2>
          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={removeTheTerminal}
              className="text-md px-10 py-1 transition focus:outline-none hover:scale-105 active:scale-90 text-white bg-black"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setCompanyId("");
                setTerminalId("");
                setAdminTerminalModal(false);
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

export default AdminTerminalModal;
