import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from '../services/user.service'
import TextField from '@material-ui/core/TextField';
import history from '../utils/history'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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


// const createPost = (props) => {
//   const form = useRef();
//   const checkBtn = useRef();
  
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");  
  // const [successful, setSuccessful] = useState(false);
  // const [message, setMessage] = useState("");

  // const onChangeTitle = (e) => {
  //   const title = e.target.value;
  //   setTitle(title);
  // };

  // const onChangeBody = (e) => {
  //   const body = e.target.value;
  //   setBody(body);
  // };
  

//   const handleRegister = (e) => {
//     e.preventDefault();
    // setMessage("");
    // setSuccessful(false);

//     form.current.validateAll();

//     if (checkBtn.current.context._errors.length === 0) {
      // UserService.createPost(title, body).then(
      //   (response) => {
      //     setMessage(response.data.message);
      //     setSuccessful(true);
      //   },
      //   (error) => {
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();

      //     setMessage(resMessage);
      //     setSuccessful(false);
      //   }
      // );
//     }
//   };

//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
        
//         <Form onSubmit={handleRegister} ref={form}>

        //   {!successful && (
        //     <div>
        //         <div><strong>Create Your Post</strong></div>
        //       <div className="form-group">
        //         <label htmlFor="title">Title</label>
        //         <Input
        //           type="text"
        //           className="form-control"
                  // name="title"
                  // value={title}
                  // onChange={onChangeTitle}
                  // validations={[required, vtitle]}
        //         />
        //       </div>

        //       <div className="form-group">
        //         <label htmlFor="body">Body</label>
        //         <Input
        //           type="text"
        //           className="form-control"
        //           name="body"
        //           value={body}
        //           onChange={onChangeBody}
        //           validations={[required]}
        //         />
        //       </div>
              

        //       <div className="form-group">
        //         <button className="btn btn-primary btn-block">Post</button>
        //       </div>
        //     </div>
        //   )
        // }

          // {message && (
          //   <div className="form-group">
          //     <div
          //       className={ successful ? "alert alert-success" : "alert alert-danger" }
          //       role="alert"
          //     >
          //       {message}
          //     </div>
          //   </div>
          // )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };


const createPost = () => {
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
  const handleSubmit = (event) => {
    event.preventDefault()    
    setMessage("");
    setSuccessful(false);
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
      )
  }


    return(
      <div>
        <form onSubmit={handleSubmit}>
          {!successful &&(
            <div>
            <div className="Register">
            <TextField
              id='title'
              label='Title'
              margin='normal'
              value={title}
              onChange={onChangeTitle}  
              required={true}                                  
              />
             </div>     
            
            <div className="Register">
            <TextField
              id='body'
              label='Body'
              multiline
              rowsMax='4'
              margin="normal"
              value={body}
              onChange={onChangeBody}
              required={true}
              />
              </div>
           
           <button type='submit'> Submit Post </button>
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
           </form>
        <br />
        <div className="button">
        {/* <button onClick={() => history.replace('/profile')}> Cancel </button> */}

        <Link to="/profile">
                 <Button variant="contained" color="white">
                   Back to Profile
                 </Button>
               </Link>
        </div>
      </div>
  )}


export default createPost;



