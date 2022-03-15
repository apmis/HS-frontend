import { useForm } from "react-hook-form";
const LaboratoryReportForm = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Laboratory Report</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">Name</label>
              <p className="control is-expanded">
                <input ref={register} name="name" className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Age</label>
                  <p className="control is-expanded">
                    <input ref={register} name="age" className="input is-small" type="number" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Sex</label>
                  <p className="control is-expanded">
                    <input ref={register} name="sex" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Date</label>
                  <div className="control">
                    <input ref={register} name="date" className="input is-small" type="date" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Specimen</label>
                  <p className="control is-expanded">
                    <input ref={register} name="specimen" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Provisional Diagnosis</label>
                  <p className="control is-expanded">
                    <input ref={register} name="provisionalDiag" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Bill To</label>
                  <div className="control">
                    <input ref={register} name="billTo" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Patient</label>
                  <p className="control is-expanded">
                    <input ref={register} name="patient" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Dr</label>
                  <div className="control">
                    <input ref={register} name="dr" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">HEAMATOLOGY</label>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">HB</label>
                  <p className="control is-expanded">
                    <input ref={register} name="hb" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">PCV</label>
                  <div className="control">
                    <input ref={register} name="pcv" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">WBC</label>
                  <div className="control">
                    <input ref={register} name="wbc" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">ESR</label>
                  <div className="control">
                    <input ref={register} name="esr" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Platelets</label>
                  <p className="control is-expanded">
                    <input ref={register} name="platelets" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Rectics</label>
                  <div className="control">
                    <input ref={register} name="rectics" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">RBC</label>
                  <div className="control">
                    <input ref={register} name="rbc" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">MCV</label>
                  <div className="control">
                    <input ref={register} name="mcv" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">MCHC</label>
                  <p className="control is-expanded">
                    <input ref={register} name="mchc" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">MCH</label>
                  <div className="control">
                    <input ref={register} name="mch" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Neutrophils</label>
                  <div className="control">
                    <input ref={register} name="neutrophils" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Lymphocytes</label>
                  <div className="control">
                    <input ref={register} name="lymphocytes" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Monocytes</label>
                  <p className="control is-expanded">
                    <input ref={register} name="monocytes" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Eosinophils</label>
                  <div className="control">
                    <input ref={register} name="eosinophils" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Basophils</label>
                  <div className="control">
                    <input ref={register} name="basophils" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Pro-Myelocyte</label>
                  <div className="control">
                    <input ref={register} name="proMyelocyte" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Meta-Myelocyte</label>
                  <p className="control is-expanded">
                    <input ref={register} name="metaMyelocyte" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Nucleated RBC</label>
                  <div className="control">
                    <input ref={register} name="nucleatedRbc" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Genotype</label>
                  <div className="control">
                    <input ref={register} name="genotype" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Blood Group</label>
                  <div className="control">
                    <input ref={register} name="bldGroup" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">SEROLOGY</label>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">HBsAG</label>
                  <p className="control is-expanded">
                    <input ref={register} name="hbsag" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">HCV</label>
                  <div className="control">
                    <input ref={register} name="hcv" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">VDRL</label>
                  <div className="control">
                    <input ref={register} name="vdrl" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">RPHA</label>
                  <div className="control">
                    <input ref={register} name="rpha" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">COOMBS</label>
                  <p className="control is-expanded">
                    <input ref={register} name="coombs" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">A.S.O Titre</label>
                  <div className="control">
                    <input ref={register} name="asoTitre" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">SLE</label>
                  <div className="control">
                    <input ref={register} name="sle" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">R.A Factor</label>
                  <div className="control">
                    <input ref={register} name="raFactor" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">B-HCG</label>
                  <p className="control is-expanded">
                    <input ref={register} name="bHcg" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">MANTOUX</label>
                  <div className="control">
                    <input ref={register} name="mantoux" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Blood Preg. Test</label>
                  <div className="control">
                    <input ref={register} name="bldPregTest" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">XYZ</label>
                  <div className="control">
                    <input ref={register} name="xyz" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label className="label is-small">BIOCHEMISTRY</label>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Glucose (Fasting)</label>
                  <p className="control is-expanded">
                    <input ref={register} name="glucoseFasting" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Glucose (Random)</label>
                  <div className="control">
                    <input ref={register} name="glucoseRandom" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Urea</label>
                  <div className="control">
                    <input ref={register} name="urea" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Creatinine</label>
                  <div className="control">
                    <input ref={register} name="creatinine" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Uric Acid</label>
                  <p className="control is-expanded">
                    <input ref={register} name="uricAcid" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Sodium</label>
                  <div className="control">
                    <input ref={register} name="sodium" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Potassium</label>
                  <div className="control">
                    <input ref={register} name="potassium" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Bicarbonate</label>
                  <div className="control">
                    <input ref={register} name="bicarbonate" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Chloride</label>
                  <p className="control is-expanded">
                    <input ref={register} name="chloride" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Total Protein</label>
                  <div className="control">
                    <input ref={register} name="totalProtein" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Albumin</label>
                  <div className="control">
                    <input ref={register} name="albumin" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">T. Bilirubin</label>
                  <div className="control">
                    <input ref={register} name="tBilirubin" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">D.Bilirubin</label>
                  <p className="control is-expanded">
                    <input ref={register} name="dBilirubin" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Cholesterol</label>
                  <div className="control">
                    <input ref={register} name="cholesterol" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Triglyceride</label>
                  <div className="control">
                    <input ref={register} name="triglyceride" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Phos</label>
                  <div className="control">
                    <input ref={register} name="phos" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Calcium</label>
                  <p className="control is-expanded">
                    <input ref={register} name="calcium" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">SGOT</label>
                  <div className="control">
                    <input ref={register} name="sgot" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">SGPT</label>
                  <div className="control">
                    <input ref={register} name="sgpt" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">OGTT</label>
                  <div className="control">
                    <input ref={register} name="ogtt" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Alk Phos</label>
                  <p className="control is-expanded">
                    <input ref={register} name="alkPhos" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Acid Phos</label>
                  <div className="control">
                    <input ref={register} name="acidPhos" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">ADH</label>
                  <div className="control">
                    <input ref={register} name="adh" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">APK</label>
                  <div className="control">
                    <input ref={register} name="apk" className="input is-small" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Amylase</label>
                  <p className="control is-expanded">
                    <input ref={register} name="amylase" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">MICROBIOLOGY</label>
            <label class="checkbox me-3">
              <input ref={register} name="urinalysisOrMicro" type="checkbox" />
              <span className="ms-2 is-small">Urinanalysis/Microscope</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="stoolAnalysis" type="checkbox" />
              <span className="ms-2 is-small">Stool Analysis</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="stoolOccult" type="checkbox" />
              <span className="ms-2 is-small">Stool Occult</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="semenAnalysis" type="checkbox" />
              <span className="ms-2 is-small">Semen Analysis</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="gramStain" type="checkbox" />
              <span className="ms-2 is-small">Gram Stain</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="znStain" type="checkbox" />
              <span className="ms-2 is-small">ZN Stain</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="mantouxTest" type="checkbox" />
              <span className="ms-2 is-small">Mantoux Test</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="fungalStudies" type="checkbox" />
              <span className="ms-2 is-small">Fungal Studies</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="urine" type="checkbox" />
              <span className="ms-2 is-small">M/C/S Urine</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="throatSwab" type="checkbox" />
              <span className="ms-2 is-small">M/C/S Throat Swab</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="aspirateAndDischarge" type="checkbox" />
              <span className="ms-2 is-small">C/S/PUS/Aspirate/Discharge</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="woundSwab" type="checkbox" />
              <span className="ms-2 is-small">C/S Wound Swab</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="semen" type="checkbox" />
              <span className="ms-2 is-small">M/C/S Semen</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="fluid" type="checkbox" />
              <span className="ms-2 is-small">M/C/S Fluid</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="stool2" type="checkbox" />
              <span className="ms-2 is-small">M/C/S Stool</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="endocerviclSwab" type="checkbox" />
              <span className="ms-2 is-small">C/S Endocervical Swab</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="hvs" type="checkbox" />
              <span className="ms-2 is-small">M/C/S HVS</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="sputum" type="checkbox" />
              <span className="ms-2 is-small">M/C/S Sputum</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="csBld" type="checkbox" />
              <span className="ms-2 is-small">C/S Blood</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="microfilariaSkin" type="checkbox" />
              <span className="ms-2 is-small">Microfilaria-Skin Snip</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="otherSwab" type="checkbox" />
              <span className="ms-2 is-small">Other Swab (Specify)</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="faecalOccultBld" type="checkbox" />
              <span className="ms-2 is-small">Faecal Occult Blood</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="salmoOrshigella" type="checkbox" />
              <span className="ms-2 is-small">Salmonella/Shigella</span>
            </label>
          </div>
          <label className="label is-small">URINE</label>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Macroscopy</label>
                  <p className="control is-expanded">
                    <input ref={register} name="macroscopy" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Microscopy</label>
                  <p className="control is-expanded">
                    <input ref={register} name="microscopy" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Pus Cells/hof</label>
                  <p className="control is-expanded">
                    <input ref={register} name="pusCellsOrhof" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Rbs/hpf</label>
                  <p className="control is-expanded">
                    <input ref={register} name="rbsOrHpf" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Yeast Cells</label>
                  <p className="control is-expanded">
                    <input ref={register} name="yeastCells" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Bacteria</label>
                  <p className="control is-expanded">
                    <input ref={register} name="bacteria" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Gasts</label>
                  <p className="control is-expanded">
                    <input ref={register} name="gasts" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Epith Cells</label>
                  <p className="control is-expanded">
                    <input ref={register} name="epithCells" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Crystals</label>
                  <p className="control is-expanded">
                    <input ref={register} name="crystals" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">T.V</label>
                  <p className="control is-expanded">
                    <input ref={register} name="tv" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Culture Yielded</label>
            <div className="control">
              <textarea ref={register} name="cultureYielded" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Malaria Parasite</label>
            <div className="control">
              <textarea ref={register} name="malariaParasite" className="textarea is-small"></textarea>
            </div>
          </div>
          <label className="label is-small">URINALYSIS</label>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Appearance</label>
                  <p className="control is-expanded">
                    <input ref={register} name="appearance" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Color</label>
                  <p className="control is-expanded">
                    <input ref={register} name="color" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">PH</label>
                  <p className="control is-expanded">
                    <input ref={register} name="ph" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Protein</label>
                  <p className="control is-expanded">
                    <input ref={register} name="protein" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Sugar</label>
                  <p className="control is-expanded">
                    <input ref={register} name="sugar" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Ketones</label>
                  <p className="control is-expanded">
                    <input ref={register} name="ketones" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Blood</label>
                  <p className="control is-expanded">
                    <input ref={register} name="blood" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Billirubin</label>
                  <p className="control is-expanded">
                    <input ref={register} name="billirubin" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">S.G</label>
                  <p className="control is-expanded">
                    <input ref={register} name="sg" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Nitrite</label>
                  <p className="control is-expanded">
                    <input ref={register} name="nitrite" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Urobilin</label>
                  <p className="control is-expanded">
                    <input ref={register} name="urobilin" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Urobilinogen</label>
                  <p className="control is-expanded">
                    <input ref={register} name="urobilinogin" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Leucocyte</label>
                  <p className="control is-expanded">
                    <input ref={register} name="leucocyte" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">STOOL</label>
          <div className="field">
            <label className="label is-small">Macro</label>
            <div className="control">
              <textarea ref={register} name="macro" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Micro</label>
            <div className="control">
              <textarea ref={register} name="micro" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Culture</label>
            <div className="control">
              <textarea ref={register} name="culture2" className="textarea is-small"></textarea>
            </div>
          </div>
          <label className="label is-small">HVS CULTURE</label>
          <label className="label is-small mt-3">Wet Prep</label>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Pus cells' hpf</label>
                  <p className="control is-expanded">
                    <input ref={register} name="pusCells" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Rbcs/hpf</label>
                  <p className="control is-expanded">
                    <input ref={register} name="rbcsOrHpf" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Yeast Cells</label>
                  <p className="control is-expanded">
                    <input ref={register} name="yeastCells" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Bacteria</label>
                  <p className="control is-expanded">
                    <input ref={register} name="bacteria2" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Casts</label>
                  <p className="control is-expanded">
                    <input ref={register} name="casts" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Epith Cells</label>
                  <p className="control is-expanded">
                    <input ref={register} name="epithCells2" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Crystals</label>
                  <p className="control is-expanded">
                    <input ref={register} name="crystals2" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">T.V</label>
                  <p className="control is-expanded">
                    <input ref={register} name="tv2" className="input is-small" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LaboratoryReportForm;
