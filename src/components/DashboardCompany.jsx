import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBus,
  addTerminal,
  addRoute,
  addNyscRoute,
} from "../features/userSlice";
import StaffBusTable from "./StaffBusTable";
import StaffTerminalTable from "./StaffTerminalTable";
import StaffRouteTable from "./StaffRouteTable";
import StaffNyscTable from "./StaffNyscTable";
import StaffReservationModal from "./StaffReservationModal";
import { states } from "../hooks/StateNames";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [image, setImage] = useState("");
  const [reservation, setReservation] = useState([]);
  const [reservationModal, setReservationModal] = useState(false);
  const [routeTime, setRouteTime] = useState([""]);
  const [routeBus, setRouteBus] = useState([{ id: "", fare: "" }]);
  const [nyscRouteTime, setNyscRouteTime] = useState([""]);
  const [nyscRouteBus, setNyscRouteBus] = useState([{ id: "", fare: "" }]);

  const routeDepartureTime = (e, index) => {
    const timeString12hr = new Date(
      "1970-01-01T" + e.target.value + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    let data = [...routeTime];
    data[index] = timeString12hr;
    setRouteTime(data);
  };
  const nyscRouteDepartureTime = (e, index) => {
    const timeString12hr = new Date(
      "1970-01-01T" + e.target.value + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    let data = [...nyscRouteTime];
    data[index] = timeString12hr;
    setNyscRouteTime(data);
  };
  const removeRouteDepartureTime = (index) => {
    let data = [...routeTime];
    data.splice(index, 1);
    setRouteTime(data);
  };
  const removeNyscRouteDepartureTime = (index) => {
    let data = [...nyscRouteTime];
    data.splice(index, 1);
    setNyscRouteTime(data);
  };

  useEffect(() => {
    setRouteData({
      ...routeData,
      departureTimes: routeTime,
    });
  }, [routeTime]);

  useEffect(() => {
    setNyscRouteData({
      ...nyscRouteData,
      departureTimes: nyscRouteTime,
    });
  }, [nyscRouteTime]);

  const handleAddBus = (e, index) => {
    let data = [...routeBus];
    data[index] = { ...data[index], id: e.target.value };
    setRouteBus(data);
  };
  const handleAddFare = (e, index) => {
    let data = [...routeBus];
    data[index] = { ...data[index], fare: e.target.value };
    setRouteBus(data);
  };

  const handleRemoveBus = (index) => {
    let data = [...routeBus];
    data.splice(index, 1);
    setRouteBus(data);
  };

  useEffect(() => {
    setRouteData({
      ...routeData,
      buses: routeBus,
    });
  }, [routeBus]);

  const handleAddNyscBus = (e, index) => {
    let data = [...nyscRouteBus];
    data[index] = { ...data[index], id: e.target.value };
    setNyscRouteBus(data);
  };
  const handleAddNyscFare = (e, index) => {
    let data = [...nyscRouteBus];
    data[index] = { ...data[index], fare: e.target.value };
    setNyscRouteBus(data);
  };

  const handleRemoveNyscBus = (index) => {
    let data = [...nyscRouteBus];
    data.splice(index, 1);
    setNyscRouteBus(data);
  };

  useEffect(() => {
    setNyscRouteData({
      ...nyscRouteData,
      buses: nyscRouteBus,
    });
  }, [nyscRouteBus]);

  const [routeData, setRouteData] = useState({
    company: user.company._id,
    state: {
      from: "",
      to: "",
    },
    terminal: {
      from: "",
      to: "",
    },
    buses: [
      {
        id: "",
        fare: "",
      },
    ],
    departureTimes: [],
    departureDate: "",
    recurring: "",
  });

  const addTheRoute = (e) => {
    e.preventDefault();
    dispatch(addRoute(routeData));

    setRouteData({
      ...routeData,
      state: {
        from: "",
        to: "",
      },
      terminal: {
        from: "",
        to: "",
      },
      departureDate: "",
      recurring: "",
    });
    setRouteBus([{ id: "", fare: "" }]);
    setRouteTime([routeTime[0]]);
  };

  const [nyscRouteData, setNyscRouteData] = useState({
    company: user.company._id,
    state: {
      from: "",
      to: "",
    },
    terminal: {
      from: "",
      to: "",
    },
    buses: [
      {
        id: "",
        fare: "",
      },
    ],
    departureTimes: [],
    departureDate: "",
    recurring: "",
  });

  const addTheNyscRoute = (e) => {
    e.preventDefault();
    dispatch(addNyscRoute(nyscRouteData));
    setNyscRouteData({
      ...nyscRouteData,
      state: {
        from: "",
        to: "",
      },
      terminal: {
        from: "",
        to: "",
      },
      departureDate: "",
      recurring: "",
    });
    setNyscRouteBus([{ id: "", fare: "" }]);
    setNyscRouteTime([nyscRouteTime[0]]);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusData({ ...busData, picture: reader.result });
      };

      reader.readAsDataURL(image);
    } else {
      setBusData({ ...busData, picture: "" });
    }
  }, [image]);

  const [busData, setBusData] = useState({
    company: user.company._id,
    seats: 14,
    picture: "",
    name: "",
    plateNumber: "",
  });

  const [terminalData, setTerminalData] = useState({
    company: user.company._id,
    location: "",
    address: "",
    landmark: " ",
  });

  const addTheBus = (e) => {
    e.preventDefault();
    console.log(busData);
    dispatch(addBus(busData));
    setBusData({
      company: user.company._id,
      seats: 14,
      picture: "",
      name: "",
      plateNumber: "",
    });
  };

  const addTheTerminal = (e) => {
    e.preventDefault();
    dispatch(addTerminal(terminalData));

    setTerminalData({
      company: user.company._id,
      location: "",
      address: "",
      landmark: " ",
    });
  };
  return (
    <div>
      {user.company.buses.length > 0 && <StaffBusTable />}
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Bus
        </button>
        <form
          onSubmit={addTheBus}
          className="shadow-2xl relative text-black w-4/4  lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          {/* <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="seats">Seats</label>
            <input
              value={busData.seats}
              onChange={(e) => {
                setBusData({ ...busData, seats: e.target.value });
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="text"
              name="seats"
            />
          </div> */}
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="picture">Picture</label>
            <input
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="file"
              accept="image/*"
              name="picture"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="name">Name</label>
            <input
              value={busData.name}
              onChange={(e) => {
                setBusData({ ...busData, name: e.target.value });
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="text"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="plateNumber">Plate Number</label>
            <input
              value={busData.plateNumber}
              onChange={(e) => {
                setBusData({ ...busData, plateNumber: e.target.value });
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="text"
              name="plateNumber"
            />
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-black active:scale-90 text-white px-4 py-2 font-bold rounded-sm transition hover:scale-105"
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
      {user.company.terminals.length > 0 && <StaffTerminalTable />}
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Terminal
        </button>
        <form
          onSubmit={addTheTerminal}
          className="shadow-2xl relative text-black w-3/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="location">City</label>
            <input
              value={terminalData.location}
              onChange={(e) => {
                setTerminalData({
                  ...terminalData,
                  location: e.target.value,
                });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="text"
              name="location"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="address">Address</label>
            <input
              value={terminalData.address}
              onChange={(e) => {
                setTerminalData({
                  ...terminalData,
                  address: e.target.value,
                });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="text"
              name="address"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="landmark">Landmark</label>
            <input
              value={terminalData.landmark}
              onChange={(e) => {
                setTerminalData({ ...terminalData, landmark: e.target.value });
              }}
              className="text-black border px-2 py-1 outline-none rounded-sm shadow-sm"
              type="text"
              name="landmark"
            />
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-black active:scale-90 text-white px-4 py-2 font-bold flex justify-center rounded-sm transition hover:scale-105"
              type="submit"
            >
              ADD TERMINAL
            </button>
          </div>
        </form>
      </div>

      {user.company.routes.length > 0 && (
        <div className="mx-auto">
          <StaffRouteTable
            reservation={reservation}
            setReservation={setReservation}
            setReservationModal={setReservationModal}
          />
        </div>
      )}
      <div className="my-7 max-w-7xl ">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Route
        </button>
        <form
          onSubmit={addTheRoute}
          className="shadow-2xl relative text-black w-3/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex space-y-2 flex-col  items-center lg:items-start">
            <label htmlFor="state">State</label>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={routeData.state.from}
              onChange={(e) => {
                setRouteData((state) => ({
                  ...state,
                  state: {
                    ...state.state,
                    from: e.target.value,
                  },
                }));
              }}
              required
            >
              <option value="">State From</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={routeData.state.to}
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  state: {
                    ...routeData.state,
                    to: e.target.value,
                  },
                });
              }}
              required
            >
              <option value="">State To</option>
              {states.map((state) => (
                <option value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center lg:items-start space-y-2">
            <label htmlFor="terminal">Terminal</label>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={routeData.terminal.from}
              onChange={(e) => {
                setRouteData((state) => ({
                  ...state,
                  terminal: {
                    ...state.terminal,
                    from: e.target.value,
                  },
                }));
              }}
              required
            >
              <option value="">Terminal From</option>
              {user.company.terminals.map((terminal) => (
                <option value={terminal._id}>{terminal.location}</option>
              ))}
            </select>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={routeData.terminal.to}
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  terminal: {
                    ...routeData.terminal,
                    to: e.target.value,
                  },
                });
              }}
              required
            >
              <option value="">Terminal To</option>
              {user.company.terminals.map((terminal) => (
                <option value={terminal._id}>{terminal.location}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="buses">Bus</label>
            <div className="flex flex-col">
              {routeBus.map((item, index) => (
                <div className="flex flex-col items-center lg:items-start space-y-2">
                  <div className="flex justify-center items-center space-x-6">
                    <div>
                      <select
                        className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
                        onChange={(e) => {
                          handleAddBus(e, index);
                        }}
                        value={routeBus[index].id}
                        required
                      >
                        <option value="">Bus</option>
                        {user.company.buses.map((bus) => (
                          <option value={bus._id}>
                            {bus.name} {bus.companyName}
                          </option>
                        ))}
                      </select>
                      <input
                        value={routeBus[index].fare}
                        onChange={(e) => {
                          handleAddFare(e, index);
                        }}
                        className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
                        type="text"
                        placeholder="Fare"
                        name="fare"
                        required
                      />
                    </div>
                    {routeBus.length > 1 && (
                      <div
                        onClick={() => {
                          handleRemoveBus(index);
                        }}
                        className="bg-black text-white px-2 py-1 font-semibold flex justify-center rounded-sm transition active:scale-90 hover:scale-105"
                      >
                        <DeleteIcon className="text-sm" />
                      </div>
                    )}
                  </div>
                  {routeBus.length - 1 === index && (
                    <button
                      onClick={(e) => {
                        setRouteBus([...routeBus, { id: "", fare: "" }]);
                      }}
                      className="bg-black text-white text-sm px-2 py-1 font-semibold flex justify -center rounded-sm transition active:scale-90 hover:scale-105"
                    >
                      Add Bus
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <label htmlFor="departureTimes">Departure Time</label>
            <div className="flex flex-col">
              {routeTime.map((Time, index) => (
                <div key={index} className="flex space-x-4 items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <input
                        onChange={(e) => {
                          routeDepartureTime(e, index);
                        }}
                        className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm my-2"
                        type="time"
                        name="departureTimes"
                        multiple
                        required
                      />
                      {routeTime.length > 1 && (
                        <div
                          onClick={() => {
                            removeRouteDepartureTime(index);
                          }}
                          className="bg-black text-white px-2 py-1 font-semibold flex justify-center rounded-sm transition active:scale-90 hover:scale-105"
                        >
                          <DeleteIcon className="text-sm" />
                        </div>
                      )}
                    </div>

                    {routeTime.length - 1 === index && (
                      <button
                        onClick={(e) => {
                          setRouteTime([...routeTime, ""]);
                          e.preventDefault();
                        }}
                        className="bg-black text-white text-sm px-2 py-1 font-semibold flex justify -center rounded-sm transition active:scale-90 hover:scale-105"
                      >
                        Add Time
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              value={routeData.departureDate}
              onChange={(e) => {
                setRouteData({ ...routeData, departureDate: e.target.value });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="date"
              name="departureDate"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="recurring">Recurring</label>

            <select
              value={routeData.recurring}
              onChange={(e) => {
                setRouteData({ ...routeData, recurring: e.target.value });
              }}
              name="recurring"
              id="recurring"
              className="text-black shadow-sm px-2 py border"
              required
            >
              <option value="">Please Select</option>
              <option value="none">None</option>
              <option value="everyday">Everyday</option>
              <option value="once a week">Once a week</option>
              <option value="once a month">Once a month</option>
            </select>
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-black active:scale-90 text-white px-4 py-2 font-bold flex justify-center rounded-sm transition hover:scale-105"
              type="submit"
            >
              ADD ROUTE
            </button>
          </div>
        </form>
      </div>

      {user.company.nyscRoutes.length > 0 && (
        <div className="mx-auto">
          <StaffNyscTable
            reservation={reservation}
            setReservation={setReservation}
            setReservationModal={setReservationModal}
          />
        </div>
      )}
      <div className="my-7 max-w-7xl ">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Nysc Route
        </button>
        <form
          onSubmit={addTheNyscRoute}
          className="shadow-2xl relative text-black w-3/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex space-y-2 flex-col  items-center lg:items-start">
            <label htmlFor="state">State</label>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={nyscRouteData.state.from}
              onChange={(e) => {
                setNyscRouteData((state) => ({
                  ...state,
                  state: {
                    ...state.state,
                    from: e.target.value,
                  },
                }));
              }}
              required
            >
              <option value="">State From</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={nyscRouteData.state.to}
              onChange={(e) => {
                setNyscRouteData({
                  ...nyscRouteData,
                  state: {
                    ...nyscRouteData.state,
                    to: e.target.value,
                  },
                });
              }}
              required
            >
              <option value="">State To</option>
              {states.map((state) => (
                <option value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center lg:items-start space-y-2">
            <label htmlFor="terminal">Terminal</label>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={nyscRouteData.terminal.from}
              onChange={(e) => {
                setNyscRouteData((state) => ({
                  ...state,
                  terminal: {
                    ...state.terminal,
                    from: e.target.value,
                  },
                }));
              }}
              required
            >
              <option value="">Terminal From</option>
              {user.company.terminals.map((terminal) => (
                <option value={terminal._id}>{terminal.location}</option>
              ))}
            </select>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              value={nyscRouteData.terminal.to}
              onChange={(e) => {
                setNyscRouteData({
                  ...nyscRouteData,
                  terminal: {
                    ...nyscRouteData.terminal,
                    to: e.target.value,
                  },
                });
              }}
              required
            >
              <option value="">Terminal To</option>
              {user.company.terminals.map((terminal) => (
                <option value={terminal._id}>{terminal.location}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="buses">Bus</label>
            <div className="flex flex-col">
              {nyscRouteBus.map((item, index) => (
                <div className="flex flex-col items-center lg:items-start space-y-2">
                  <div className="flex justify-center items-center space-x-6">
                    <div>
                      <select
                        className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
                        onChange={(e) => {
                          handleAddNyscBus(e, index);
                        }}
                        value={nyscRouteBus[index].id}
                        required
                      >
                        <option value="">Bus</option>
                        {user.company.buses.map((bus) => (
                          <option value={bus._id}>
                            {bus.name} {bus.companyName}
                          </option>
                        ))}
                      </select>
                      <input
                        value={nyscRouteBus[index].fare}
                        onChange={(e) => {
                          handleAddNyscFare(e, index);
                        }}
                        className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
                        type="text"
                        placeholder="Fare"
                        name="fare"
                        required
                      />
                    </div>
                    {nyscRouteBus.length > 1 && (
                      <div
                        onClick={() => {
                          handleRemoveNyscBus(index);
                        }}
                        className="bg-black text-white px-2 py-1 font-semibold flex justify-center rounded-sm transition active:scale-90 hover:scale-105"
                      >
                        <DeleteIcon className="text-sm" />
                      </div>
                    )}
                  </div>
                  {nyscRouteBus.length - 1 === index && (
                    <button
                      onClick={(e) => {
                        setNyscRouteBus([
                          ...nyscRouteBus,
                          { id: "", fare: "" },
                        ]);
                      }}
                      className="bg-black text-white text-sm px-2 py-1 font-semibold flex justify -center rounded-sm transition active:scale-90 hover:scale-105"
                    >
                      Add Bus
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="departureTimes">Departure Time</label>
            <div className="flex flex-col">
              {nyscRouteTime.map((Time, index) => (
                <div key={index} className="flex space-x-4 items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <input
                        onChange={(e) => {
                          nyscRouteDepartureTime(e, index);
                        }}
                        className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm my-2"
                        type="time"
                        name="departureTimes"
                        multiple
                        required
                      />
                      {nyscRouteTime.length > 1 && (
                        <div
                          onClick={() => {
                            removeNyscRouteDepartureTime(index);
                          }}
                          className="bg-black text-white px-2 py-1 font-semibold flex justify-center rounded-sm transition active:scale-90 hover:scale-105"
                        >
                          <DeleteIcon className="text-sm" />
                        </div>
                      )}
                    </div>

                    {nyscRouteTime.length - 1 === index && (
                      <button
                        onClick={(e) => {
                          setNyscRouteTime([...nyscRouteTime, ""]);
                          e.preventDefault();
                        }}
                        className="bg-black text-white text-sm px-2 py-1 font-semibold flex justify -center rounded-sm transition active:scale-90 hover:scale-105"
                      >
                        Add Time
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              value={nyscRouteData.departureDate}
              onChange={(e) => {
                setNyscRouteData({
                  ...nyscRouteData,
                  departureDate: e.target.value,
                });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="date"
              name="departureDate"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="recurring">Recurring</label>

            <select
              value={nyscRouteData.recurring}
              onChange={(e) => {
                setNyscRouteData({
                  ...nyscRouteData,
                  recurring: e.target.value,
                });
              }}
              name="recurring"
              id="recurring"
              className="text-black shadow-sm px-2 py border"
              required
            >
              <option value="">Please Select</option>
              <option value="none">None</option>
              <option value="everyday">Everyday</option>
              <option value="once a week">Once a week</option>
              <option value="once a month">Once a month</option>
            </select>
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-black text-white px-4 py-2 font-bold flex justify-center rounded-sm transition active:scale-90 hover:scale-105"
              type="submit"
            >
              ADD NYSC ROUTE
            </button>
          </div>
        </form>
      </div>
      {reservationModal && (
        <StaffReservationModal
          reservation={reservation}
          setReservationModal={setReservationModal}
        />
      )}
    </div>
  );
}
