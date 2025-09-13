import React, { useEffect, useState } from "react";

const StepOne = ({ setRequiredFields, requiredFields, showErrors, setShowErrors }) => {
  const [postCode, setPostCode] = useState("")
  const [pinCode, setPinCode] = useState(null)
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Digits only
    if (value.length <= 10) {
      handleChangeStep({
        target: {
          name: e.target.name,
          value,
        },
      });
    }
  };

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
    whatsappSameCor: "",
    ucName: "",
  })




  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("stepData"));
    if (storedData) {
      setStepData(storedData);
      setPinCode(storedData.pincode || "");
      setPostCode(storedData.pincode || "");
    }
  }, []);




  const fetchDataFromPost = async (pincode) => {
    const url = `https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`

    try {
      const response = await fetch(url);
      const result = await response.json(); // ✅ Await this
      const details = result.postcode_details

      // console.log(result.postcode_details);
      setPostCode(result.postcode_details)

      if (result) {
        setStepData((prev) => ({
          ...prev,
          country: details.country || "",
          state: details.state || "",
          city: details.city || "",
          locality: Array.isArray(details.locality) ? details.locality[0] : details.locality || "", // default to first if array
        }));
      }

    } catch (error) {
      console.error("Failed to fetch postcode details", error);
    }
  };


  useEffect(() => {
    if (postCode?.length > 5) {
      fetchDataFromPost(postCode);
    }
  }, [postCode]);

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step1`
  }, [])


  useEffect(() => {
    let fields = ["customertype", "title", "address", "primaryPhone", "pincode"];

    if (stepData?.customertype === "Individual") {
      if (stepData?.whatsappSame === "No") {
        fields.push("whatsappNumber")
      }
      fields.push("customername", "fatherName");
    } else if (stepData?.customertype === "Corporate") {
      fields.push("companyName", "ucName",);
    }

    setRequiredFields(fields);
  }, [stepData?.customertype, stepData?.whatsappSame]);

  //  useEffect(() => {
  //   setRequiredFields(["customertype", "title", ""]);
  // }, [setRequiredFields]);

  const isError = (name) => {
    const fields = requiredFields || []; // fallback to empty array
    const error =
      showErrors &&
      fields.includes(name) &&
      !((stepData[name] ?? "").toString().trim());

    return error;
  };


  const handleChangeStep = (e) => {
    const { name, value } = e.target;

    setStepData((prev) => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem("stepData", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (stepData?.whatsappSame === "Yes" && stepData?.whatsappNumber !== stepData?.primaryPhone) {
      const updated = { ...stepData, whatsappNumber: stepData.primaryPhone };
      setStepData(updated);
      localStorage.setItem("stepData", JSON.stringify(updated));
    }
  }, [stepData.whatsappSame, stepData.primaryPhone]);



  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("stepData"));
    if (pinCode?.length > 5) {
      const temp = {
        ...data,
        city: postCode?.city || "",
        state: postCode?.state || "",
        country: postCode?.country || "",
        locality: Array.isArray(postCode?.locality) ? postCode?.locality[0] : postCode?.locality || "",
      };
      localStorage.setItem("stepData", JSON.stringify(temp));
      setStepData(temp);
    }
  }, [postCode])




  const corporateWrapperClass = stepData?.customertype === "Corporate"
    ? "border-2 border-blue-500 p-4 rounded-lg bg-blue-50 shadow-md"
    : "";


  return (
    <>

      <div className="capitalize textColor" >
        <div className="flex md:flex-row flex-col  gap-4 mb-4">
          <div className="md:w-1/2 w-full">
            <label className="block font-medium">Customer Type <span className="text-[#f00]">*</span></label>
            <select
              name="customertype"
              value={stepData?.customertype}
              onChange={handleChangeStep}
              className={`w-full border custom-select   ${isError("customertype") ? "border-red-500" : "border-[#e6e6e6]"
                } px-4 py-2 border-[#e6e6e6] rounded`}
            >
              <option value="">Select</option>
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
            </select>
            {showErrors && stepData?.customertype === "" && !stepData.customertype && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>
          <div className="md:w-1/2 w-full">
            <label className="block font-medium">Title <span className="text-[#f00]">*</span></label>
            <select
              name="title"
              value={stepData?.customertype === "Individual" ? stepData?.title : "M/s"}
              onChange={handleChangeStep}
              disabled={stepData?.customertype !== "Individual"} // 🔒 disables the select
              className={`
    w-full border custom-select px-4 py-2 rounded 
    ${stepData?.customertype !== "Individual" ? 'border-[#b3b3b3]' : 'border-[#e6e6e6]'}
    ${stepData?.customertype !== "Individual" ? 'bg-[#f9f9f9] cursor-not-allowed text-gray-500' : ''} 
    ${isError("title") && stepData?.customertype === "Individual" ? "border-red-500" : "border-[#e6e6e6]"}
    focus:outline focus:outline-[#b3b3b3]
  `}
            >
              {stepData?.customertype === "Individual" && (
                <>
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                </>
              )}
              {stepData?.customertype === "Corporate" && (<option value="M/s">M/s</option>
              )}
              {stepData?.customertype === "" && (<option value="">Select</option>
              )}
            </select>
            {showErrors &&
              stepData?.customertype === "Individual" &&
              !stepData?.title?.toString().trim() && (
                <p className="text-sm text-red-500 mt-1">This field is required.</p>
              )}

          </div>
        </div>
      </div>
      {stepData?.customertype === "Individual" && (
        <>
          {stepData?.customertype === "Individual" && (
            <>
              <div className="flex md:flex-row flex-col  gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Customer Name <span className="text-[#f00]">*</span></label>
                  <input
                    type="text"
                    name="customername"
                    value={stepData?.customername}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2  rounded ${isError("customername") ? "border-red-500" : "border-[#e6e6e6]"
                      }`}
                    required
                  />
                  {showErrors && stepData?.customername === "" && (
                    <p className="text-sm text-red-500 mt-1">This field is required.</p>
                  )}
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Father Name <span className="text-[#f00]">*</span></label>
                  <input
                    type="text"
                    name="fatherName"
                    value={stepData?.fatherName}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2 ${isError("fatherName") ? "border-red-500" : "border-[#e6e6e6]"}  border-[#e6e6e6] rounded`}
                    required
                  />
                  {showErrors && stepData?.fatherName === "" && (
                    <p className="text-sm text-red-500 mt-1">This field is required.</p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col  gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block  font-medium">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={stepData?.dob}
                    onChange={handleChangeStep}
                    className="w-full border  px-4 py-2 border-[#e6e6e6] rounded"
                    required
                  />
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Primary Phone <span className="text-[#f00]">*</span></label>
                  <input
                    type="text"
                    name="primaryPhone"
                    value={stepData?.primaryPhone}
                    onChange={handleMobileChange}
                    className={`w-full border px-4 py-2 ${isError("primaryPhone") ? "border-red-500" : "border-[#e6e6e6]"}  border-[#e6e6e6] rounded`}
                    placeholder="10-digit mobile number"
                    required
                  />
                  {showErrors && stepData?.primaryPhone === "" && (
                    <p className="text-sm text-red-500 mt-1">This field is required.</p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col  gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">WhatsApp Same as Phone?</label>
                  <select
                    name="whatsappSame"
                    value={stepData?.whatsappSame}
                    onChange={handleChangeStep}
                    className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="md:w-1/2 w-full">
                  <label className={`block font-medium   `}>WhatsApp Number <span className="text-[#f00]">*</span></label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={
                      stepData?.whatsappSame === "Yes"
                        ? stepData?.primaryPhone // use primaryPhone if whatsappSame is "Yes"
                        : stepData?.whatsappNumber
                    }
                    onChange={
                      stepData?.whatsappSame === "Yes"
                        ? () => { } // disable editing
                        : handleMobileChange // allow editing
                    }
                    className={`w-full border px-4 py-2 rounded ${isError("whatsappNumber") ? "border-red-500" : "border-[#e6e6e6]"}  bg-white ${stepData?.whatsappSame === "Yes" ? 'cursor-not-allowed text-gray-500' : ''}`}
                    disabled={stepData?.whatsappSame === "Yes"} // optional: disable input
                  />
                  {showErrors && stepData?.whatsappNumber === "" && (
                    <p className="text-sm text-red-500 mt-1">This field is required.</p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-row flex-col  gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Contact 3</label>
                  <input
                    type="text"
                    name="contact3"
                    value={stepData?.contact3}
                    onChange={handleMobileChange}
                    className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                  />
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Contact 4</label>
                  <input
                    type="text"
                    name="contact4"
                    value={stepData?.contact4}
                    onChange={handleMobileChange}
                    className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col  gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Pincode <span className="text-[#f00]">*</span></label>
                  <input
                    type="text"
                    name="pincode"
                    value={stepData?.pincode || ""}
                    onChange={(e) => {
                      // const value = e.target.value;
                      const numericValue = e.target.value.replace(/\D/g, "");

                      // ✅ Update internal states (optional)
                      setPostCode(numericValue);
                      setPinCode(numericValue);

                      // ✅ Update stepData correctly
                      handleChangeStep({
                        target: {
                          name: "pincode",
                          value: numericValue,
                        },
                      });

                      // ✅ Fetch postcode details
                      if (numericValue.length > 5) {
                        fetchDataFromPost(numericValue);
                      } else {
                        setShowErrors(true)
                      }
                    }}
                    inputMode="numeric"
                    pattern="\d*"
                    className={`w-full border px-4 py-2 ${isError("pincode") ? "border-red-500" : "border-[#e6e6e6]"}  border-[#e6e6e6] rounded`}
                    required
                  />

                  {showErrors && stepData?.pincode?.length < 6 && (
                    <p className="text-sm text-red-500 mt-1">Please fill correct Pincode</p>
                  )}
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={postCode?.country}
                    className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col  gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={postCode?.state}
                    readOnly
                    className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                    required
                  />
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={postCode?.city}
                    readOnly
                    className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                    required
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col  gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Locality</label>
                  <select
                    name="locality"
                    value={stepData?.locality}
                    onChange={handleChangeStep}
                    className="w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded"
                  >
                    {(postCode?.["locality"] || [])?.map((values, index) => (
                      <option key={index} value={values}>{values}</option>
                    ))}
                  </select>
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block font-medium">Address <span className="text-[#f00]">*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={stepData?.address}
                    onChange={handleChangeStep}
                    className={`w-full border px-4 py-2  ${isError("address") ? "border-red-500" : "border-[#e6e6e6]"} border-[#e6e6e6] rounded`}
                  />
                  {showErrors && stepData?.address === "" && (
                    <p className="text-sm text-red-500 mt-1">This field is required.</p>
                  )}
                </div>
              </div>

              <div className="capitalize mb-4">
                <label className="block font-medium">Service Book Number</label>
                <input
                  type="text"
                  name="serviceBook"
                  value={stepData?.serviceBook}
                  onChange={handleChangeStep}
                  className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                />
              </div>
            </>

          )}

        </>
      )}
      {stepData?.customertype === "Corporate" && (
        <>
          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Company Name <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="companyName"
                value={stepData?.companyName}
                onChange={handleChangeStep}
                className={`w-full border px-4 ${isError("companyName") ? "border-red-500" : "border-[#e6e6e6]"}  py-2 border-[#e6e6e6] rounded`}
                placeholder="Company Name"
              />
              {showErrors && stepData?.companyName === "" && (
                <p className="text-sm text-red-500 mt-1">This field is required.</p>
              )}
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">U/C Name <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="ucName"
                value={stepData?.ucName}
                onChange={handleChangeStep}
                className={`w-full border px-4 py-2 ${isError("ucName") ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
                placeholder="U/C Name"
              />
              {showErrors && stepData?.ucName === "" && (
                <p className="text-sm text-red-500 mt-1">This field is required.</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Primary Phone <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="primaryPhone"
                value={stepData?.primaryPhone}
                onChange={handleMobileChange}
                className={`w-full border px-4 py-2 ${isError("primaryPhone") ? "border-red-500" : "border-[#e6e6e6]"}  border-[#e6e6e6] rounded`}
                placeholder="Enter Phone"
              />
              {showErrors && stepData?.primaryPhone === "" && (
                <p className="text-sm text-red-500 mt-1">This field is required.</p>
              )}
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">WhatsApp Same as Phone?</label>
              <select
                name="whatsappSameCor"
                value={stepData?.whatsappSameCor}
                onChange={handleChangeStep}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">WhatsApp Number <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="whatsappNumber"
                value={
                  stepData?.whatsappSameCor === "Yes"
                    ? stepData?.primaryPhone // use primaryPhone if whatsappSame is "Yes"
                    : stepData?.whatsappNumber
                }
                onChange={
                  stepData?.whatsappSameCor === "Yes"
                    ? () => { } // disable editing
                    : handleMobileChange // allow editing
                }
                className={`w-full border px-4 py-2 rounded ${isError("whatsappSame") && stepData?.whatsappSameCor === "No" ? "border-red-500" : "border-[#e6e6e6]"} bg-white ${stepData?.whatsappSameCor === "Yes" ? 'cursor-not-allowed text-gray-500' : 'cursor-default'}`}
                disabled={stepData?.whatsappSameCor === "Yes"} // optional: disable input
              />
              {showErrors && stepData?.whatsappNumber === "" && stepData?.whatsappSameCor === "No" && (
                <p className="text-sm text-red-500 mt-1">This field is required.</p>
              )}
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Contact 3</label>
              <input
                type="text"
                name="contact3"
                value={stepData?.contact3}
                onChange={handleMobileChange}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                placeholder="Enter 10 Digit Contact Number"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Contact 4</label>
              <input
                type="text"
                name="contact4"
                value={stepData?.contact4}
                onChange={handleMobileChange}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                placeholder="Enter 10 Digit Contact Number"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Pincode <span className="text-[#f00]">*</span></label>
              <input
                type="text"
                name="pincode"
                value={pinCode}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setPostCode(numericValue);
                  setPinCode(numericValue);
                  // ✅ Update stepData correctly
                      handleChangeStep({
                        target: {
                          name: "pincode",
                          value: numericValue,
                        },
                      });

                      
                  if (numericValue?.length > 5) {
                    fetchDataFromPost(numericValue);
                  } else {
                    setShowErrors(true)
                  }
                }}
                inputMode="numeric"
                    pattern="\d*"
                className={`w-full border px-4 py-2 ${isError("address") ? "border-red-500" : "border-[#e6e6e6]"}  border-[#e6e6e6] rounded`}
                required
              />

              {showErrors && stepData?.pincode?.length < 6 && (
                <p className="text-sm text-red-500 mt-1">Please fill correct Pincode</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={postCode?.country}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
                readOnly
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">State</label>
              <input
                type="text"
                name="state"
                value={postCode?.state}
                readOnly
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">City</label>
              <input
                type="text"
                name="city"
                value={postCode?.city}
                readOnly
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <label className="block font-medium">Locality</label>
              <select
                name="locality"
                value={stepData?.locality}
                onChange={handleChangeStep}
                className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              >
                {(postCode?.["locality"] || [])?.map((values, index) => (
                  <option key={index} value={values}>{values}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Address <span className="text-[#f00]">*</span></label>
            <input
              type="text"
              name="address"
              value={stepData?.address}
              onChange={handleChangeStep}
              className={`w-full border ${isError("address") ? "border-red-500" : "border-[#e6e6e6]"}  px-4 py-2 border-[#e6e6e6] rounded`}
              placeholder="Enter Address"
            />
            {showErrors && stepData?.address === "" && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Service Book Number</label>
            <input
              type="text"
              name="serviceBook"
              value={stepData?.serviceBook}
              onChange={handleChangeStep}
              className="w-full border px-4 py-2 border-[#e6e6e6] rounded"
              placeholder="Enter Service Book Number"
            />
          </div>
        </>
      )}

    </>
  );
};

export default StepOne;
