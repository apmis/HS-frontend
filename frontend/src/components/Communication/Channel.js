/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";

import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";

const searchfacility = {};

export default function Channels() {
  const { state } = useContext(ObjectContext);

  const [selectedBand, setSelectedBand] = useState();

  return (
    <section className='section remPadTop'>
      <div className='columns '>
        <div className='column is-8 '>
          <ChannelList />
        </div>
        <div className='column is-4 '>
          {state.BandModule.show === "create" && <ChannelCreate />}
          {state.BandModule.show === "detail" && <ChannelDetail />}
          {state.BandModule.show === "modify" && (
            <ChannelModify Band={selectedBand} />
          )}
        </div>
      </div>
    </section>
  );
}

export function ChannelCreate() {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [facility, setFacility] = useState();
  const ChannelServ = client.service("messaging");

  const { user } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState();
  const bandTypeOptions = ["WHATSAPP", "SMS", "USSD"];
  const bandProviderType = ["TWILO", "messagebird"];

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);

    return () => {};
  }, [user]);

  useEffect(() => {
    if (!user.stacker) {
      setValue("facility", user.currentEmployee.facilityDetail._id, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  });

  const onSubmit = (data, e) => {
    
    e.preventDefault();
   
    // console.log(data);
    if (data.bandType === "") {
      alert("Kindly choose type");
      return;
    }
    setMessage("");
    setError(false);
    setSuccess(false);
    
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    console.log(data)
    data.providerConfig= JSON.parse(data.providerConfig)
    ChannelServ.create(data)
       
      .then((res) => {
        console.log(data);
        e.target.reset();

        setSuccess(true);
        toast({
          message: "Channel created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          message: "Error creating Channel " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className='card '>
        <div className='card-header'>
          <p className='card-header-title'>Create Channel</p>
        </div>
        <div className='card-content vscrollable'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='name'
                  type='text'
                  placeholder='Name'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-map-signs'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <div className='control'>
                <div className='select is-small '>
                  <select
                    name='type'
                    ref={register({ required: true })}
                    className='selectadd'
                  >
                    <option value=''>Choose Type</option>
                    {bandTypeOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {" "}
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='field'>
              <div className='control'>
                <div className='select is-small '>
                  <select
                    name='provider'
                    ref={register({ required: true })}
                     className='selectadd'
                  >
                    <option value=''>Provider</option>
                    {bandProviderType.map((option, j) => (
                      <option key={j} value={option}>
                        {" "}
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='baseUrl'
                  type='text'
                  placeholder='baseUrl'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-map-signs'></i>
                </span>
              </p>
            </div>
            <textarea
              className='field'
              ref={register({ required: true })}
              id="providerCon"
              name='providerConfig'
              type='text'
              placeholder='ProviderConfig'
            ></textarea>
           

            <div
              className='field'
              style={!user.stacker ? { display: "none" } : {}}
            >
             
              <p
                className='control has-icons-left '
                style={{ display: "none" }}
              >
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='facility'
                  type='text'
                  placeholder='Facility'
                />
                <span className='icon is-small is-left'>
                  <i className='fas  fa-map-marker-alt'></i>
                </span>
              </p>
            </div>

            <div className='field'>
              <p className='control'>
                <button className='button is-success is-small'>Create</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export function ChannelList() {
  // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const ChannelServ=client.service('messaging')
    //const history = useHistory()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedBand, setSelectedBand]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)

  const handleCreateNew = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
  };
  const handleRow = async (Band) => {
    await setSelectedBand(Band);

    const newBandModule = {
      selectedBand: Band,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const handleSearch = (val) => {
    const field = "name";
    //  console.log(val)
    ChannelServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        // console.log(res)
        setFacilities(res.data);
        setMessage(" Channel  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        // console.log(err)
        setMessage("Error fetching Channel, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findBand = await ChannelServ.find({
        query: {
         
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });
     

     await setFacilities(findBand.data);
    } else {
      if (user.stacker) {
        const findBand = await ChannelServ.find({
          query: {
            $limit: 200,
            $sort: {
              facility: -1,
            },
          },
        });

        setFacilities(findBand.data);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
    }
    ChannelServ.on("created", (obj) => getFacilities());
    ChannelServ.on("updated", (obj) => getFacilities());
    ChannelServ.on("patched", (obj) => getFacilities());
    ChannelServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  return (
    <>
      {user ? (
        <>
          <div className='level'>
            <div className='level-left'>
              <div className='level-item'>
                <div className='field'>
                  <p className='control has-icons-left  '>
                    <DebounceInput
                      className='input is-small '
                      type='text'
                      placeholder='Search Channels'
                      minLength={3}
                      debounceTimeout={400}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <span className='icon is-small is-left'>
                      <i className='fas fa-search'></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className='level-item'>
              {" "}
              <span className='is-size-6 has-text-weight-medium'>
                List of Channels{" "}
              </span>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <div className='level-item'>
                  <div
                    className='button is-success is-small'
                    onClick={handleCreateNew}
                  >
                    New
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='table-container pullup '>
            <table className='table is-striped is-narrow is-hoverable is-fullwidth is-scrollable '>
              <thead>
                <tr>
                  <th>
                    <abbr title='Serial No'>S/No</abbr>
                  </th>
                  <th>Name</th>
                  <th>
                    <abbr title='Type'> Type</abbr>
                  </th>
                  <th>
                    <abbr title='Provider'>Provider</abbr>
                  </th>
                  <th>
                    <abbr title='BaseUrl'>BaseUrl</abbr>
                  </th>
                  {/* <th><abbr title="Description">ProviderConfig</abbr></th> */}

                  {user.stacker && (
                    <th>
                      <abbr title='Facility'>Facility</abbr>
                    </th>
                  )}
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {facilities.map((Band, i) => (
                  <tr
                    key={Band._id}
                    onClick={() => handleRow(Band)}
                    className={
                      Band._id === (selectedBand?._id || null)
                        ? "is-selected"
                        : ""
                    }
                  >
                    <th>{i + 1}</th>
                    <th>{Band.name}</th>
                    <td>{Band.type}</td>
                    <td>{Band.provider}</td>
                    <td>{Band.baseUrl}</td>
                    {/* < td>{Band.description}</td> */}

                    {user.stacker && <td>{Band.facility}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ChannelDetail() {
  const [error, setError] = useState(false); //,

  const [message, setMessage] = useState(""); //,

  const { state, setState } = useContext(ObjectContext);

  const Band = state.BandModule.selectedBand;

  const handleEdit = async () => {
    const newBandModule = {
      selectedBand: Band,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className='card '>
        <div className='card-header'>
          <p className='card-header-title'>Channel Details</p>
        </div>
        <div className='card-content vscrollable'>
          <table>
            <tbody>
              <tr>
                <td>
                  <label className='label is-small'>
                    {" "}
                    <span className='icon is-small is-left'>
                      <i className='fas fa-hospital'></i>
                    </span>
                    Name:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {Band.name}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='label is-small'>
                    <span className='icon is-small is-left'>
                      <i className='fas fa-map-signs'></i>
                    </span>
                     Type:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='BandType'>
                    {Band.type}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='label is-small'>
                    <span className='icon is-small is-left'>
                      <i className='fas fa-map-signs'></i>
                    </span>
                     Provider:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='BandType'>
                    {Band.provider}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='label is-small'>
                    {" "}
                    <span className='icon is-small is-left'>
                      <i className='fas fa-blog'></i>
                    </span>
                    BaseUrl:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {Band.baseUrl}{" "}
                  </span>
                </td>
              </tr>
             
            </tbody>
          </table>

          <div className='field mt-2'>
            <p className='control'>
              <button
                className='button is-success is-small'
                onClick={handleEdit}
              >
                Edit
              </button>
            </p>
          </div>
          {error && <div className='message'> {message}</div>}
        </div>
      </div>
    </>
  );
}

export function ChannelModify() {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ChannelServ = client.service("messaging");

  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const Band = state.BandModule.selectedBand;

  useEffect(() => {
    setValue("name", Band.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("type", Band.type, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("provider", Band.provider, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("baseUrl", Band.baseUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      BandModule: newBandModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newBandModule = {
      selectedBand: {},
      show: "create",
    };
    setState((prevstate) => ({ ...prevstate, BandModule: newBandModule }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Band._id;
    if (conf) {
      ChannelServ.remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();

          toast({
            message: "Channel deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          toast({
            message: "Error deleting Channel, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    // console.log(data)
    
    //console.log(data);

    ChannelServ.patch(Band._id, data)
      .then((res) => {
        toast({
          message: "Channel updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch((err) => {
        console.log(err);
        //setMessage("Error creating Band, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Channel, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className='card '>
        <div className='card-header'>
          <p className='card-header-title'>Band Details-Modify</p>
        </div>
        <div className='card-content vscrollable'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='field'>
              <label className='label is-small'>
                {" "}
                Name
                <p className='control has-icons-left has-icons-right'>
                  <input
                    className='input  is-small'
                    ref={register({ required: true })}
                    name='name'
                    type='text'
                    placeholder='Name'
                  />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-hospital'></i>
                  </span>
                </p>
              </label>
            </div>
            <div className='field'>
              <label className='label is-small'>
                 Type
                <p className='control has-icons-left has-icons-right'>
                  <input
                    className='input is-small '
                    ref={register({ required: true })}
                    disabled
                    name='type'
                    type='text'
                    placeholder='Type'
                  />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-map-signs'></i>
                  </span>
                </p>
              </label>
            </div>
            <div className='field'>
              <label className='label is-small'>
                 Provider
                <p className='control has-icons-left has-icons-right'>
                  <input
                    className='input is-small '
                    ref={register({ required: true })}
                    disabled
                    name='provider'
                    type='text'
                    placeholder='Type'
                  />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-map-signs'></i>
                  </span>
                </p>
              </label>
            </div>
            <div className='field'>
              <label className='label is-small'>
                {" "}
                BaseUrl
                <p className='control has-icons-left has-icons-right'>
                  <input
                    className='input  is-small'
                    ref={register({ required: true })}
                    name='baseUrl'
                    type='text'
                    placeholder='Name'
                  />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-hospital'></i>
                  </span>
                </p>
              </label>
            </div>
          </form>

          <div className='field  is-grouped mt-2'>
            <p className='control'>
              <button
                type='submit'
                className='button is-success is-small'
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </p>
            <p className='control'>
              <button
                className='button is-warning is-small'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </p>
            <p className='control'>
              <button
                className='button is-danger is-small'
                onClick={() => handleDelete()}
                type='delete'
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function InputSearch({ getSearchfacility, clear }) {
  const facilityServ = client.service("facility");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async (e) => {
    if (count === 2) {
      //  console.log("stuff was chosen")
    }
  };
  const handleSearch = async (val) => {
    const field = "facilityName"; //field variable

    if (val.length >= 3) {
      facilityServ
        .find({
          query: {
            //service
            [field]: {
              $regex: val,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          // console.log("facility  fetched successfully")
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          //  console.log(err)
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      // console.log("less than 3 ")
      // console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className='field'>
        <div className='control has-icons-left  '>
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className='dropdown-trigger'>
              <DebounceInput
                className='input is-small '
                type='text'
                placeholder='Search Facilities'
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-search'></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className='dropdown-menu'>
              <div className='dropdown-content'>
                {facilities.map((facility, i) => (
                  <div
                    className='dropdown-item'
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}