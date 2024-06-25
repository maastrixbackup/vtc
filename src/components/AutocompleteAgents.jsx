import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { APIURL } from "../CommonMethods/Fetch";
import { postRecord } from "../CommonMethods/Save";
import SaveIcon from "@material-ui/icons/Save";
import { AuthContext } from "../CommonMethods/Authentication";
const APIGetCoAgentInfo = APIURL() + "get-agent-names";
const APISaveCoAgent = APIURL() + "save-coagent";

function AutocompleteAgents({
  tourId,
  setMessage,
  setOpenSuccess,
  setSync,
  sync,
  setOpenError,
}) {
  const context = useContext(AuthContext);
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const fetchNames = async () => {
      const obj = {
        authenticate_key: "abcd123XYZ",
        name: inputValue,
      };
      const res = await postRecord(APIGetCoAgentInfo, obj);
      setOptions(res.data.agents);
    };
    const delayDebounceFn = setTimeout(() => {
      if (inputValue.length > 0) fetchNames();
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);
  const saveAgent = async () => {
    const agent_id = JSON.parse(context.state.user).agentId;
    const obj = {
      authenticate_key: "abcd123XYZ",
      existingAgentId: value.id,
      agent_id,
      tourId,
    };
    try {
      const res = await postRecord(APISaveCoAgent, obj);
      setMessage(res.data[0].response.message);
      setOpenSuccess(true);
      setSync(!sync);
    } catch (error) {
      setMessage("There was an error,Please try again later");
      setOpenError(true);
    }
  };
  return (
    <div>
      <Autocomplete
        loading={true}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.fname + " " + option.lname}
        renderInput={(params) => {
          return (
            <div className="formbox1">
              <label class="mb-2">Agent Name</label>
              <TextField {...params} label="Agent Name" />
            </div>
          );
        }}
      />
      <button
        onClick={saveAgent}
        startIcon={<SaveIcon />}
        style={{ float: "right" }}
        variant="contained"
        color="#ffa12d"
        className="next_btn"
      >
        Update
      </button>
    </div>
  );
}

export default AutocompleteAgents;
