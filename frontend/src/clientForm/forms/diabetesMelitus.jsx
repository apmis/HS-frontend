import { useForm } from "react-hook-form";

const DiabetesMelitus = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <>
      <form onSubmit = {handleSubmit(onSubmit)} >
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">Diabetes Melitus Flowsheet</p>
          </div>
          <div className="card-content vscrollable">
            <div className="field">
              <label className="label is-small">Name</label>
              <p className="control is-expanded">
                <input ref={register} name="name" className="input is-small" type="text" />
              </p>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label is-small">D.O.B</label>
                  <p className="control is-expanded">
                    <input ref={register} name="dob" className="input is-small" type="date" />
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label is-small">MR#</label>
                  <p className="control is-expanded">
                    <input ref={register} name="mr#"  className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <p className="control is-expanded mt-3">Patient Learning Need/Goal</p>
            <div className="content mt-3">
              <ol>
                <li>
                  <strong>General Facts About Diabetes Mellitus</strong>
                  <ul>
                    <li>
                      <strong>What is Diabetes Melitus?</strong>
                    </li>
                    <li>
                      <strong>
                        Basic Pathophysiology of Type I/ Type II Diabetes
                        Mellitus?
                      </strong>
                    </li>
                    <li>
                      <strong>Normal and Abnormal Glucose Levels?</strong>
                    </li>
                    <li>
                      <strong>Normal and Abnormal HgbAIC Levels?</strong>
                    </li>
                    <li>
                      <strong>Results and Significance of DCCT Report</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date1"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEduc"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown"  className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Dietary Management</strong>
                  <ul>
                    <li>
                      <strong>Weight Reduction Targets</strong>
                    </li>
                    <li>
                      <strong>How to follow ADA Dietary</strong>
                    </li>
                    <li>
                      <strong>Guildlnes</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date2"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel2"  className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu2"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown2"  className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Treatment of DM w/Oral Hypoglycemic Agents</strong>
                  <ul>
                    <li>
                      <strong>
                        Type & Action of Drugs (incl, onset, peak & duration)
                      </strong>
                    </li>
                    <li>
                      <strong>Dosages</strong>
                    </li>
                    <li>
                      <strong>
                        Interactions, Side effects & Adverse reactions
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date3"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel3"  className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu3" className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown3" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Treatment of DM w/Oral Hypoglycemic Agents</strong>
                  <ul>
                    <li>
                      <strong>
                        Type & Action of insulin (incl, onset, peak & duration)
                      </strong>
                    </li>
                    <li>
                      <strong>Dosages</strong>
                    </li>
                    <li>
                      <strong>
                        Interactions, Side effects & Adverse reactions
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Proper Technique of Insulin injection (w pt. demo)
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date4"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel4" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register}  name="dmEdu4" className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown4"  className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Hypoglycemia & Hyperglycemia</strong>
                  <ul>
                    <li>
                      <strong>Signs and Symptoms</strong>
                    </li>
                    <li>
                      <strong>Treatment of Hypoglycemia</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date5" className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel5"  className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu5" className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown5"  className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Blood Glucose Monitoring (BGM)</strong>
                  <ul>
                    <li>
                      <strong>
                        Use of Fingerstick Glucometer(w pt. demonstration)
                      </strong>
                    </li>
                    <li>
                      <strong>Urine testing for keynotes</strong>
                    </li>
                    <li>
                      <strong>Diary Keeping</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date6"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel6"  className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu6"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown6" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Exercise</strong>
                  <ul>
                    <li>
                      <strong>Benefits of Exercise</strong>
                    </li>
                    <li>
                      <strong>
                        Pt. Exercise limits & ability to perform ADLs
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Types of Exercise & Location of Exercise Programs
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date7"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel7" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu7"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown7" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Complications of Diabetes Mellitus</strong>
                  <ul>
                    <li>
                      <strong>
                        Cardiovascular Events (esp. w/smoking, HTN, Cholesterol)
                      </strong>
                    </li>
                    <li>
                      <strong>Blindness</strong>
                    </li>
                    <li>
                      <strong>Infection of Limb or Loss</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date8" className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel8" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu8" className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register}  name="unknown8" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Prevention of Complications of Mellitus</strong>
                  <ul>
                    <li>
                      <strong>Personal Hygeiene (incl skin & footcare)</strong>
                    </li>
                    <li>
                      <strong>Benefit of Opthalmologic exam</strong>
                    </li>
                    <li>
                      <strong>Benefits of Regular Podiatry</strong>
                    </li>
                    <li>
                      <strong>Benefits of Annual Dental Exam</strong>
                    </li>
                    <li>
                      <strong>
                        Recognition of Signs & Symptoms of infection
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date9"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel9"  className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu9"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown9" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Managing Sick Days and Illness</strong>
                  <ul>
                    <li>
                      <strong>When to call a Nurse or Physician</strong>
                    </li>
                    <li>
                      <strong>Adjustment of Food & Medication to illness</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date10"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel10" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu10" className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown10" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Psychological Adjustment</strong>
                  <ul>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date11" className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel11" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu11"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown11" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Patient Responsibility in the Care of Diabetes</strong>
                  <ul>
                    <li>
                      <strong>
                        Importance of Compliance w/Diet & Medication
                      </strong>
                    </li>
                    <li>
                      <strong>Adjustment of Regular Follow-up</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date12" className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel12" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu12" className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown12" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Family Education</strong>
                  <ul>
                    <li>
                      <strong>
                        Signs & Symptoms of Hypoglycemia & Hyperglcemia
                      </strong>
                    </li>
                    <li>
                      <strong>Emergency treatment of Hyperglycemia</strong>
                    </li>
                    <li>
                      <strong>ADA Dietary Guidelines</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date13" className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel13"  className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu13"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown13" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Smoking</strong>
                  <ul>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date14" className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel14"  className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu14"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown14" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Miscellaneous</strong>
                  <ul>
                    <li>
                      <strong>
                        Spares & Acquisition of Diabetic Equip & Supplies
                      </strong>
                    </li>
                    <li>
                      <strong>Benefits & Repsonsibilities of care</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input ref={register} name="date15"  className="input is-small" type="date" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input ref={register} name="learnLevel15" className="input is-small" type="number" />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input ref={register} name="dmEdu15"  className="input is-small" type="text" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea ref={register} name="unknown15" className="textarea is-small"></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="field mt-4">
              <button className="button is-success is-small">Submit Form</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DiabetesMelitus;
