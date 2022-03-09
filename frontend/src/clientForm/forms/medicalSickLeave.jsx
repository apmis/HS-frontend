import "../_style.css";
import { useForm } from "react-hook-form";

const MedicalSickLeave = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Medical Sick Leave</p>
      </div>
      <div className="card-content vscrollable">
        <div className="content mt-4">
          <p className="label is-small mb-4 has-text-centered">
            TO WHOM IT MAY CONCERN
          </p>
          <p className="label is-small">
            This is to certify that
            <input className="dotted_bottom" type="text" name="" id="" /> <br />
            Address
            <input
              className="dotted_bottom"
              type="text"
              name=""
              id=""
            /> <br /> Was examined and treated at our Hospital on{" "}
            <input className="dotted_bottom" type="date" name="" id="" /> <br />{" "}
            with the following Diagnosis{" "}
          </p>
          <div className="field">
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
          <p className="label is-small mt-3">
            and would need Medical Attention/Bed Rest for
            <input className="dotted_bottom" type="text" name="" id="" /> days
            in order to ensure total recurperation
          </p>
        </div>
        <div className="field has-text-right mt-4">
          <label className="label is-small">Attending Physician</label>
          <div className="control">
            <input className="input is-small dotted_bottom" type="text" />
          </div>
        </div>
        <div className="field mt-4">
          <button className="button is-success is-small">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default MedicalSickLeave;
