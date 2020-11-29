import React, {useContext} from 'react';
import { Route, Redirect }  from 'react-router-dom';
import { Context } from '../../utils/context';

const PrivateRoute = ({component: Component, ...rest}) => {
  const { userData } = useContext(Context);
  const username = userData.username
  return (
    <Route {...rest} render={(props) => username ? <Component {...props}/> : 
    <Redirect to={{pathname: '/login', state: { from: props.location }}}/>}/>
  )
}

export default PrivateRoute;