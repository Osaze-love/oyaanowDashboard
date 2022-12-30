import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector } from "react-redux";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StaffRouteModal from "./StaffRouteModal";

export default function RouteTable({
  reservation,
  setReservation,
  setReservationModal,
}) {
  const { user } = useSelector((state) => state.user);
  const [routeId, setRouteId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [staffRouteModal, setStaffRouteModal] = useState(false);

  return (
    <div>
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Routes
        </button>
      </div>
      <Paper className="w-4/4 lg:w-4/4 my-10 mx-auto">
        {user?.company?.routes?.length > 1 ? (
          <h2 className="font-bold text-center">
            {user?.company?.name} Routes
          </h2>
        ) : (
          <h2 className="font-bold text-center">{user?.company?.name} Route</h2>
        )}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-black text-white text-center">
                  State To
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  State From
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Terminal To
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Terminal From
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Departure Time
                </TableCell>
                <TableCell className="bg-black text-white text-center ">
                  Departure Date
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Recurring
                </TableCell>

                <TableCell className="bg-black text-white text-center">
                  Bus
                </TableCell>

                <TableCell className="bg-black text-white text-center">
                  Available Seats
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Reservations
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Added By
                </TableCell>
                <TableCell className="bg-black  text-center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user?.company?.routes?.map((row) => (
                <TableRow key={row?._id} hover>
                  <TableCell className="text-center">
                    {row?.state?.to}
                  </TableCell>
                  <TableCell>{row?.state?.from}</TableCell>
                  <TableCell className="text-center">
                    {row?.terminal?.to?.location}
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.terminal?.from?.location}
                  </TableCell>

                  <TableCell className="text-center">
                    {row?.departureTimes?.join()}
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.departureDate?.substring(0, 10)}
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.recurring}
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.buses?.map((bus) => (
                      <div key={bus._id} className="space-x-2">
                        {" "}
                        {bus?.name}{" "}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.buses?.map((bus) => (
                      <div key={bus._id} className="space-x-2">
                        {" "}
                        {bus?.fare}{" "}
                      </div>
                    ))}
                  </TableCell>

                  <TableCell className="text-center">
                    {row?.buses?.map((bus) => (
                      <div key={bus._id} className="space-x-2">
                        {" "}
                        {bus?.availableSeats}{" "}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.buses?.map((bus, index) => (
                      <button
                        key={bus._id}
                        onClick={() => {
                          setReservation(bus?.reservations);
                          setReservationModal(true);
                        }}
                        className="border transition hover:scale-105 active:scale-90"
                      >
                        Click to View
                      </button>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    {row?.addedBy?.name}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setRouteId(row?._id);
                      setCompanyId(user?.company?._id);
                      setStaffRouteModal(true);
                    }}
                  >
                    <DeleteIcon className="cursor-pointer hover:scale-105 transition" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {staffRouteModal && (
        <StaffRouteModal
          routeId={routeId}
          setRouteId={setRouteId}
          companyId={companyId}
          setCompanyId={setCompanyId}
          setStaffRouteModal={setStaffRouteModal}
        />
      )}
    </div>
  );
}
