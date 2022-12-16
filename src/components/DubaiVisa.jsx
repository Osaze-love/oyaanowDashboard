import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useSelector, useDispatch } from "react-redux";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getDubaiVisa } from "../features/bookings/bookingsSlice";
import DubaiVisaModal from "./DubaiVisaModal";

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [todayValue, setTodayValue] = useState("");

  const [dubaiImage, setDubaiImage] = useState([]);
  const [dubaiText, setDubaiText] = useState("text");
  const [dubaiModal, setDubaiModal] = useState(false);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  dd = dd - 1;
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    dispatch(getDubaiVisa());
  }, [dispatch]);

  const { dubaivisa } = useSelector((state) => state.bookings);
  return (
    <div className="max-w-7xl">
      <div className="w-full flex  items-center justify-between px-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="my-4 border py px-4 focus:outline-none"
          type="text"
          placeholder="Search Bookings"
        />

        <select
          onChange={(e) => {
            setTodayValue(e.target.value);
          }}
          className="focus:outline-none w-2/6 border px-2"
        >
          <option value="">Default</option>
          <option value={today}>Yesterday</option>
        </select>
      </div>
      <Paper className="w-full lg:w-4/4 mx-auto">
        <h3 className="text-lg font-bold mx-auto">Dubai Visa Bookings</h3>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="text-center bg-black text-white">
                  FirstName
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Last Name
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Middle Name
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Ticket Id
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Visa Type
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Nationality
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Gender
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  DOB
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Marital Status
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Address
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  City
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  State
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Occupation
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Employer Name
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Employer Phone
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Employer Email
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Company Email
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Company Name
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Company Phone
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Email
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Phone Number
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Departure Date
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  CreatedAt
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Passport Photo
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Passport Number
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Passport Expiring Date
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Passport Data Page
                </TableCell>

                <TableCell className="text-center bg-black text-white">
                  Arrival Date
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Number of Travellers
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  UAE Contact
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Booking Id
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Recent Destination
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Companion's Data Pages
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Companion's Passport Photos
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Companion's Birth Certificate
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Companion's Marriage Cert
                </TableCell>
                <TableCell className="text-center bg-black text-white">
                  Companion's Affidavit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dubaivisa
                .filter((customer) => {
                  return search.toLowerCase() === ""
                    ? customer
                    : customer.ticketId?.includes(search);
                })
                .filter((customer) => {
                  const bookingDate = customer.createdAt;
                  var todays = new Date(bookingDate);
                  var dd = String(todays.getDate()).padStart(2, "0");
                  var mm = String(todays.getMonth() + 1).padStart(2, "0");
                  var yyyy = todays.getFullYear();

                  todays = yyyy + "-" + mm + "-" + dd;

                  if (todayValue === "") {
                    return customer;
                  } else if (todayValue === todays) {
                    return customer;
                  }
                })
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="text-center font-bold">
                      {row?.firstname}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.lastname}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.middlename}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.ticketId}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.visaType}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.nationality}
                    </TableCell>
                    <TableCell className="text-center">{row?.gender}</TableCell>
                    <TableCell className="text-center">{row?.DOB}</TableCell>
                    <TableCell className="text-center">
                      {row?.maritalStatus}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.address}
                    </TableCell>
                    <TableCell className="text-center">{row?.city}</TableCell>
                    <TableCell className="text-center">{row?.state}</TableCell>
                    <TableCell className="text-center">
                      {row?.employmentInfo?.occupation}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.employmentInfo?.employerName}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.employmentInfo?.employerPhone}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.employmentInfo?.employerEmail}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.employmentInfo?.companyEmail}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.employmentInfo?.companyName}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.employmentInfo?.companyPhone}
                    </TableCell>
                    <TableCell className="text-center">{row?.email}</TableCell>
                    <TableCell className="text-center">
                      {row?.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.travellingInfo?.departureDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell className="text-center ">
                      <a
                        className="border px-2 transition hover:scale-105 active:scale-90"
                        href={row?.passportDetails?.photo}
                        download={`${row.firstname}passport photo`}
                      >
                        Download
                      </a>
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.passportDetails?.number}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.passportDetails?.expDate}
                    </TableCell>
                    <TableCell className="text-center">
                      <a
                        className="border px-2 transition hover:scale-105 active:scale-90"
                        href={row?.passportDetails?.dataPage}
                        download={`${row.firstname}datapage`}
                      >
                        Download
                      </a>
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.travellingInfo?.arrivalDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.travellingInfo?.travellersNo}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.travellingInfo?.uaeContact}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.travellingInfo?.bookingId}
                    </TableCell>
                    <TableCell className="text-center">
                      {row?.travellingInfo?.recentDestination}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => {
                          setDubaiImage(
                            row?.travellingCompanionInfo?.dataPages
                          );

                          setDubaiModal(true);
                          setDubaiText("Data Pages");
                        }}
                        className="border transition px-2 hover:scale-105 active:scale-90"
                      >
                        Click to View
                      </button>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => {
                          setDubaiImage(
                            row?.travellingCompanionInfo?.passportPhotos
                          );

                          setDubaiModal(true);
                          setDubaiText("Passport Photos");
                        }}
                        className="border transition px-2 hover:scale-105 active:scale-90"
                      >
                        Click to View
                      </button>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => {
                          setDubaiImage(
                            row?.travellingCompanionInfo?.birthCertificate
                          );

                          setDubaiModal(true);
                          setDubaiText("Birth Certificates");
                        }}
                        className="border transition px-2 hover:scale-105 active:scale-90"
                      >
                        Click to View
                      </button>
                    </TableCell>
                    <TableCell className="text-center transition hover:scale-105 active:scale-90 cursor-pointer">
                      <a
                        className="border px-2 transition hover:scale-105 active:scale-90"
                        href={row?.travellingCompanionInfo?.marriageCertificate}
                        download={`${row.firstname} travelCompanionmarriageCert`}
                      >
                        Download
                      </a>
                    </TableCell>
                    <TableCell className="text-center transition hover:scale-105 active:scale-90 cursor-pointer">
                      <a
                        className="border px-2 transition hover:scale-105 active:scale-90"
                        href={row?.travellingCompanionInfo?.affidavit}
                        download={`${row.firstname} travellingCompanionAffidavit`}
                      >
                        Download
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {dubaiModal && (
        <DubaiVisaModal
          dubaiModal={dubaiModal}
          dubaiImage={dubaiImage}
          setDubaiImage={setDubaiImage}
          setDubaiModal={setDubaiModal}
          dubaiText={dubaiText}
          setDubaiText={setDubaiText}
        />
      )}
    </div>
  );
}
