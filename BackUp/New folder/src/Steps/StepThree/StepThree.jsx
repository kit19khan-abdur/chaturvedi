import React, { useEffect, useState } from "react";
import "./StepThree.css";
import Select from "react-select";

const StepThree = ({setRequiredFields, requiredFields, showErrors }) => {
  const [isPreviousPolis, setIsPreviousPolis] = useState("No")
  const [isClaim, setIsClaim] = useState("Yes")
  const [stepData, setStepData] = useState({
    previousPolicy: "",
    policyType: "",
    insurerName: "",
    policyNumber: "",
    prevPolicyType: "",
    odPolicyStartDate: "",
    odPolicyEndDate: "",
    ncbNewPolicy: "",
    tpPolicyStartDate: "",
    tpPolicyEndDate: "",
    prevoiusPolicyStartDate: "",
    prevoiusPolicyEndDate: "",
  })

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("stepData"));
    if (storedData) {
      setStepData(storedData);
    }
  }, []);


  const handleChangeStep = (e) => {
    const { name, value } = e.target;
    const temp = JSON.parse(localStorage.getItem("stepData")) || {};

    const updated = { ...temp, [name]: value };
    setStepData(updated);
    localStorage.setItem("stepData", JSON.stringify(updated));
  };


  useEffect(() => {
    let fields = [];

    if(stepData?.proposalType === "New"){
      setRequiredFields([])
      return;
    }

    if (stepData?.prevPolicyType === "Yes") {
      if (stepData?.prevPolicyType === "OD Policy") {
        if (stepData?.previousPolicy === "No") {
          fields.push("ncbNewPolicy")
        }
        fields.push("insurerName", "policyNumber", "odPolicyStartDate", "odPolicyEndDate")
       } else if (stepData?.prevPolicyType === "TP Policy") {
        fields.push("insurerName", "policyNumber", "tpPolicyStartDate", "tpPolicyEndDate")
       } else if (stepData?.prevPolicyType === "Package Policy") {
        fields.push("insurerName", "policyNumber", "prevoiusPolicyStartDate", "prevoiusPolicyEndDate")
      }
      fields.push("policyType","prevPolicyType",);
    }

    setRequiredFields(fields);
  }, [stepData?.previousPolicy, stepData?.prevPolicyType, stepData?.previousPolicy, stepData?.proposalType]);

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step3`
  }, [])

  return (
    <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
   {stepData?.proposalType === "New" ? <></> : (   <>
      <div>
        <label className="block font-medium">Previous Policy Available </label>
        <select name="previousPolicy" id="previousPolicy"
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded `}
          value={stepData?.previousPolicy || ""}
          onChange={(e) => {
            setIsPreviousPolis(e.target.value);
            handleChangeStep(e);
          }}

        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
  
      </div>
      {stepData?.previousPolicy === "Yes" && (<>
        <div>
          <label className="block font-medium">Previous Policy Type <span className="text-[#f00]">*</span></label>
          <select id="prevPolicyType"
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.prevPolicyType === "" ? "border-red-500" : "border-[#e6e6e6]"}`}
            name="prevPolicyType"
            value={stepData?.prevPolicyType}
            onChange={handleChangeStep}
          >

            {(stepData?.policyType === "TP Only Policy" || stepData?.policyType === "OD only Policy") && (<>
              <option value="">Select Policy</option>
              <option value="OD only Policy">OD Policy</option>
              <option value="TP only Policy">TP Policy</option>
              <option value="Package Policy">Package Policy</option></>)}
            {stepData?.policyType === "Package Policy" && (<>
              <option value="">Select Policy</option>
              <option value="OD Policy">OD Policy</option>
              <option value="Package Policy">Package Policy</option></>)}
          </select>
           {showErrors && stepData?.prevPolicyType === "" && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
        </div>
        {stepData?.prevPolicyType != "" && (<div>
          <label className="block font-medium">Previous Insurer <span className="text-[#f00]">*</span></label>
          <select id="insurerName"
            className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.insurerName === "" ? "border-red-500" : "border-[#e6e6e6]"}`}
            name="insurerName"
            value={stepData?.insurerName} 
            onChange={handleChangeStep}
          >
            <option value="Acko General Insurance Limited">Acko General Insurance Limited</option>
            <option value="Bajaj Allianz General Insurance Company Limited" selected="">Bajaj Allianz General Insurance Company Limited</option>
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
          </select>
          {showErrors && stepData?.insurerName === "" && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
        </div>)}
       {stepData?.prevPolicyType != "" && ( <div>
          <label className="block font-medium">Policy Number <span className="text-[#f00]">*</span></label>
          <input
            type="text"
            name="policyNumber"
            value={stepData?.policyNumber}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.policyNumber === "" ? "border-red-500" : "border-[#e6e6e6]"}`}
          />
           {showErrors && stepData?.policyNumber === "" && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
        </div>)}
        {stepData?.prevPolicyType === "OD Policy" && (<><div>
          <label className="block font-medium">OD Policy Start Date <span className="text-[#f00]">*</span></label>
          <input
            type="date"
            name="odPolicyStartDate"
            value={stepData?.odPolicyStartDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.odPolicyStartDate === "" || !stepData?.odPolicyStartDate ? "border-red-500" : "border-[#e6e6e6]"}`}
          />
           {showErrors && stepData?.odPolicyStartDate === "" ||  !stepData?.odPolicyStartDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
        </div>
          <div>
            <label className="block font-medium">OD Policy End Date <span className="text-[#f00]">*</span></label>
            <input
              type="date"
              name="odPolicyEndDate"
              value={stepData?.odPolicyEndDate}
              onChange={handleChangeStep}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.odPolicyEndDate === "" || !stepData?.odPolicyEndDate ? "border-red-500" : "border-[#e6e6e6]"}`}
            />
               {showErrors && stepData?.odPolicyEndDate === "" ||  !stepData?.odPolicyEndDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div></>)}

        {stepData?.prevPolicyType === "OD Policy" && (<><div>
          <label className="block font-medium">Any Claim? </label>
          <select name="anyClaim" id="anyClaim"
            value={stepData?.anyClaim || isClaim}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
            onChange={(e) => setIsClaim(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
          {isClaim === "No" && (<div>
            <label className="block font-medium">NCB % <span className="text-[#f00]">*</span></label>
            <select name="ncbNewPolicy" id="previousPolicy"
              className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
              value={stepData?.ncbNewPolicy || "0%"}
              onChange={handleChangeStep}
            >
              <option value="0%">0%</option>
              <option value="20%">20%</option>
              <option value="25%">25%</option>
              <option value="35%">35%</option>
              <option value="45%" selected="">45%</option>
              <option value="50%">50%</option>
            </select>
          </div>)}
        </>)}
        {stepData?.prevPolicyType === "TP Policy" && (<><div>
          <label className="block font-medium">TP Policy Start Date <span className="text-[#f00]">*</span></label>
          <input
            type="date"
            name="tpPolicyStartDate"
            value={stepData?.tpPolicyStartDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.tpPolicyStartDate === "" ||  !stepData?.tpPolicyStartDate ? "border-red-500" : "border-[#e6e6e6]"}`}
          />
           {showErrors && stepData?.tpPolicyStartDate === "" ||  !stepData?.tpPolicyStartDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
        </div>
          <div>
            <label className="block font-medium">TP Policy End Date <span className="text-[#f00]">*</span></label>
            <input
              type="date"
              name="tpPolicyEndDate"
              value={stepData?.tpPolicyEndDate}
              onChange={handleChangeStep}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.tpPolicyEndDate === "" ||  !stepData?.tpPolicyEndDate ? "border-red-500" : "border-[#e6e6e6]"}`}
            />
            {showErrors && stepData?.tpPolicyEndDate === "" ||  !stepData?.tpPolicyEndDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div></>)}
        {stepData?.prevPolicyType === "Package Policy" && (<><div>
          <label className="block font-medium">Previous Policy Start Date <span className="text-[#f00]">*</span></label>
          <input
            type="date"
            name="prevoiusPolicyStartDate"
            value={stepData?.prevoiusPolicyStartDate}
            onChange={handleChangeStep}
            className={`w-full border px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.prevoiusPolicyStartDate === "" ||  !stepData?.prevoiusPolicyStartDate ? "border-red-500" : "border-[#e6e6e6]"}`}
          />
          {showErrors && stepData?.prevoiusPolicyStartDate === "" ||  !stepData?.prevoiusPolicyStartDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
        </div>
          <div>
            <label className="block font-medium">Previous Policy End Date <span className="text-[#f00]">*</span></label>
            <input
              type="date"
              name="prevoiusPolicyEndDate"
              value={stepData?.prevoiusPolicyEndDate}
              onChange={handleChangeStep}
              className={`w-full border px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.prevoiusPolicyEndDate === "" ||  !stepData?.prevoiusPolicyEndDate ? "border-red-500" : "border-[#e6e6e6]"}`}
            />
            {showErrors && stepData?.prevoiusPolicyEndDate === "" ||  !stepData?.prevoiusPolicyEndDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div></>)}
        {stepData?.prevPolicyType === "Package Policy" && (<><div>
          <label className="block font-medium">Any Claim?</label>
          <select name="anyClaim" id="anyClaim"
            value={stepData?.anyClaim || isClaim}
            className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
            onChange={(e) => setIsClaim(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
          {isClaim === "No" && (<div>
            <label className="block font-medium">NCB % <span className="text-[#f00]">*</span></label>
            <select name="ncbNewPolicy" id="previousPolicy"
              className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
              value={stepData?.ncbNewPolicy || "0%"}
              onChange={handleChangeStep}
            >
              <option value="0%">0%</option>
              <option value="20%">20%</option>
              <option value="25%">25%</option>
              <option value="35%">35%</option>
              <option value="45%" selected="">45%</option>
              <option value="50%">50%</option>
            </select>
          </div>)}
        </>)}
      </>)}
</>)}
    </div>
  );
};

export default StepThree;
