import { useState, Fragment } from "react";
import { Prompt } from "react-router-dom";
import { useForm } from "react-hook-form";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  function submitFormHandler(data) {
    props.onAddQuote(data);
    reset();
  }

  function focusHandler() {
    setIsEntering(true);
  }
  function clickHandler() {
    setIsEntering(false);
  }

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={() =>
          "Are you sure you want to leave ? All your entered data will be lost"
        }
      />
      <Card>
        <form
          onFocus={focusHandler}
          className={classes.form}
          onSubmit={handleSubmit(submitFormHandler)}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              {...register("author", { required: "Author is required" })}
            />
            <p className={classes.invalid}>{errors.author?.message}</p>
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="5"
              {...register("text", { required: "the text is required" })}
            ></textarea>
            <p className={classes.invalid}>{errors.text?.message}</p>
          </div>
          <div className={classes.actions}>
            <button onClick={clickHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
