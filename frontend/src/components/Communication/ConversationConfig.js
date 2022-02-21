/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";

import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";

const searchfacility = {};

export default function ConversationConfig() {
  const { state } = useContext(ObjectContext);

  const [selectedConversationConfig, setSelectedConversationConfig] = useState();

  return (
    <section className='section remPadTop'>
      <div className='columns '>
        <div className='column is-8 '>
          <ConversationConfigCreateList />
        </div>
        <div className='column is-4 '>
          {state.ConversationConfigModule.show === "create" && <ConversationConfigCreateCreate />}
          {state.ConversationConfigModule.show === "detail" && <ConversationConfigCreateDetail />}
          {state.ConversationConfigModule.show === "modify" && (
            <ConversationConfigCreateModify ConversationConfig={selectedConversationConfig} />
          )}
        </div>
      </div>
    </section>
  );
}

export function ConversationConfigCreateCreate() {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [facility, setFacility] = useState();
  const ConversationConfigServ = client.service("conversation-config");
  const QuestionnaireServ = client.service("questionnaire");
  const ChannelServ = client.service("messaging");

  const { user } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState();
  const [questionnaires, setQuestionnaires] = useState([]);
  const [channels, setChannels] = useState([]);

  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const fetchOptions = () => {
    Promise.all([ChannelServ.find({}), QuestionnaireServ.find({})])
    .then(([resc, resq]) => { setChannels(resc.data); setQuestionnaires(resq.data)})
    .catch(error => console.error({error}));
  }

  useEffect(() => {
    setCurrentUser(user);
    fetchOptions();
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
    if (data.ConversationConfigType === "") {
      alert("Kindly choose type");
      return;
    }
    setMessage("");
    setError(false);
    setSuccess(false);
    
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.extras= JSON.parse(data.extras ? data.extras : null)
    ConversationConfigServ.create(data)
       
      .then((res) => {
        console.log(data);
        e.target.reset();

        setSuccess(true);
        toast({
          message: "Conversation Config created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          message: "Error creating Conversation Config " + err,
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
          <p className='card-header-title'>Create Conversation Configuration</p>
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
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='triggerToken'
                  type='text'
                  placeholder='Trigger Token'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-map-signs'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='timeoutMillis'
                  type='number'
                  defaultValue={0}
                  placeholder='Autoproceed timeout'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-map-signs'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='senderPhoneNumber'
                  type='text'
                  placeholder='Sender phone number'
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
                    name='channel'
                    ref={register({ required: true })}
                    className='selectadd'
                  >
                    <option value=''>Choose Type</option>
                    {channels.map(({name, _id}, i) => (
                      <option key={i} value={_id}>
                        {" "}
                        {name}
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
                    name='questionnaire'
                    ref={register({ required: true })}
                    className='selectadd'
                  >
                    <option value=''>Choose Questionnaire</option>
                    {questionnaires.map(({_id, name}, i) => (
                      <option key={i} value={_id}>
                        {" "}
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <textarea
              className='field'
              ref={register({ required: false })}
              id="extras"
              name='extras'
              type='text'
              placeholder='Other Config'
            ></textarea>

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

export function ConversationConfigCreateList() {
  // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("")
    const ConversationConfigerv=client.service('conversation-config')
    //const history = useHistory()
   // const {user,setUser} = useContext(UserContext)
    const [conversationConfigs,setConversationConfigs]=useState([])
     // eslint-disable-next-line
   const [selectedConversationConfig, setSelectedConversationConfig]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)

  const handleCreateNew = async () => {
    const newConversationConfigModule = {
      selectedConversationConfig: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ConversationConfigModule: newConversationConfigModule,
    }));
  };
  const handleRow = async (conversationConfig) => {
    await setSelectedConversationConfig(conversationConfig);

    const newConversationConfigModule = {
      selectedConversationConfig: conversationConfig,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ConversationConfigModule: newConversationConfigModule,
    }));
    //console.log(state)
  };

  const handleSearch = (val) => {
    const field = "name";
    //  console.log(val)
    ConversationConfigerv.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        // facility: user.currentEmployee.facilityDetail._id || "",
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        // console.log(res)
        setConversationConfigs(res.data);
        setMessage(" Configuration  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        // console.log(err)
        setMessage("Error fetching Configuration, probable network issues " + err);
        setError(true);
      });
  };

  const getConversationConfigs = async () => {
    if (user.currentEmployee) {
      const response = await ConversationConfigerv.find({
        query: {
         
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });
     

     await setConversationConfigs(response.data);
    } else {
      if (user.stacker) {
        const response = await ConversationConfigerv.find({});

        setConversationConfigs(response.data);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      getConversationConfigs();
    } else {
    }
    ConversationConfigerv.on("created", (obj) => getConversationConfigs());
    ConversationConfigerv.on("updated", (obj) => getConversationConfigs());
    ConversationConfigerv.on("patched", (obj) => getConversationConfigs());
    ConversationConfigerv.on("removed", (obj) => getConversationConfigs());
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
                      placeholder='Search ConversationConfig'
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
                List of Conversation Configurations{" "}
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
                    <abbr title='BaseUrl'>Channel</abbr>
                  </th>
                  <th>
                    <abbr title='BaseUrl'>Questionnaire</abbr>
                  </th>
                  <th>
                    <abbr title='Type'> Trigger token</abbr>
                  </th>
                  <th>
                    <abbr title='Provider'>Autoproceed timeout</abbr>
                  </th>
                  <th>
                    <abbr title='BaseUrl'>Sender Phone number</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {conversationConfigs.map((conversationConfig, i) => (
                  <tr
                    key={conversationConfig._id}
                    onClick={() => handleRow(conversationConfig)}
                    className={
                      conversationConfig._id === (selectedConversationConfig?._id || null)
                        ? "is-selected"
                        : ""
                    }
                  >
                    <th>{i + 1}</th>
                    <th>{conversationConfig.name}</th>
                    <td>{conversationConfig.channel.name}</td>
                    <td>{conversationConfig.questionnaire.name}</td>
                    <td>{conversationConfig.triggerToken}</td>
                    <td>{conversationConfig.timeoutMillis}</td>
                    <td>{conversationConfig.senderPhoneNumber}</td>
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

export function ConversationConfigCreateDetail() {
  const [error, setError] = useState(false); //,

  const [message, setMessage] = useState(""); //,

  const { state, setState } = useContext(ObjectContext);

  const conversationConfig = state.ConversationConfigModule.selectedConversationConfig;

  const handleEdit = async () => {
    const newConversationConfigModule = {
      selectedConversationConfig: conversationConfig,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ConversationConfigModule: newConversationConfigModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className='card '>
        <div className='card-header'>
          <p className='card-header-title'>ConversationConfigCreate Details</p>
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
                    {conversationConfig.name}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='label is-small'>
                    <span className='icon is-small is-left'>
                      <i className='fas fa-map-signs'></i>
                    </span>
                     Channel:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='ConversationConfigType'>
                    {conversationConfig.channel.name}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='label is-small'>
                    <span className='icon is-small is-left'>
                      <i className='fas fa-map-signs'></i>
                    </span>
                     Questionnaire:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='ConversationConfigType'>
                    {conversationConfig.questionnaire.name}{" "}
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
                    Trigger Token:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {conversationConfig.triggerToken}{" "}
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
                    Autoproceed timeout:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {conversationConfig.timeoutMillis}{" "}
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
                    Sender Phone Number:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {conversationConfig.senderPhoneNumber}{" "}
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
                    Extra config
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {conversationConfig.extras}{" "}
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

export function ConversationConfigCreateModify() {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const [questionnaires, setQuestionnaires] = useState([]);
  const [channels, setChannels] = useState([]);

  // eslint-disable-next-line
  const ConversationConfigerv = client.service("conversation-config");
  const QuestionnaireServ = client.service("questionnaire");
  const ChannelServ = client.service("messaging");

  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const conversationConfig = state.ConversationConfigModule.selectedConversationConfig;

  const fetchOptions = () => {
    Promise.all([ChannelServ.find({}), QuestionnaireServ.find({})])
    .then(([resc, resq]) => { setChannels(resc.data); setQuestionnaires(resq.data)})
    .catch(error => console.error({error}));
  }


  useEffect(() => {
    console.log('triggering');
    fetchOptions();
    setValue("name", conversationConfig.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("channel", conversationConfig.channel._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("questionnaire", conversationConfig.questionnaire._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("triggerToken", conversationConfig.triggerToken, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("timeoutMillis", conversationConfig.timeoutMillis, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("senderPhoneNumber", conversationConfig.senderPhoneNumber, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("extras", JSON.stringify(conversationConfig.extras) || "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newConversationConfigModule = {
      selectedConversationConfig: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ConversationConfigModule: newConversationConfigModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newConversationConfigModule = {
      selectedConversationConfig: {},
      show: "create",
    };
    setState((prevstate) => ({ ...prevstate, ConversationConfigModule: newConversationConfigModule }));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = conversationConfig._id;
    if (conf) {
      ConversationConfigerv.remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();

          toast({
            message: "Configuration deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          toast({
            message: "Error deleting Configuration, probable network issues or " + err,
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
    data.extras= JSON.parse(data.extras ? data.extras : null)
    ConversationConfigerv.patch(conversationConfig._id, data)
      .then((res) => {
        toast({
          message: "Configuration updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch((err) => {
        console.log(err);
        toast({
          message: "Error updating Configuration, probable network issues or " + err,
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
          <p className='card-header-title'>COnfiguration Details-Modify</p>
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
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='triggerToken'
                  type='text'
                  placeholder='Trigger Token'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-map-signs'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='timoutMillis'
                  type='number'
                  defaultValue={0}
                  placeholder='Autoproceed timeout'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-map-signs'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input is-small'
                  ref={register({ required: true })}
                  name='senderPhoneNumber'
                  type='text'
                  placeholder='Sender phone number'
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
                    name='channel'
                    ref={register({ required: true })}
                    className='selectadd'
                  >
                    <option value=''>Choose Type</option>
                    {channels.map(({name, _id}, i) => (
                      <option key={i} value={_id}>
                        {" "}
                        {name}
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
                    name='questionnaire'
                    ref={register({ required: true })}
                    className='selectadd'
                  >
                    <option value=''>Choose Questionnaire</option>
                    {questionnaires.map(({_id, name}, i) => (
                      <option key={i} value={_id}>
                        {" "}
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <textarea
              className='field'
              ref={register({ required: false })}
              id="extras"
              name='extras'
              type='text'
              placeholder='Other Config'
            ></textarea>

            <div className='field'>
              <p className='control'>
                <button className='button is-success is-small'>Create</button>
              </p>
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
  const [conversationConfigs, setConversationConfigs] = useState([]);
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
          setConversationConfigs(res.data);
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
      await setConversationConfigs([]);
      console.log(conversationConfigs);
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
                placeholder='Search conversationConfigs'
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
                {conversationConfigs.map((facility, i) => (
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
