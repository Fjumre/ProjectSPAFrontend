import { useParams } from "react-router-dom";


function Post(){
    let params= useParams();
      return(
        <>
        <h1>Post: {params.postid}</h1>
        
        </>
      )
    }


    export default Post;