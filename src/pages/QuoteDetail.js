import React, { Fragment , useEffect } from "react";
import { Route, useParams, Link } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

function QuoteDetail() {
    const params = useParams();
    const {quoteId} = params;
const {sendRequest , status , data:loadQuote , error} = useHttp(getSingleQuote,true);

useEffect(() =>{
  sendRequest(quoteId);
}, [sendRequest, quoteId]);

if (status === "pending"){
  return <div className="centered">
    <LoadingSpinner/>
     </div>
}

if (error){
  return <p className="centered"> {error}</p>
}

if(!loadQuote.text){
  return <p> No Quote Found </p>
}


  return (
    <Fragment>
      <h1>Quote Detail </h1>
      <HighlightedQuote text={loadQuote.text} author={loadQuote.author} />

      <Route path="/quotes/:quoteId" exact>
        <Link
          to={`/quotes/${params.quoteId}/comments`}
          className="centered btn--flat"
        >
          Load Comments
        </Link>
      </Route>

      <Route path="/quotes/:quoteId/comments">
        <Comments />
      </Route>
    </Fragment>
  );
}

export default QuoteDetail;
