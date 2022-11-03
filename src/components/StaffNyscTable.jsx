import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import StaffNyscModal from "./StaffNyscModal";

export default function RouteTable() {
  const { user } = useSelector((state) => state.user);
  const [nyscRouteId, setNyscRouteId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [staffNyscModal, setStaffNyscModal] = useState(false);

  const dispatch = useDispatch();

  return (
    <div>
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Nysc Routes
        </button>
      </div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {user.company.nyscRoutes.length > 1 ? (
          <h2 className="font-bold text-center">
            {user.company.name} Nysc Routes
          </h2>
        ) : (
          <h2 className="font-bold text-center">
            {user.company.name} Nysc Route
          </h2>
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
                  Fare
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Booked Seats
                </TableCell>
                <TableCell className="bg-black text-white text-center">
                  Available Seats
                </TableCell>
                <TableCell className="bg-black  text-center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.company.nyscRoutes.map((row) => (
                <TableRow>
                  <TableCell className="text-center">{row.state.to}</TableCell>
                  <TableCell>{row.state.from}</TableCell>
                  <TableCell className="text-center">
                    {row.terminal.to.landmark}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.terminal.from.landmark}
                  </TableCell>

                  <TableCell className="text-center">
                    {row.departureTimes}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.departureDate}
                  </TableCell>
                  <TableCell className="text-center">{row.recurring}</TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].name}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].fare}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].bookedSeats}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.buses[0].availableSeats}
                  </TableCell>

                  <TableCell
                    onClick={() => {
                      setNyscRouteId(row._id);
                      setCompanyId(user.company._id);
                      setStaffNyscModal(true);
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
      {staffNyscModal && (
        <StaffNyscModal
          nyscRouteId={nyscRouteId}
          setNyscRouteId={setNyscRouteId}
          companyId={companyId}
          setCompanyId={setCompanyId}
          setStaffNyscModal={setStaffNyscModal}
        />
      )}
    </div>
  );
}
