const BinCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Bin Card</p>
      </div>
      <div className="card-content vscrollable">
        <div className="field-body">
          <div className="field">
            <label className="label is-small">Item Description</label>
            <div className="control">
              <textarea className="textarea is-small"></textarea>
            </div>
          </div>
        </div>
        <div className="field-body mt-3">
          <div className="field">
            <label className="label is-small">Date</label>
            <div className="control">
              <input className="input is-small" type="date" />
            </div>
          </div>
        </div>
        <div className="field-body mt-3">
          <div className="field">
            <label className="label is-small">Supplier</label>
            <p className="control is-expanded">
              <input className="input is-small" type="text" />
            </p>
          </div>
        </div>
        <div className="grid mt-3">
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Invoice No</label>
              <p className="control is-expanded">
                <input className="input is-small" type="number" />
              </p>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Quantity Received</label>
              <p className="control is-expanded">
                <input className="input is-small" type="number" />
              </p>
            </div>
          </div>
        </div>
        <div className="grid mt-3">
          <div className="field w-100">
            <label className="label is-small">Quantity Issued</label>
            <p className="control">
              <input className="input is-small" type="number" />
            </p>
          </div>
          <div className="field w-100">
            <label className="label is-small">Balance</label>
            <p className="control">
              <input className="input is-small" type="number" />
            </p>
          </div>
        </div>
        <div className="grid mt-3">
          <div className="field-body w-100">
            <div className="field">
              <label className="label is-small">Batch Date</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
          <div className="field-body w-100">
            <div className="field w-100">
              <label className="label is-small">Expiry Date</label>
              <div className="control">
                <input className="input is-small" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div className="field w-100 mt-3">
          <label className="label is-small">Remark</label>
          <p className="control">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field w-100 mt-3">
          <label className="label is-small">Sign</label>
          <p className="control">
            <input className="input is-small" type="text" />
          </p>
        </div>
        <div className="field mt-4">
          <button className="button is-success is-small">Submit Form</button>
        </div>
      </div>
    </div>
  );
};

export default BinCard;
