import React, { useCallback, useEffect, useState } from "react";

const paymentModesList = [
  "Cash",
  "NEFT/RTGS",
  "Google Pay",
  "Debit Card",
  "Credit Card",
  "Netbanking",
  "Cheque",
  "PhonePe",
  "QR Code",
];

const StepFive = ({ formData = {}, setFormData = () => { }, setRequiredFields, showErrors }) => {
  const [localData, setLocalData] = useState({ ...formData });
  const [stepData, setStepData] = useState({
    checkbox: "",
    cashAmount: "",
    neftAmount: "",
    googlePayAmount: "",
    googlePayDetail: "",
    debitAmount: "",
    debitCardDetail: "",
    creditAmount: "",
    creditCard: "",
    creditCardDetail: "",
    netbankingAmount: "",
    netbankingDetail: "",
    chequeAmount: "",
    chequeDetails: "",
    phonepeAmount: "",
    phonepeDetail: "",
    agencyAmount: "",
    paymentDate: "",
    transactionId: "",
    transactionID: "",
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stepData"));
    if (saved) {
      setStepData(saved);
      setLocalData((prev) => ({ ...prev, ...saved }));
    }
  }, []);


  const handleChangeStep = (e) => {
    const { name, type, checked, value } = e.target;

    // get whatever we saved before
    const temp = JSON.parse(localStorage.getItem("stepData")) || { ...stepData };
    const updated = { ...temp };

    if (type === "checkbox") {
      // if you really want to save checkboxes individually
      if (checked) {
        updated[name] = value;
      } else {
        delete updated[name];
      }
    } else {
      updated[name] = value;
    }

    // save to localStorage correctly
    localStorage.setItem("stepData", JSON.stringify(updated));

    // update local state
    setStepData(updated);

    // still update localData so parent receives it
    handleChange(e);
  };

  useEffect(() => {
    let fields = [];

    // Cash
    if (stepData.paymentModes?.includes("Cash")) {
      fields.push("cashAmount");
    }

    // NEFT/RTGS
    if (stepData.paymentModes?.includes("NEFT/RTGS")) {
      fields.push("neftAmount", "transactionID"); // also push transactionID for NEFT
    }

    // Google Pay
    if (stepData.paymentModes?.includes("Google Pay")) {
      fields.push("googlePayAmount", "googlePayDetail");
    }

    // Debit Card
    if (stepData.paymentModes?.includes("Debit Card")) {
      fields.push("debitAmount", "debitCardDetail");
    }

    // Credit Card
    if (stepData.paymentModes?.includes("Credit Card")) {
      fields.push("creditAmount", "creditCard");
    }

    // Netbanking
    if (stepData.paymentModes?.includes("Netbanking")) {
      fields.push("netbankingAmount", "netbankingDetail");
    }

    // Cheque
    if (stepData.paymentModes?.includes("Cheque")) {
      fields.push("chequeAmount", "chequeDetails");
    }

    // PhonePe
    if (stepData.paymentModes?.includes("PhonePe")) {
      fields.push("phonepeAmount", "phonepeDetail");
    }

    // Always required fields
    fields.push("agencyAmount", "paymentDate");

    setRequiredFields(fields);
  }, [stepData.paymentModes, stepData]);



  // Sync external changes to localData
  useEffect(() => {
    setLocalData({ ...formData });
    // Run only once on mount
  }, []);

  // Sync localData back to parent in real time

  const togglePaymentMode = useCallback((mode) => {
    setLocalData((prev) => {
      const currentModes = prev.paymentModes || [];
      const updatedModes = currentModes.includes(mode)
        ? currentModes.filter((m) => m !== mode)
        : [...currentModes, mode];

      // also update stepData + localStorage
      const temp = JSON.parse(localStorage.getItem("stepData")) || { ...stepData };
      const updatedStep = { ...temp, paymentModes: updatedModes };
      localStorage.setItem("stepData", JSON.stringify(updatedStep));
      setStepData(updatedStep);

      return { ...prev, paymentModes: updatedModes };
    });
  }, [stepData]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (typeof setFormData === "function") {
      setFormData(localData);
    }
  }, [localData]);

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step4`
  }, [])




  return (
    <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Payment Mode Checkboxes */}
      <div className="col-span-2">
        <h2 className="font-semibold text-lg mb-2">Mode of Payment to Insurance Company</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paymentModesList.map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={mode}
                checked={localData.paymentModes?.includes(mode)}
                onChange={(e) => {
                  togglePaymentMode(mode);
                  handleChangeStep(e)
                }}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Conditional Fields */}

      {localData.paymentModes?.includes("Cash") && (
        <>
          <div>
            <label>Cash Amount Paid to Insurance Company</label>
            <input
              type="text"
              name="cashAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.cashAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModes?.includes("NEFT/RTGS") && (
        <>
          <div>
            <label>NEFT Or RTGS Amount Paid to Insurance Company</label>
            <input
              type="text"
              name="neftAmount"
              placeholder="NEFT Or RTGS Amount Paid to Insurance Company"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.neftAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>UTR / Transaction ID / Cheque Details</label>
            <input
              type="text"
              name="transactionID"
              placeholder="Enter UTR / Transaction ID / Cheque Details"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.transactionID || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModes?.includes("Google Pay") && (
        <>
          <div>
            <label>Google Pay Amount Paid to Insurance Company</label>
            <input
              type="text"
              name="googlePayAmount"
              placeholder="Enter Google Pay Amount Paid to Insurance Company"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.googlePayAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label htmlFor=""></label>
            <select name="googlePayDetail" value={stepData.googlePayDetail} onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.googlePayDetail === "" && !stepData?.googlePayDetail ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
              <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
              <option value="SatyaPrakash - SBI BANK - S/A">SatyaPrakash - SBI BANK - S/A</option>
              <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
              <option value="SatyaPrakash - HDFC BANK - S/A">SatyaPrakash - HDFC BANK - S/A</option>
              <option value="Yatendra Kumar - SBI BANK - S/A">Yatendra Kumar - SBI BANK - S/A</option>
              <option value="Yatendra Kumar - HDFC BANK - S/A">Yatendra Kumar - HDFC BANK - S/A</option>
              <option value="Khem Chand - HDFC BANK - S/A">Khem Chand - HDFC BANK - S/A</option>
              <option value="Rekha - HDFC BANK - S/A">Rekha - HDFC BANK - S/A</option>
              <option value="Chitra - HDFC BANK - S/A">Chitra - HDFC BANK - S/A</option>
              <option value="Chitra - SBI BANK - S/A">Chitra - SBI BANK - S/A</option>
              <option value="Sapna - HDFC BANK - S/A">Sapna - HDFC BANK - S/A</option>
              <option value="Sapna - SBI BANK - S/A">Sapna - SBI BANK - S/A</option>
              <option value="Sangita - SBI BANK - S/A">Sangita - SBI BANK - S/A</option>
              <option value="Dheeraj - AXIS BANK - S/A">Dheeraj - AXIS BANK - S/A</option>
              <option value="Ravi Shankar - PNB BANK - S/A">Ravi Shankar - PNB BANK - S/A</option>
              <option value="Priyanka Sharma - PNB BANK - S/A">Priyanka Sharma - PNB BANK - S/A</option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModes?.includes("Debit Card") && (
        <>
          <div>
            <label>Debit Card Amount paid to Insurance Company</label>
            <input
              type="text"
              name="debitAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.debitAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select Debit Card</label>
            <select name="debitCardDetail" value={stepData.debitCardDetail} onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.debitCardDetail === "" && !stepData?.debitCardDetail ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
              <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
              <option value="SatyaPrakash - SBI BANK - S/A">SatyaPrakash - SBI BANK - S/A</option>
              <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
              <option value="SatyaPrakash - HDFC BANK - S/A">SatyaPrakash - HDFC BANK - S/A</option>
              <option value="Yatendra Kumar - SBI BANK - S/A">Yatendra Kumar - SBI BANK - S/A</option>
              <option value="Yatendra Kumar - HDFC BANK - S/A">Yatendra Kumar - HDFC BANK - S/A</option>
              <option value="Khem Chand - HDFC BANK - S/A">Khem Chand - HDFC BANK - S/A</option>
              <option value="Rekha - HDFC BANK - S/A">Rekha - HDFC BANK - S/A</option>
              <option value="Chitra - HDFC BANK - S/A">Chitra - HDFC BANK - S/A</option>
              <option value="Chitra - SBI BANK - S/A">Chitra - SBI BANK - S/A</option>
              <option value="Sapna - HDFC BANK - S/A">Sapna - HDFC BANK - S/A</option>
              <option value="Sapna - SBI BANK - S/A">Sapna - SBI BANK - S/A</option>
              <option value="Sangita - SBI BANK - S/A">Sangita - SBI BANK - S/A</option>
              <option value="Dheeraj - AXIS BANK - S/A">Dheeraj - AXIS BANK - S/A</option>
              <option value="Ravi Shankar - PNB BANK - S/A">Ravi Shankar - PNB BANK - S/A</option>
              <option value="Priyanka Sharma - PNB BANK - S/A">Priyanka Sharma - PNB BANK - S/A</option>
            </select>

          </div>
        </>
      )}

      {localData.paymentModes?.includes("Credit Card") && (
        <>
          <div>
            <label>Credit Card Amount Paid to Insurance Company</label>
            <input
              type="text"
              name="creditAmount"
              placeholder="Enter Credit Card Amount Paid to Insurance Company"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.creditAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select Credit Card</label>
            <select name="creditCard" value={stepData.creditCard} onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.creditCard === "" && !stepData?.creditCard ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
              <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
              <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
            </select>
          </div>
          {/* <div>
            <label>Credit Card Details</label>
            <input
              type="text"
              name="creditCardDetail"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.creditCardDetail || ""}
              onChange={handleChange}
            />
          </div> */}
        </>
      )}

      {localData.paymentModes?.includes("Netbanking") && (
        <>
          <div>
            <label>Netbanking Amount Paid to Insurance Company</label>
            <input
              type="text"
              placeholder="Enter Netbanking Amount Paid to Insurance Company"
              name="netbankingAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.netbankingAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select Netbanking Detail</label>
            <select name="netbankingDetail" value={stepData.netbankingDetail} onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.netbankingDetail === "" && !stepData?.netbankingDetail ? "border-red-500" : "border-[#e6e6e6]"} rounded`}>
              <option value="Chaturvedi Motors - HDFC BANK - C/A">Chaturvedi Motors - HDFC BANK - C/A</option>
              <option value="Chaturvedi Motors - SBI BANK - C/A">Chaturvedi Motors - SBI BANK - C/A</option>
              <option value="SatyaPrakash - SBI BANK - S/A">SatyaPrakash - SBI BANK - S/A</option>
              <option value="SatyaPrakash - ICICI BANK - S/A">SatyaPrakash - ICICI BANK - S/A</option>
              <option value="SatyaPrakash - HDFC BANK - S/A">SatyaPrakash - HDFC BANK - S/A</option>
              <option value="Yatendra Kumar - SBI BANK - S/A">Yatendra Kumar - SBI BANK - S/A</option>
              <option value="Yatendra Kumar - HDFC BANK - S/A">Yatendra Kumar - HDFC BANK - S/A</option>
              <option value="Khem Chand - HDFC BANK - S/A">Khem Chand - HDFC BANK - S/A</option>
              <option value="Rekha - HDFC BANK - S/A">Rekha - HDFC BANK - S/A</option>
              <option value="Chitra - HDFC BANK - S/A">Chitra - HDFC BANK - S/A</option>
              <option value="Chitra - SBI BANK - S/A">Chitra - SBI BANK - S/A</option>
              <option value="Sapna - HDFC BANK - S/A">Sapna - HDFC BANK - S/A</option>
              <option value="Sapna - SBI BANK - S/A">Sapna - SBI BANK - S/A</option>
              <option value="Sangita - SBI BANK - S/A">Sangita - SBI BANK - S/A</option>
              <option value="Dheeraj - AXIS BANK - S/A">Dheeraj - AXIS BANK - S/A</option>
              <option value="Ravi Shankar - PNB BANK - S/A">Ravi Shankar - PNB BANK - S/A</option>
              <option value="Priyanka Sharma - PNB BANK - S/A">Priyanka Sharma - PNB BANK - S/A</option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModes?.includes("Cheque") && (
        <>
          <div>
            <label>Cheque Amount Paid To Insurance Company</label>
            <input
              type="text"
              name="chequeAmount"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              placeholder="Enter Cheque Amount"
              value={stepData.chequeAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
        </>
      )}

      {localData.paymentModes?.includes("PhonePe") && (
        <>
          <div>
            <label>Phonepe Amount Paid to Insurance Company</label>
            <input
              type="text"
              name="phonepeAmount"
              placeholder="Enter Phonepe Amount Paid to Insurance Company"
              className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
              value={stepData.phonepeAmount || ""}
              onChange={handleChangeStep}
            />
          </div>
          <div>
            <label>Select PhonePe Detail</label>
            <select name="phonepeDetail" value={stepData.phonepeDetail} onChange={handleChangeStep}
              className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.phonepeDetail === "" && !stepData?.phonepeDetail ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
            >
              <option value="Yatendra Kumar SBI -7417227114">Yatendra Kumar SBI -7417227114</option>
              <option value="Yatendra Kumar HDFC -7417227114">Yatendra Kumar HDFC -7417227114</option>
              <option value="Khem chand HDFC -9410075685">Khem chand HDFC -9410075685</option>
              <option value="Rekha HDFC -9837111044">Rekha HDFC -9837111044</option>
              <option value="Chitra CHATURVEDI SBI -7417227114">Chitra CHATURVEDI SBI -7417227114</option>
              <option value="Chaturvedi Motors HDFC 9837111044">Chaturvedi Motors HDFC 9837111044</option>
            </select>
          </div>
        </>
      )}

      {localData.paymentModes?.length > 0 && (
        <div>
          <label>UTR / Transaction ID / Cheque Details</label>
          <input
            type="text"
            name="chequeDetails"
            className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
            placeholder="Enter UTR / Transaction ID / Cheque Details"
            value={stepData.chequeDetails || ""}
            onChange={handleChangeStep}
          />
        </div>
      )}

      {/* Common Fields */}
      <div>
        <label>Total Amount Paid to Insurance Agency</label>
        <input
          type="text"
          name="agencyAmount"
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          value={stepData.agencyAmount || ""}
          onChange={handleChangeStep}
        />
      </div>

      <div>
        <label>Date of Payment to Insurance Company</label>
        <input
          type="date"
          name="paymentDate"
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          value={stepData.paymentDate || ""}
          onChange={handleChangeStep}
        />
      </div>

      {/* <div>
        <label>Transaction ID / Cheque No / UTR</label>
        <input
          type="text"
          name="transactionId"
          className="w-full rounded-[10px] border px-4 py-2 border-[#e6e6e6] "
          value={stepData.transactionId || ""}
          onChange={handleChangeStep}
        />
      </div> */}
    </div>
  );
};

export default StepFive;
