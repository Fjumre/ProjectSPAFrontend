import TodaysList from "../services/TodaysList";



function TodayToDo(){
    return(
      <>
      <h1>ToDo</h1>
      <li>
        <ol>
          <TodaysList/>
        </ol>
      </li>
  
      </>
    )
  }


  export default TodayToDo;