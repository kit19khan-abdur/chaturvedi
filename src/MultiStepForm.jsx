import React, { useEffect, useState } from "react";
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
} from "./Steps";
import StepIndicator from "./StepIndicator";
import handleSubmit from "./handleSubmit";

const getInitialFormData = () => {
  const saved = localStorage.getItem("chaturvediFormData");
  return saved
    ? JSON.parse(saved)
    : {
        //Step 1
        customertype: "",
        title: "",
        customername: "",
        fatherName: "",
        dob: "",
        primaryPhone: "",
        whatsappSame: "",
        whatsappNumber: "",
        contact3: "",
        contact4: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
        locality: "",
        address: "",
        serviceBook: "",
        companyName: "",
        ucName: "",

        //Step 2
        proposalType: "",
        policyType: "",
        receiptNumber: "",
        receiptDate: "",
        vehicleYear: "",
        registrationNumber: "",
        registrationDate: "",
        chassisNumber: "",
        engineNumber: "",
        manufacturingYear: "",
        rtoState: "",
        rtoCity: "",
        product: "",
        manufacturerType: "",
        model: "",
        varience: "",
        fueltype: "",

        //Step 3

        previousPolicy: "",
        prevPolicyType: "",
        insurerName: "",
        policyNumber: "",
        odPolicyStartDate: "",
        odPolicyEndDate: "",
        tpPolicyStartDate: "",
        tpPolicyEndDate: "",
        newOdPolicyStartDate: "",
        newOdPolicyEndDate: "",
        ncbPolicy: "",
        newTpPolicyStartDate: "",
        newTpPolicyEndDate: "",
        prevoiusPolicyStartDate: "",
        prevoiusPolicyEndDate: "",

        // Step 4

        newPolicyStartDate: "",
        newPolicyEndDate: "",
        ncbNewPolicy: "",
        brokerAgencyName: "",
        policyNumber: "",
        insurerName: "",
        policyIssueDate: "",
        idv: "",
        paCover: "",
        odAmount: "",
        tpAmount: "",
        netTotal: "",
        gstAmount: "",
        totalPremium: "",
        breakingCharge: "",
        waiverAmount: "",
        netPayable: "",

        // Step 5

        checkbox: "",
        cashAmount: "",
        neftAmount: "",
        googlePayAmount: "",
        googlePayDetail: "",
        debitAmount: "",
        debitCardDetail: "",
        creditAmount: "",
        creditCardDetail: "",
        netbankingAmount: "",
        netbankingDetail: "",
        chequeAmount: "",
        phonepeAmount: "",
        phonepeDetail: "",
        agencyAmount: "",
        paymentDate: "",
        transactionId: "",

        // Step 6

        paymentStatus: "",
        checkbox: "",
        chequeNumber: "",
        transactionId: "",
        paymentDate: "",
        dueAmount: "",
        expectedClearDate: "",
        comments: "",

        // Step 7

        paymentStatus: "",
        checkbox: "",
        chequeNumber: "",
        transactionId: "",
        paymentDate: "",
        dueAmount: "",
        expectedClearDate: "",
        comments: "",
      };
};

const MultiStepForm = () => {
  const [postCode, setPostCode] = useState("");
  const [requiredFields, setRequiredFields] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(getInitialFormData);
  const [showErrors, setShowErrors] = useState(false);
  const [stepData, setStepData] = useState({
    customertype: "",
    title: "",
    customername: "",
    fatherName: "",
    dob: "",
    primaryPhone: "",
    whatsappSame: "",
    whatsappNumber: "",
    contact3: "",
    contact4: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    locality: "",
    address: "",
    serviceBook: "",
    companyName: "",
    ucName: "",

    //Step 2
    proposalType: "",
    policyType: "",
    receiptNumber: "",
    receiptDate: "",
    vehicleYear: "",
    registrationNumber: "",
    registrationDate: "",
    chassisNumber: "",
    engineNumber: "",
    manufacturingYear: "",
    rtoState: "",
    rtoCity: "",
    product: "",
    manufacturerType: "",
    model: "",
    varience: "",
    fueltype: "",

    //Step 3

    previousPolicy: "",
    prevPolicyType: "",
    insurerName: "",
    policyNumber: "",
    newOdPolicyStartDate: "",
    newOdPolicyEndDate: "",
    ncbPolicy: "",
    newTpPolicyStartDate: "",
    newTpPolicyEndDate: "",
    prevoiusPolicyStartDate: "",
    prevoiusPolicyEndDate: "",

    // Step 4

    newPolicyStartDate: "",
    newPolicyEndDate: "",
    ncbNewPolicy: "",
    brokerAgencyName: "",
    policyNumber: "",
    insurerName: "",
    policyIssueDate: "",
    idv: "",
    paCover: "",
    odAmount: "",
    tpAmount: "",
    netTotal: "",
    gstAmount: "",
    totalPremium: "",
    breakingCharge: "",
    waiverAmount: "",
    netPayable: "",

    // Step 5

    checkbox: "",
    cashAmount: "",
    neftAmount: "",
    googlePayAmount: "",
    googlePayDetail: "",
    debitAmount: "",
    debitCardDetail: "",
    creditAmount: "",
    creditCardDetail: "",
    netbankingAmount: "",
    netbankingDetail: "",
    chequeAmount: "",
    phonepeAmount: "",
    phonepeDetail: "",
    agencyAmount: "",
    paymentDate: "",
    transactionId: "",

    // Step 6

    paymentStatus: "",
    checkbox: "",
    chequeNumber: "",
    transactionId: "",
    paymentDate: "",
    dueAmount: "",
    expectedClearDate: "",
    comments: "",

    // Step 7

    paymentStatus: "",
    checkbox: "",
    chequeNumber: "",
    transactionId: "",
    paymentDate: "",
    dueAmount: "",
    expectedClearDate: "",
    comments: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("stepData"));
    if (stored) {
      setStepData((prev) => ({
        ...prev,
        ...stored,
        stepData,
      }));
    }
  }, []);

  // ✅ Handles regular input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem("chaturvediFormData", JSON.stringify(updated));
  };

  // ✅ Use this inside children (Steps 4-7) to also sync localStorage
  const updateFormData = (newData) => {
    const updated = { ...formData, ...newData };
    setFormData(updated);
    localStorage.setItem("chaturvediFormData", JSON.stringify(updated));
  };

  const fetchDataFromPost = async (pincode) => {
    const url = `https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`;

    try {
      const response = await fetch(url);
      const result = await response.json(); // ✅ Await this
      const details = result.postcode_details;

      // console.log(result.postcode_details);
      setPostCode(result.postcode_details);

      if (result) {
        updateFormData({
          country: details.country || "",
          state: details.state || "",
          city: details.city || "",
          locality: Array.isArray(details.locality)
            ? details.locality[0]
            : details.locality || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch postcode details", error);
    }
  };

  const upDateData = () => {
    const data = JSON.parse(localStorage.getItem("rtoData")); // ❗ Add JSON.parse
    if (data) {
      updateFormData({
        rtoState: data.rtoState || "",
        rtoCity: data.rtoCity || "",
        product: data.product || "",
        manufacturerType: data.manufacturerType || "",
        model: data.model || "",
        varience: data.varience || "",
        fueltype: data.fueltype || "",
      });
    }
  };

  const next = async () => {
    setShowErrors(false)
    upDateData();

    const temp = JSON.parse(localStorage.getItem("stepData")) || {};
    // console.log(temp);

    setTimeout(() => {
      let fieldName;
      const isValid = requiredFields.every((field) => {
        const value = temp[field];
        fieldName = field
        return value !== undefined && value.toString().trim() !== "";
      });
      if (!isValid) {
        console.log(`Please fill the required field`, fieldName)
        setShowErrors(true);
        return;
      }
      setStep((prev) => prev + 1);
    }, 100);
    // console.log(showErrors)
    // console.clear()
  };

  const prev = () => {
    if (prev === 1) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step1`;
  }, []);

  return (
    <div className="capitalize max-w-[95vw] mx-auto">
      {/* <h2 className="text-2xl mb-4 text-center">Chaturvedi Motors Form</h2> */}
      <StepIndicator currentStep={step} />
      <div className="max-w-[80vw] mx-auto p-6 mt-10  rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <StepOne
              formData={formData}
              handleChange={handleChange}
              setRequiredFields={setRequiredFields}
              requiredFields={requiredFields}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              setformData={updateFormData}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              handleChange={handleChange}
              setRequiredFields={setRequiredFields}
              requiredFields={requiredFields}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              setformData={updateFormData}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              handleChange={handleChange}
              setFormData={updateFormData}
              setRequiredFields={setRequiredFields}
              requiredFields={requiredFields}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
            />
          )}

          {step === 4 && (
            <StepFour
              formData={formData}
              setFormData={updateFormData}
              setRequiredFields={setRequiredFields}
              requiredFields={requiredFields}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              setformData={updateFormData}
            />
          )}
          {step === 5 && (
            <StepFive
              formData={formData}
              setFormData={updateFormData}
              setRequiredFields={setRequiredFields}
              requiredFields={requiredFields}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              setformData={updateFormData}
            />
          )}
          {step === 6 && (
            <StepSix
              formData={formData}
              handleChange={handleChange}
              setFormData={updateFormData}
              setRequiredFields={setRequiredFields}
              requiredFields={requiredFields}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
            />
          )}
          {step === 7 && (
            <StepSeven
              formData={formData}
              setFormData={updateFormData}
              setRequiredFields={setRequiredFields}
              requiredFields={requiredFields}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
            />
          )}

          <div className={` ${step === 1 ? "" : "flex justify-between"} mt-6`}>
            {step > 1 && (
              <button
                type="button"
                onClick={prev}
                className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded"
              >
                Previous
              </button>
            )}
            {step <= 5 && (
              <button
                type="button"
                onClick={next}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded ml-auto"
              >
                Next
              </button>
            )}

            {step > 5 && (
              <button
                type="submit"
                className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded ml-auto"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
