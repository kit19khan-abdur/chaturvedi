const getSession = async() =>{

    // const res = await fetch('https://5ljsrljv5i.execute-api.ap-south-1.amazonaws.com/CustomCitiesOptions/webhook/cities')
    // const data = await res.json()
    // return data
    const stepData = JSON.parse(localStorage.getItem("stepData"));
    const rtoData = JSON.parse(localStorage.getItem("rtoData"));
    const chaturvediFormData = JSON.parse(localStorage.getItem("chaturvediFormData"));
    return {
        stepDatas: stepData,
        rtoData: rtoData,
        chaturvediFormData: chaturvediFormData,
    }
}

export default getSession