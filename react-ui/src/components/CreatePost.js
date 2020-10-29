import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from '../services/user.service'


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const vtitle = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The Title must be between 3 and 20 characters.
      </div>
    );
  }
};


const createPost = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");  
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeBody = (e) => {
    const body = e.target.value;
    setBody(body);
  };
  

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.createPost(title, body).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        
        <Form onSubmit={handleRegister} ref={form}>

          {!successful && (
            <div>
                <div><strong>Create Your Post</strong></div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                  validations={[required, vtitle]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="body">Body</label>
                <Input
                  type="text"
                  className="form-control"
                  name="body"
                  value={body}
                  onChange={onChangeBody}
                  validations={[required]}
                />
              </div>
              

              <div className="form-group">
                <button className="btn btn-primary btn-block">Post</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default createPost;



