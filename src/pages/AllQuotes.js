import React ,{useEffect , Fragment} from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import {getAllQuotes} from "../lib/api"
import NoQuotesFound from "../components/quotes/NoQuotesFound"

 
function AllQuotes() {
  const {sendRequest , status , data:loadedQuotes , error} = useHttp(getAllQuotes,true);

  useEffect(()=>{
    sendRequest();
  },[sendRequest]);

if(status==="pending"){
  return <div className="centered">
    <LoadingSpinner/>
  </div>
}

if(error){
  return <p className="centered focused"> {error} </p>
}

if(status === "completed" && (!loadedQuotes ||loadedQuotes.length === 0 )){
  return <NoQuotesFound/>
}

  return (
    <Fragment>
      <h1>All Quotes </h1>
      <QuoteList quotes={loadedQuotes}/>
    </Fragment>
  );}

export default AllQuotes;
