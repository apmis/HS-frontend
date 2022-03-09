import { useForm } from "react-hook-form";


import "../_style.css";
import PrivacyConsentNote from "./_formFragment/privacyConsentNote";

const AdmissionConsentForm = ({onSubmit}) => {
  const { register, handleSubmit } = useForm(); 

  
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Admission Consent Form</p>
      </div>
      <div className="card-content vscrollable">
        <div className="field">
          <label className="label is-small">Date of Admission</label>
          <div className="control">
            <input className="input is-small" type="date" />
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Attending Physician</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field-body">
          <div className="field">
            <label className="label is-small">Reason For Admission</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
        </div>
        <div className="field-body mt-3">
          <div className="field">
            <label className="label is-small">Title</label>
            <p className="control">
              <div className="select is-small">
                <select>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
              </div>
            </p>
          </div>
        </div>
        <div className="field is-horizontal mt-3">
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Surname</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
            <div className="field">
              <label className="label is-small">First Name</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Address</label>
          <p className="control is-expanded">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field is-horizontal mt-3">
          <div className="field-body">
            <div className="field">
              <label className="label is-small">LGA</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
            <div className="field">
              <label className="label is-small">State</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal mt-3">
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Home Telephone</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
            <div className="field">
              <label className="label is-small">Mobile Phone</label>
              <p className="control is-expanded">
                <input className="input is-small" type="text" />
              </p>
            </div>
          </div>
        </div>
        <div className="field mt-3">
          <div className="field-body">
            <div className="field w-100">
              <label className="label is-small">Date of Birth</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">Gender</label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="gender" />
                <span className="ms-2 is-small">Male</span>
              </label>
              <label className="radio">
                <input type="radio" name="gender" />
                <span className="ms-2 is-small">Female</span>
              </label>
            </div>
          </div>
        </div>
        <div className="field mt-3">
          <div className="field-body">
            <div className="field w-100">
              <label className="label is-small">Main Language</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              Do you require an interpreter?
            </label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="interpreter" />
                <span className="ms-2 is-small">Yes</span>
              </label>
              <label className="radio">
                <input type="radio" name="interpreter" />
                <span className="ms-2 is-small">No</span>
              </label>
            </div>
          </div>
        </div>
        <div className="field mt-3">
          <div className="field-body">
            <div className="field w-100">
              <label className="label is-small">Country of Birth</label>
              <p className="control">
                <div className="select is-small">
                  <select>
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>Senegal</option>
                  </select>
                </div>
              </p>
            </div>
          </div>
          <div className="grid mt-3">
            <div className="field w-100">
              <label className="label is-small">Occupation</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
            <div className="field w-100">
              <label className="label is-small">Religion</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">Marital Status</label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="marital-status" />
                <span className="ms-2 is-small">Single</span>
              </label>
              <label className="radio">
                <input type="radio" name="marital-status" />
                <span className="ms-2 is-small">Married</span>
              </label>
              <label className="radio">
                <input type="radio" name="marital-status" />
                <span className="ms-2 is-small">Widowed</span>
              </label>
              <label className="radio">
                <input type="radio" name="marital-status" />
                <span className="ms-2 is-small">Divorced</span>
              </label>
              <label className="radio">
                <input type="radio" name="marital-status" />
                <span className="ms-2 is-small">Seperated</span>
              </label>
            </div>
          </div>
          <div className="grid mt-3">
            <div className="field w-100">
              <label className="label is-small">Next of Kin Name</label>
              <div className="control">
                <input className="input is-small" type="text" />
              </div>
            </div>
            <div className="field w-100">
              <label className="label is-small">Next of Kin Tel</label>
              <div className="control">
                <input className="input is-small" type="tel" />
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Previous Hospitalizations</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              Have you been admitted at the OLIVE MULTI-SPECIALIST within the
              past 30 days
            </label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="been-admitted-at-olive" />
                <span className="ms-2 is-small">Yes</span>
              </label>
              <label className="radio">
                <input type="radio" name="been-admitted-at-olive" />
                <span className="ms-2 is-small">No</span>
              </label>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              Have you been admitted at another hospital within the past 7 days
            </label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="been-admitted-at-any-hospital" />
                <span className="ms-2 is-small">Yes</span>
              </label>
              <label className="radio">
                <input type="radio" name="been-admitted-at-any-hospital" />
                <span className="ms-2 is-small">No</span>
              </label>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              Will your admission be covered by your insurer/employer?
            </label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="insurer" />
                <span className="ms-2 is-small">Yes</span>
              </label>
              <label className="radio">
                <input type="radio" name="insurer" />
                <span className="ms-2 is-small">No</span>
              </label>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              If not, have you had a discussion with the accounts unit about the
              financial aspect of your admission?
            </label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="financial-discussion" />
                <span className="ms-2 is-small">Yes</span>
              </label>
              <label className="radio">
                <input type="radio" name="financial-discussion" />
                <span className="ms-2 is-small">No</span>
              </label>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              If yes, please give insurance name & policy number
            </label>
            <div className="grid mt-3">
              <div className="field w-100">
                <label className="label is-small">Insurance Name</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
              <div className="field w-100">
                <label className="label is-small">Policy No</label>
                <div className="control">
                  <input className="input is-small" type="number" />
                </div>
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              Contact person at your HMO/Insurer office
            </label>
            <div className="grid mt-3">
              <div className="field w-100">
                <label className="label is-small">Contact Name</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
              <div className="field w-100">
                <label className="label is-small">Contact No</label>
                <div className="control">
                  <input className="input is-small" type="number" />
                </div>
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              If not, having a surgical procedure, has your HMO/Insurer
              authorized the procedure?
            </label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="hmo-authorization" />
                <span className="ms-2 is-small">Yes</span>
              </label>
              <label className="radio">
                <input type="radio" name="hmo-authorization" />
                <span className="ms-2 is-small">No</span>
              </label>
            </div>
          </div>
          <PrivacyConsentNote />
        </div>
        <div className="field mt-3">
          <button className="button is-success is-small">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionConsentForm;
