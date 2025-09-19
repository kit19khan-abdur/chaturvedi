import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import MultiSelect from "./Multiselect";

const StepFour = ({ setRequiredFields, requiredFields, showErrors }) => {
  const [stepData, setStepData] = useState({
    newTPPolicyEndDate: "",
    ncbNewPolicy: "",
    brokerAgencyName: "",
    policyNumber: "",
    insurerName: "",
    policyIssueDate: "",
    idv: "",
    paCover: "No",
    odAmount: 0,
    tpAmount: 0,
    netTotal: 0,
    gstAmount: 0,
    totalPremium: 0,
    breakingCharge: 0,
    waiverAmount: 0,
    netPayable: 0,
    pacertificateNumber: "",
    paStartDate: "",
    paCoverAmount: "",
    paEndDate: "",
    newTPPolicyStartDate: "",
    newODPolicyStartDate: "",
    newODPolicyEndDate: "",
    addons: [],
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("stepData")) || {};
    const cleaned = Object.fromEntries(
      Object.entries(stored).filter(([_, v]) => v !== "0")
    );
    localStorage.setItem("stepData", JSON.stringify(cleaned));
    setStepData(prev => ({ ...prev, ...cleaned }));
  }, []);

  const CheckboxOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null} // handled by react-select internally
          style={{ marginRight: 8 }}
        />
        <label>{props.label}</label>
      </components.Option>
    );
  };


  const addonOptions = [
    { value: "select_all", label: "Select All" },
    { value: "Zero Depreciation/Nil Depreciation Cover", label: "Zero Depreciation/Nil Depreciation Cover" },
    { value: "Engine Protection Cover", label: "Engine Protection Cover" },
    { value: "No Claim Bonus (NCB) Protection Cover", label: "No Claim Bonus (NCB) Protection Cover" },
    { value: "Roadside Assistance Cover", label: "Roadside Assistance Cover" },
    { value: "Return to Invoice Cover", label: "Return to Invoice Cover" },
    { value: "Daily Allowance Cover", label: "Daily Allowance Cover" },
    { value: "Passenger Cover", label: "Passenger Cover" },
    { value: "Consumables Cover", label: "Consumables Cover" },
    { value: "Tyre Protection Cover", label: "Tyre Protection Cover" },
    { value: "Key Loss Protection Cover", label: "Key Loss Protection Cover" },
    { value: "Personal Belongings Cover", label: "Personal Belongings Cover" },
    { value: "Personal Accident Cover", label: "Personal Accident Cover" },
    { value: "Legal Aid", label: "Legal Aid" },
    { value: "Outstation Emergency Cover", label: "Outstation Emergency Cover" }
  ];

  const allRealOptions = addonOptions.filter(o => o.value !== "select_all");

  const handleAddonsChange = (selected) => {
    const allRealOptions = addonOptions.filter(o => o.value !== "select_all");
    // selected can be null if everything is deselected
    if (!selected || selected.length === 0) {
      const updated = { ...stepData, addons: [] };
      setStepData(updated);
      localStorage.setItem("stepData", JSON.stringify(updated));
      return;
    }

    const selectedValues = selected.map(s => s.value);

    // if user clicked "Select All" we decide what to do
    if (selectedValues.includes("select_all")) {
      // if we don't already have all, then select all
      if (stepData.addons.length !== allRealOptions.length) {
        const allValues = allRealOptions.map(o => o.value);
        const updated = { ...stepData, addons: allValues };
        setStepData(updated);
        localStorage.setItem("stepData", JSON.stringify(updated));
        return;
      } else {
        // deselect all
        const updated = { ...stepData, addons: [] };
        setStepData(updated);
        localStorage.setItem("stepData", JSON.stringify(updated));
        return;
      }
    }

    // normal multi-select (no select_all clicked)
    const valuesWithoutSelectAll = selectedValues.filter(v => v !== "select_all");
    const updated = { ...stepData, addons: valuesWithoutSelectAll };
    setStepData(updated);
    localStorage.setItem("stepData", JSON.stringify(updated));
  };


  const selectedValues = [
    ...(stepData.addons.length === allRealOptions.length
      ? [{ value: "select_all", label: "Select All" }]
      : []),
    ...addonOptions.filter(opt => stepData.addons.includes(opt.value))
  ];


  // Build the value array for react-select:


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...stepData, [name]: value };

    if (value === "0") {
      const existing = JSON.parse(localStorage.getItem("stepData")) || {};
      delete existing[name];
      localStorage.setItem("stepData", JSON.stringify(existing));
      setStepData(updated); // still update the state
      return;
    }
    setStepData(updated);
    localStorage.setItem("stepData", JSON.stringify(updated));
  };

  useEffect(() => {
    document.title = "Chaturvedi Motors Form || Step 4";

  }, []);

  // useEffect(() => {
  //   let fields = []
  //   // Optionally define required fields
  //   if (stepData.paCover === "Yes") {
  //     fields.push("pacertificateNumber", "paStartDate", "paEndDate", "paCoverAmount",);
  //   }
  //   if (stepData?.policyType === "OD only Policy") {
  //     fields.push("newODPolicyEndDate", "newODPolicyStartDate")
  //   }
  //   fields.push(
  //     "newTPPolicyStartDate",
  //     "newTPPolicyEndDate",
  //     "ncbNewPolicy",
  //     "brokerAgencyName",
  //     "policyNumber",
  //     "insurerName",
  //     "policyIssueDate",
  //     "idv",
  //     "odAmount",
  //     "tpAmount",
  //     "gstAmount",


  //   );
  //   setRequiredFields(fields);
  // }, [])

  useEffect(() => {
    let fields = [];

    if (stepData.paCover === "Yes") {
      fields.push("pacertificateNumber", "paStartDate", "paEndDate", "paCoverAmount");
    }

    if (stepData?.policyType === "OD only Policy") {
      fields.push("newODPolicyEndDate", "newODPolicyStartDate");
    }

    fields.push(
      "newTPPolicyStartDate",
      "newTPPolicyEndDate",
      "ncbNewPolicy",
      "brokerAgencyName",
      "policyNumber",
      "insurerName",
      "policyIssueDate",
      "idv",
      "odAmount",
      "tpAmount",
      "gstAmount"
    );

    // ✅ Add this check:
    if (stepData.addons.length === 0) {
      fields.push("addons");
    }

    setRequiredFields(fields);
  }, [stepData.paCover, stepData.policyType, stepData.addons]); // include addons in deps



  return (
    <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
      {stepData?.policyType === "OD only Policy" && (<div>
        <label>New OD Policy Start Date <span className="text-[#f00]">*</span></label>
        <input type="date" name="newODPolicyStartDate" value={stepData.newODPolicyStartDate} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.newODPolicyStartDate === "" && !stepData?.newODPolicyStartDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.newODPolicyStartDate === "" && !stepData?.newODPolicyStartDate && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>)}
      {stepData?.policyType === "OD only Policy" && (<div>
        <label>New OD Policy End Date <span className="text-[#f00]">*</span></label>
        <input type="date" name="newODPolicyEndDate" value={stepData.newODPolicyEndDate} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.newODPolicyEndDate === "" && !stepData?.newODPolicyEndDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.newODPolicyEndDate === "" && !stepData?.newODPolicyEndDate && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>)}
      <div>
        <label>New TP Policy Start Date <span className="text-[#f00]">*</span></label>
        <input type="date" name="newTPPolicyStartDate" value={stepData.newTPPolicyStartDate} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.newTPPolicyStartDate === "" && !stepData?.newTPPolicyStartDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.newTPPolicyStartDate === "" && !stepData?.newTPPolicyStartDate && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>New TP Policy End Date <span className="text-[#f00]">*</span></label>
        <input type="date" name="newTPPolicyEndDate" value={stepData.newTPPolicyEndDate} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.newTPPolicyEndDate === "" && !stepData?.newTPPolicyEndDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.newTPPolicyEndDate === "" && !stepData?.newTPPolicyEndDate && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>NCB For New Policy <span className="text-[#f00]">*</span></label>
        <select name="ncbNewPolicy" value={stepData.ncbNewPolicy} onChange={handleChange}
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.ncbNewPolicy === "" && !stepData?.ncbNewPolicy ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
          <option value="">Select</option>
          <option value="0">0%</option>
          <option value="20">20%</option>
          <option value="25">25%</option>
          <option value="35">35%</option>
          <option value="45">45%</option>
          <option value="50">50%</option>
        </select>
        {showErrors && stepData?.ncbNewPolicy === "" && !stepData?.ncbNewPolicy && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>Broker or Agency Name <span className="text-[#f00]">*</span></label>
        <select name="brokerAgencyName" value={stepData.brokerAgencyName} onChange={handleChange}
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.brokerAgencyName === "" && !stepData?.brokerAgencyName ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
          <option value="">Select</option>
          <option value="PROBUS - Chitra Chaturvedi">PROBUS - Chitra Chaturvedi</option>
          <option value="UNITED INDIA - Satya Prakash">UNITED INDIA - Satya Prakash</option>
          <option value="POLICY BOSS - Sapna">POLICY BOSS - Sapna</option>
          <option value="HOPE BOX - Satya Prakash">HOPE BOX - Satya Prakash</option>
          <option value="TURTLE MINT - Yatendra Kumar">TURTLE MINT - Yatendra Kumar</option>
          <option value="UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar">UNIVERSAL SOMPO GENERAL INSURANCE - Yatendra Kumar</option>
          <option value="RELIANCE GENERAL INSURANCE - Khem Chand">RELIANCE GENERAL INSURANCE - Khem Chand</option>
          <option value="PB PARTNER - Ravi Shankar">PB PARTNER - Ravi Shankar</option>
          <option value="PB PARTNER - Shiv Kumar">PB PARTNER - Shiv Kumar</option>
          <option value="PB PARTNER - Pavan Chaturvedi">PB PARTNER - Pavan Chaturvedi</option>
          <option value="PB PARTNER - Dheeraj Kumar">PB PARTNER - Dheeraj Kumar</option>
          <option value="GIRNAR - Rekha">GIRNAR - Rekha</option>
          <option value="GIRNAR - Satya Prakash">GIRNAR - Satya Prakash</option>
          <option value="GOODS INSURANCE BROKRAGE">GOODS INSURANCE BROKRAGE</option>
          <option value="TATA INSURANCE BROKRAGE - Chitra Chaturvedi">TATA INSURANCE BROKRAGE - Chitra Chaturvedi</option>
        </select>
        {showErrors && stepData?.brokerAgencyName === "" && !stepData?.brokerAgencyName && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>Policy Number <span className="text-[#f00]">*</span></label>
        <input type="text" name="policyNumber" value={stepData.policyNumber} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.policyNumber === "" && !stepData?.policyNumber ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.policyNumber === "" && !stepData?.policyNumber && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>Insurer Name <span className="text-[#f00]">*</span> </label>
        <select name="insurerName" value={stepData.insurerName} onChange={handleChange}
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.insurerName === "" && !stepData?.insurerName ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
          <option value="">Select</option>
          <option value="Acko General Insurance Limited">Acko General Insurance Limited</option>
          <option value="Bajaj Allianz General Insurance Company Limited">Bajaj Allianz General Insurance Company Limited</option>
          <option value="Cholamandalam MS General Insurance Company Limited">Cholamandalam MS General Insurance Company Limited</option>
          <option value="Future Generali India Insurance Company Limited">Future Generali India Insurance Company Limited</option>
          <option value="Go Digit General Insurance Limited">Go Digit General Insurance Limited</option>
          <option value="HDFC ERGO General Insurance Company Limited">HDFC ERGO General Insurance Company Limited</option>
          <option value="ICICI LOMBARD General Insurance Company Limited">ICICI LOMBARD General Insurance Company Limited</option>
          <option value="IFFCO TOKIO General Insurance Company Limited">IFFCO TOKIO General Insurance Company Limited</option>
          <option value="Zurich Kotak General Insurance Company">Zurich Kotak General Insurance Company</option>
          <option value="Liberty General Insurance Limited">Liberty General Insurance Limited</option>
          <option value="Magma General Insurance Limited">Magma General Insurance Limited</option>
          <option value="National Insurance Company Limited">National Insurance Company Limited</option>
          <option value="Raheja QBE General Insurance Co. Ltd.">Raheja QBE General Insurance Co. Ltd.</option>
          <option value="Reliance General Insurance Company Limited">Reliance General Insurance Company Limited</option>
          <option value="Royal Sundaram General Insurance Company Limited">Royal Sundaram General Insurance Company Limited</option>
          <option value="SBI General Insurance Company Limited">SBI General Insurance Company Limited</option>
          <option value="Shriram General Insurance Company Limited">Shriram General Insurance Company Limited</option>
          <option value="Tata AIG General Insurance Company Limited">Tata AIG General Insurance Company Limited</option>
          <option value="The New India Assurance Company Limited">The New India Assurance Company Limited</option>
          <option value="The Oriental Insurance Company Limited">The Oriental Insurance Company Limited</option>
          <option value="United India Insurance Company Limited">United India Insurance Company Limited</option>
          <option value="Universal Sompo General Insurance Company Limited">Universal Sompo General Insurance Company Limited</option>
          <option value="Zuno General Insurance Ltd">Zuno General Insurance Ltd</option>
          <option value="Navi General Insurance Limited">Navi General Insurance Limited</option>
          {/* Add more insurers as needed */}
        </select>
        {showErrors && stepData?.insurerName === "" && !stepData?.insurerName && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>Policy Issue Date <span className="text-[#f00]">*</span></label>
        <input type="date" name="policyIssueDate" value={stepData.policyIssueDate} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.policyIssueDate === "" && !stepData?.policyIssueDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.policyIssueDate === "" && !stepData?.policyIssueDate && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>IDV (Insured Declared Value) <span className="text-[#f00]">*</span></label>
        <input type="text" name="idv" value={stepData.idv} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.idv === "" && !stepData?.idv ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.idv === "" && !stepData?.idv && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>PA Cover</label>
        <select name="paCover" value={stepData.paCover} onChange={handleChange}
          className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded">
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      {stepData.paCover === "Yes" && (<>
        <div>
          <label>PA Certificate Number <span className="text-[#f00]">*</span></label>
          <input name="pacertificateNumber" value={stepData.pacertificateNumber} onChange={handleChange}
            className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.pacertificateNumber === "" && !stepData?.pacertificateNumber ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
          {showErrors && stepData?.pacertificateNumber === "" && !stepData?.pacertificateNumber && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
        <div>
          <label>PA Start Date <span className="text-[#f00]">*</span></label>
          <input name="paStartDate" type="date" value={stepData.paStartDate} onChange={handleChange}
            className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.paStartDate === "" && !stepData?.paStartDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
          {showErrors && stepData?.paStartDate === "" && !stepData?.paStartDate && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
        <div>
          <label>PA End Date <span className="text-[#f00]">*</span></label>
          <input name="paEndDate" type="date" value={stepData.paEndDate} onChange={handleChange}
            className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.paEndDate === "" && !stepData?.paEndDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
          {showErrors && stepData?.paEndDate === "" && !stepData?.paEndDate && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
        <div>
          <label>PA Cover Amount <span className="text-[#f00]">*</span></label>
          <input name="paCoverAmount" type="text" value={stepData.paCoverAmount} onChange={handleChange}
            className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.paCoverAmount === "" && !stepData?.paCoverAmount ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
          {showErrors && stepData?.paCoverAmount === "" && !stepData?.paCoverAmount && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
      </>)}
      <div>
        <label>
          Addon Covers <span className="text-[#f00]">*</span>
        </label>
        <Select
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CheckboxOption }}
          options={addonOptions}
          value={selectedValues}
          onChange={handleAddonsChange}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor:
                showErrors && stepData?.addons.length === 0
                  ? 'red'
                  : '#e6e6e6',            // default border
              boxShadow: 'none',            // remove react-select’s blue shadow
              '&:hover': {
                borderColor:
                  showErrors && stepData?.addons.length === 0
                    ? 'red'
                    : '#ccc',
              },
              borderWidth: '1px',
            }),
            option: (base, state) => ({
              ...base,
              padding: '8px 12px',   // inside
              marginBottom: '4px',   // gap
            }),
            multiValue: (base) => ({
              ...base,
              margin: '2px', // spacing between selected chips
            })
          }}
          classNamePrefix="react-select"
        />

        {showErrors && stepData.addons.length === 0 && (
          <p className="text-sm text-red-500 mt-1">Please select at least one</p>
        )}
      </div>
      <div>
        <label>OD Amount <span className="text-[#f00]">*</span></label>
        <input type="text" name="odAmount" value={stepData.odAmount} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.odAmount === "" && !stepData?.odAmount ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.odAmount === "" && !stepData?.odAmount && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>TP Amount <span className="text-[#f00]">*</span></label>
        <input type="text" name="tpAmount" value={stepData.tpAmount} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.tpAmount === "" && !stepData?.tpAmount ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.tpAmount === "" && !stepData?.tpAmount && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>Net Total (OD + TP) <span className="text-[#f00]">*</span></label>
        <input type="text" name="netTotal" value={(Number(stepData.odAmount || 0) + Number(stepData.tpAmount || Number(0))) || 0}
          className="w-full border px-4 py-2 border-[#e6e6e6] rounded" />
      </div>
      <div>
        <label>GST Amount <span className="text-[#f00]">*</span></label>
        <input type="text" name="gstAmount" value={stepData.gstAmount} onChange={handleChange}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.gstAmount === "" && !stepData?.gstAmount ? "border-red-500" : "border-[#e6e6e6]"} rounded`} />
        {showErrors && stepData?.gstAmount === "" && !stepData?.gstAmount && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>
      <div>
        <label>Total Premium with GST <span className="text-[#f00]">*</span></label>
        <input type="text" name="totalPremium" value={(Number(stepData.gstAmount || 0) + Number(stepData.odAmount || 0) + Number(stepData.tpAmount || 0)) || Number(0)}
          className="w-full border px-4 py-2 border-[#e6e6e6] rounded" />
      </div>
      <div>
        <label>Breaking Charge <span className="text-[#f00]">*</span></label>
        <input type="text" name="breakingCharge" value={stepData.breakingCharge} onChange={handleChange}
          className={`w-full border px-4 py-2  rounded`} />

      </div>
      <div>
        <label>Waiver Amount</label>
        <input type="text" name="waiverAmount" value={stepData.waiverAmount} onChange={handleChange}
          className="w-full border px-4 py-2 border-[#e6e6e6] rounded" />
      </div>
      <div>
        <label>Net Payable <span className="text-[#f00]">*</span></label>
        <input type="text" name="netPayable" value={(Number(stepData.paCoverAmount) + Number(stepData.gstAmount || 0) + Number(stepData.odAmount || 0) + Number(stepData.tpAmount || 0) + Number(stepData.breakingCharge || 0) - Number(stepData.waiverAmount || 0)) || Number(0)}
          className="w-full border px-4 py-2 border-[#e6e6e6] rounded" />
      </div>
    </div>
  );
};

export default StepFour;
