import React, {useState, useReducer} from 'react';
import ReactDOM from 'react-dom';


import {login} from './util';

function reducer(state, action){
    switch(action.type){
        case 'login':
            {
                return {...state, isLoggedIn: true, errorText: ""};
            }
        case 'error':
            {
                return {...state, errorText: "Incorrect username or password", password: "", secondPassword: ""};
            }
        case 'disabled':
            {
                return {...state, isDisabled: action.off };

            }   
        case 'logout':
            {
                return {...state, isLoggedIn: false};
            }
        case 'setName':
            {
                return {...state, userLogin: action.field}

            }
        case 'setPass':{
            return {...state, password: action.field,errorText: state.secondPassword===action.field ? "": "Password doesn`t match"}
            }
        case 'confirmPass':{
            return {...state, secondPassword: action.field,errorText: state.password===action.field ? "":"password doesn`t match"}
            }    

        default: 
            return state;
    }



}



function App(props){


    // const [userLogin, setLogin] = useState('');
    // const [password, setPassword] = useState('');
    // const [isDisabled, setIsDisabled] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [errorText, setErrorText]  = useState('');



    let initialState = {
        userLogin: "",
        password: "",
        isDisabled: false,
        isLoggedIn: false,
        errorText: "",
        secondPassword: ""
    }


    const [state, dispatch] = useReducer(reducer, initialState);


    
    let {userLogin,
        password,
        isDisabled,
        isLoggedIn,
        errorText,
        secondPassword
        } = state;


    const doLogin = async (e)=>{
        
        //setIsDisabled(true);
        dispatch( {type: 'disabled', off: true}); 
        
        
        e.preventDefault()
        
        try{
            await login({username:userLogin, password:password, secondPassword:secondPassword});
            dispatch( {type: 'login'});
            //setIsLoggedIn(true);
            //setErrorText("");

        }
        catch(e){
            dispatch( {type: 'error'});
            //setPassword('');
            //setErrorText("Incorrect username or password");
        }
        
        dispatch( {type: 'disabled', off: false}); 
        //setIsDisabled(false);

        return false;
    }
    
    return (
        <div>
            { isLoggedIn ? <><h1>Hello {userLogin} </h1> <button onClick={(e)=>{dispatch( {type:'logout'} ) } }>Logout</button></> : 

            <form className="form" onSubmit={(e)=>{doLogin(e)}}>
                <p> Login details:</p>
                <span>{errorText}</span>
                <input type="text" placeholder="username" onChange={(event)=>{ dispatch({type: 'setName', field: event.currentTarget.value})   }} value={userLogin} />
                <input type="password" placeholder="password" autoComplete="new-password" onChange={(event)=>{ dispatch({type: 'setPass', field: event.currentTarget.value}) }} value={password}/>
                <input type="password" placeholder="secondPassword" autoComplete="new-password" onChange={(event)=>{ dispatch({type: 'confirmPass', field: event.currentTarget.value}) }} value={secondPassword}/>
                <button type="submit" disabled={isDisabled}>Login</button>
        

            </form>
            }
        </div>


    );


}


ReactDOM.render(<App />, document.getElementById('root'));

