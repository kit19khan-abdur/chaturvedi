import { useEffect, useState } from "react";

const StepTwo = ({   setRequiredFields, requiredFields, showErrors }) => {
  const [keys, setKeys] = useState([])
  const [product, setProduct] = useState([]);
  const [productKey, setProductKey] = useState("");
  const [dataKey, setDataKey] = useState("")
  const [result, setResult] = useState([])
  const [manufacturerKey, setManufacturerKey] = useState("");
  const [modelKey, setModelKey] = useState("");
  const [varientKey, setVarientKey] = useState("");
   const [selected, setSelected] = useState(null)
  const [rtoData, setRtoData] = useState({
    rtoState: "",
    rtoCity: "",
    product: "",
    manufacturerType: "",
    model: "",
    varience: "",
    fueltype: ""

  })



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("stepData"));
    if (storedData) {
      setStepData(storedData);
    }
  }, []);


  const [stepData, setStepData] = useState({
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
    fueltype: ""
  })

 useEffect(() => {
  const storedStep = JSON.parse(localStorage.getItem("stepData"));
  if (storedStep) setStepData(storedStep);

  const rto = JSON.parse(localStorage.getItem("rtoData"));
  if (rto) {
    // prefill stepData
    setStepData(prev => ({
      ...prev,
      rtoState: rto.rtoState || "",
      rtoCity: rto.rtoCity || "",
      product: rto.product || "",
      manufacturerType: rto.manufacturerType || "",
      model: rto.model || "",
      varience: rto.varience || "",
      fueltype: rto.fueltype || "",
    }));

    // prefill keys so the dependent dropdowns populate
    setDataKey(rto.rtoState || "");
    setProductKey(rto.product || "");
    setManufacturerKey(rto.manufacturerType || "");
    setModelKey(rto.model || "");
    setVarientKey(rto.varience || "");
  }
}, []);

  const handleChangeStep = (e) => {
  const { name, value } = e.target;
  const temp = JSON.parse(localStorage.getItem('stepData'))

  setStepData(() => {
    const updated = { ...temp, [name]: value };
    localStorage.setItem("stepData", JSON.stringify(updated));
    return updated;
  });
};




  const fetchDataFromLocal = async () => {
    // const url = `https://cwa-chaturvedi.onrender.com/api/details`
    const url = `https://5ljsrljv5i.execute-api.ap-south-1.amazonaws.com/CustomCitiesOptions/webhook/cities`

    try {
      const response = await fetch(url);
      const result = await response.json(); // ✅ Await this



      const keys = Object.keys(result || {});
      setKeys(keys)
      setResult(result)

      // console.log(result)

    } catch (error) {
      console.error("Failed to fetch postcode details", error);
    }
  };

  const fetchproductFromLocal = async () => {
    const url = `https://5ljsrljv5i.execute-api.ap-south-1.amazonaws.com/CustomProducts/webhook/products`;

    try {
      const response = await fetch(url);
      const result = await response.json(); // result.default is your actual data array

      setProduct(result); // ✅ Don't stringify

      // Convert JSON object to a string (with pretty formatting)
      // const data = JSON.stringify(result.default, null, 2);

      // // Create a Blob with text content
      // const blob = new Blob([data], { type: "text/plain" });
      // const fileUrl = URL.createObjectURL(blob);

      // // Create and click the download link
      // const a = document.createElement("a");
      // a.href = fileUrl;
      // a.download = "product-data.txt";
      // document.body.appendChild(a);
      // a.click();

      // // Cleanup
      // document.body.removeChild(a);
      // URL.revokeObjectURL(fileUrl); // ✅ important to release memory
    } catch (error) {
      console.error("Failed to fetch product details", error);
      setProduct([])
    }
  };

  // ✅ Filter manufacturers based on selected product
  const filteredManufacturers = (product || [])
  .filter((item) => item.product === productKey)
  .map((item) => item.manufacturer);
const uniqueManufacturers = [...new Set(filteredManufacturers)];

const filteredModel = (product || [])
  .filter((item) => item.product === productKey && item.manufacturer === manufacturerKey)
  .map((item) => item.model);
const uniqueModel = [...new Set(filteredModel)];

const filteredVarient = (product || [])
  .filter((item) => item.product === productKey && item.manufacturer === manufacturerKey && item.model === modelKey)
  .map((item) => item.variant);
const uniqueVarient = [...new Set(filteredVarient)];

const filteredFuel = (product || [])
  .filter((item) => item.product === productKey && item.manufacturer === manufacturerKey && item.model === modelKey && item.variant === varientKey)
  .map((item) => item.fuel_type);
const uniqueFuel = [...new Set(filteredFuel)];




  useEffect(() => {
    fetchDataFromLocal()
    fetchproductFromLocal()
  }, [])
   const isError = (name) => {
    const fields = requiredFields || []; // fallback to empty array
    const error =
      showErrors &&
      fields.includes(name) &&
      !((stepData[name] ?? "").toString().trim());

    return error;
  };

  useEffect(() => {
    document.title = `Chaturvedi Motors Form || on Step2`
    setRequiredFields(["proposalType", "receiptNumber", "policyType", "receiptDate",
      "vehicleYear", "registrationDate", "chassisNumber",
      "engineNumber", "manufacturingYear", "rtoState", "rtoCity", "product", "manufacturerType", "model", "varience", "fueltype"])
 
//  console.log(requiredFields)
    }, [])

  useEffect(() => {
    setRtoData({
      rtoState: dataKey,
      rtoCity: stepData?.rtoCity,
      product: productKey,
      manufacturerType: manufacturerKey,
      model: modelKey,
      varience: varientKey,
      fueltype: stepData?.fueltype,
    });
    localStorage.setItem("rtoData", JSON.stringify(rtoData))
  }, [
    dataKey,
    stepData?.rtoCity,
    productKey,
    manufacturerKey,
    modelKey,
    varientKey,
    stepData?.fueltype,
  ]);


  useEffect(() =>{
    if(stepData?.rtoState === "" || !stepData?.rtoState){
      const temp = JSON.parse(localStorage.getItem('stepData'))
      const update = {...temp, 
        rtoCity: ""
      }
      localStorage.setItem("stepData", JSON.stringify(update))
    }
  },[stepData?.rtoState])

  useEffect(() =>{
    if(stepData?.product === "" || !stepData?.product){
      const temp = JSON.parse(localStorage.getItem('stepData'))
      const update = {...temp, 
        manufacturerType: "",
        model: "",
        varience: ""
      }
      localStorage.setItem("stepData", JSON.stringify(update))
    }
  },[stepData?.product])


  return (
    <div className="capitalize grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* Row 1 */}
      <div>
        <label className="block font-medium">Proposal Type <span className="text-[#f00]">*</span></label>
        <select
          name="proposalType"
          value={stepData?.proposalType}
          onChange={handleChangeStep}
          className={`w-full border custom-select ${showErrors && stepData?.proposalType === "" || !stepData?.proposalType ? "border-red-500" : "border-[#e6e6e6]"}  px-4 py-2 border-[#e6e6e6] rounded`}
        >
          <option value="">Select</option>
          <option value="New">New</option>
          <option value="Renewal">Renewal</option>
          <option value="Used">Used</option>
        </select>
         {showErrors && stepData?.proposalType === "" || !stepData?.proposalType && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div>
        <label className="block font-medium">Policy Type <span className="text-[#f00]">*</span></label>
        <select
          name="policyType"
          value={stepData?.policyType}
          onChange={handleChangeStep}
          className={`w-full border custom-select ${showErrors && stepData?.proposalType === "" || stepData?.policyType === "" || !stepData?.policyType ? "border-red-500" : "border-[#e6e6e6]"} px-4 py-2 border-[#e6e6e6] rounded`}
        >
          <option value="">Select</option>
          {stepData?.proposalType === "New" && (<><option value="1+5 Bundle Policy">1+5 Bundle Policy</option>
            <option value="5 Year TP Only Policy">5 Year TP Only Policy</option></>)}
          {stepData?.proposalType === "Renewal" && (<><option value="Package Policy">Package Policy</option>
            <option value="TP Only Policy">TP Only Policy</option>
            <option value="OD only Policy">OD only Policy</option></>)}
          {stepData?.proposalType === "Used" && (<>
            <option value="Package Policy">Package Policy</option>
            <option value="TP Only Policy">TP Only Policy</option>
          </>)}
        </select>
        {showErrors && stepData?.policyType === "" || !stepData?.policyType  &&(
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>

      {/* Row 2 */}
      <div>
        <label className="block font-medium">Receipt Number <span className="text-[#f00]">*</span></label>
        <input
          type="text"
          name="receiptNumber"
          value={stepData?.receiptNumber}
          onChange={handleChangeStep}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.receiptNumber === "" || !stepData?.receiptNumber ? "border-red-500" : "border-[#e6e6e6]"}  rounded`}
        />
         {showErrors && stepData?.receiptNumber === "" || !stepData?.receiptNumber && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div>
        <label className="block font-medium">Receipt Date <span className="text-[#f00]">*</span></label>
        <input
          type="date"
          name="receiptDate"
          value={stepData?.receiptDate}
          onChange={handleChangeStep}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.receiptDate === "" || !stepData.receiptDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        />
           {showErrors && stepData?.receiptDate === ""  || !stepData.receiptDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>

      {/* Row 3 */}
      <div>
        <label className="block font-medium">Vehicle Year <span className="text-[#f00]">*</span></label>
        <select
          name="vehicleYear"
          value={stepData?.vehicleYear}
          onChange={handleChangeStep}
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.vehicleYear === "" || !stepData?.vehicleYear ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        >
          <option value="">Select Year</option>
          {/* You can generate more years dynamically     */}
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
        </select>
{showErrors && stepData?.vehicleYear === "" || !stepData?.vehicleYear && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div>
        <label className="block font-medium">Registration Number <span className="text-[#f00]">*</span></label>
        <input
          type="text"
          name="registrationNumber"
          value={stepData?.registrationNumber}
          onChange={handleChangeStep}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.registrationNumber === "" || !stepData.registrationNumber ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        />
        {showErrors && stepData?.registrationNumber === "" || !stepData?.registrationNumber && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>

      {/* Row 4 */}
      <div>
        <label className="block font-medium">Registration Date <span className="text-[#f00]">*</span></label>
        <input
          type="date"
          name="registrationDate"
          value={stepData?.registrationDate}
          onChange={handleChangeStep}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.registrationDate === "" || !stepData.registrationDate ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        />
         {showErrors && stepData?.registrationDate === "" || !stepData?.registrationDate && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div>
        <label className="block font-medium">Chassis Number <span className="text-[#f00]">*</span></label>
        <input
          type="text"
          name="chassisNumber"
          value={stepData?.chassisNumber}
          onChange={handleChangeStep}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.chassisNumber === "" || !stepData?.chassisNumber ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        />
         {showErrors && stepData?.chassisNumber === "" || !stepData?.chassisNumber && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>

      {/* Row 5 */}
      <div>
        <label className="block font-medium">Engine Number <span className="text-[#f00]">*</span></label>
        <input
          type="text"
          name="engineNumber"
          value={stepData?.engineNumber}
          onChange={handleChangeStep}
          className={`w-full border px-4 py-2 ${showErrors && stepData?.engineNumber === "" || !stepData?.engineNumber ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        />
          {showErrors && stepData?.engineNumber === "" || !stepData?.engineNumber && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div>
        <label className="block font-medium">Manufacturing Year <span className="text-[#f00]">*</span></label>
     
        <select
           name="manufacturingYear"
          value={stepData?.manufacturingYear}
          onChange={handleChangeStep}
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.manufacturingYear === "" || !stepData?.manufacturingYear ? "border-red-500" : "border-[#e6e6e6]"} rounded`}
        >
          <option value="">Select Year</option>
          {/* You can generate more years dynamically     */}
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
        </select>
  {showErrors && stepData?.manufacturingYear === "" || !stepData?.manufacturingYear && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>

      {/* Row 6 */}
      <div>
        <label className="block font-medium">RTO State <span className="text-[#f00]">*</span></label>
        <select
          name="rtoState"
          value={stepData.rtoState}
          onChange={(e) => { setDataKey(e.target.value)
            handleChangeStep(e)
           }}
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.rtoState === "" || !stepData?.rtoState ? "border-red-500" : ""}`}
        >

          <option value="">Select State</option>
          {keys.map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </select>
         {showErrors && stepData?.rtoState === "" || !stepData?.rtoState && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div>
        <label className="block font-medium">RTO City <span className="text-[#f00]">*</span></label>
        <select
          name="rtoCity"
          value={stepData?.rtoCity}
          onChange={handleChangeStep}
          className={`w-full border custom-select px-4 py-2 ${showErrors && stepData?.rtoCity === "" || !stepData?.rtoCity ? "border-red-500" : ""} rounded`}
        >
          <option value="">Select City</option>
          {(result[dataKey] || []).map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </select>
           {showErrors && stepData?.rtoCity === "" || !stepData?.rtoCity && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>

      {/* Row 7 */}
      <div>
        <label className="block font-medium">Product <span className="text-[#f00]">*</span></label>
        <select
          name="product"
          value={stepData.product}
          onChange={(e) => {setProductKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.product === "" || !stepData?.product ? "border-red-500" : ""}`}
        >
          <option value="">Select Product</option>
          {[...new Set((product || []).map((item) => item.product))].map((prod, index) => (
            <option key={index} value={prod}>
              {prod}
            </option>
          ))}
        </select>
        {showErrors && stepData?.product === "" || !stepData?.product && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>



      <div>
        <label className="block font-medium">Manufactur Type <span className="text-[#f00]">*</span></label>
        <select
          name="manufacturerType"
          value={stepData.manufacturerType}
          onChange={(e) => {setManufacturerKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.manufacturerType === "" || !stepData?.manufacturerType ? "border-red-500" : ""}`}
          disabled={!productKey} // disables until product is selected
        >
          <option value="">Select Manufacturer</option>
          {uniqueManufacturers.map((manu, index) => (
            <option key={index} value={manu}>
              {manu}
            </option>
          ))}
        </select>
          {showErrors && stepData?.manufacturerType === "" && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>


      {/* Row 8 */}
      <div>
        <label className="block font-medium">Model <span className="text-[#f00]">*</span></label>
        <select
          name="model"
          value={stepData.model}
          onChange={(e) => {setModelKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.model === "" || !stepData?.model ? "border-red-500" : ""}`}
          disabled={!productKey} // disables until product is selected
        >
          <option value="">Select Model</option>
          {uniqueModel.map((menu, index) => (
            <option key={index} value={menu}>
              {menu}
            </option>
          ))}
        </select>
          {showErrors && stepData?.model === "" || !stepData?.model && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div>
        <label className="block font-medium">Varience <span className="text-[#f00]">*</span></label>
        <select
          name="varience"
          value={stepData.varience}
          onChange={(e) => {setVarientKey(e.target.value)
            handleChangeStep(e)
          }}
          className={`w-full border custom-select px-4 py-2  rounded ${showErrors && stepData?.varience === "" || !stepData?.varience ? "border-red-500" : ""}`}
        >
          <option value="">Select Varience</option>
          {uniqueVarient.map((menu, index) => (
            <option key={index} value={menu}>
              {menu}
            </option>
          ))}
        </select>
          {showErrors && stepData?.varience === "" || !stepData?.varience && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
      <div className="block">
        <label className="block font-medium">Fuel type <span className="text-[#f00]">*</span></label>
         <select
          name="fueltype"
          value={stepData.fueltype}
          onChange={handleChangeStep}
          className={`w-full border custom-select px-4 py-2 border-[#e6e6e6] rounded ${showErrors && stepData?.fueltype === "" || !stepData?.fueltype ? "border-red-500" : ""}`}
        >
          <option value="">Select Fuel Tpe</option>
          <option  value="DIESEL">DIESEL</option>
          <option  value="ELECTRIC">ELECTRIC</option>
          <option  value="PETROL">PETROL</option>
          <option  value="PETROL HYBRID">PETROL HYBRID</option>
          <option  value="CNG/LPG">CNG/LPG</option>
        </select>
         {showErrors && stepData?.fueltype === "" || !stepData?.fueltype && (
              <p className="text-sm text-red-500 mt-1">This field is required.</p>
            )}
      </div>
    </div>
  );
};

export default StepTwo;
