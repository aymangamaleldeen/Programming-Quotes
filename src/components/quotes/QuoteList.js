import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";


function sortquotes (quotes){
quotes.sort((a,b) => {
if(a > b) {
  return 1
}else {
  return -1
}
})
}

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const isAscending = search.get("sort") === "asc";

  function clickSortingHandler() {
    history.push("/quotes?sort=" + (isAscending ? "des" : "asc"));
    sortquotes(props.quotes)
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={clickSortingHandler}> 
          Sort {isAscending ? "Descending" : "Ascending"} 
        </button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
