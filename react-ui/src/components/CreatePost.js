// import React, {useState, useRef} from 'react'
// import Button from '@material-ui/core/Button'
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import TextField from '@material-ui/core/TextField'
// import CheckButton from "react-validation/build/button";
// import CardMedia from '@material-ui/core/CardMedia';
// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
// import '../App.css'
// import UserService from '../services/user.service'

// export default function CreatePost(props) {
//     const form = useRef();
//     const checkBtn = useRef();

//     const [title, setTitle] = useState('')
//     const [body, setBody] = useState('')
//     const [successful, setSuccessful] = useState(false);
//     const [message, setMessage] = useState("");

//     const onChangeTitle = (e) => {
//         const title = e.target.value;
//         setTitle(title);
//       };
//       const onChangeBody = (e) => {
//         const body = e.target.value;
//         setBody(body);
//       };

//       const handlePost = (e) => {
//         e.preventDefault();
    
//         setMessage("");
//         setSuccessful(false);
    
//         form.current.validateAll();
    
//         if (checkBtn.current.context._errors.length === 0) {
//             UserService.createPost(title, body)
//           .then(
//             (response) => {
//               setMessage(response.data.message);
//               setSuccessful(true);
//             },
//             (error) => {
//               const resMessage =
//                 (error.response &&
//                   error.response.data &&
//                   error.response.data.message) ||
//                 error.message ||
//                 error.toString();
    
//               setMessage(resMessage);
//               setSuccessful(false);
//             }
//           );
//         }
//       };
//     return (
//         <div>
            
//         <Form onSubmit={handlePost} ref={form}>
//             <div>
//       <TextField className={classes.root} label="The Title" variant="filled" />
//       </div> 
//       <div>
//       <TextField style={{textAlign: 'left'}} className={classes.root} label="What is on your mind?" variant="outlined" multiline={true}/>
//       </div>
     
//             </Form>
            
//         </div>
//     )
// }
