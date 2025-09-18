import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MultiStepForm from "./MultiStepForm"
import "./index.css"

const APP = () =>{
  const route = createBrowserRouter([
    {
      path: "/",
      element: <>
      <MultiStepForm />
      </>
    },
  ])
  return(
    <>
    <RouterProvider  router={route}/>
    </>
  )
}

export default APP;