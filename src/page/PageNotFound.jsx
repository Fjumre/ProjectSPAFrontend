import { useNavigate } from "react-router-dom";



function PageNotFound(){

    const navigate= useNavigate();
  
    return(
      <>
      <h1>404: Page not found</h1>
      <button onClick={()=> navigate(-1)}>Back</button><br/>
      <button onClick={()=> navigate('/home')}>Back to homepage</button>
      </>
    )
  }



export default PageNotFound;