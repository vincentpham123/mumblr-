
import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import * as sessionActions from '../../store/session';
import { Redirect, NavLink,Link } from 'react-router-dom'
import Profilebutton from './ProfileButton';
import PostButton from './PostButton';
import LoginFormModel from '../LoginFormModal';
import './navigation.css'
const Navigation = ()=>{
    const sessionUser = useSelector(state=> state.session.user);
    const dispatch = useDispatch();
    let sessionLinks;
    const handleDemoButton=(event)=>{
        event.preventDefault();
        dispatch(sessionActions.login({ email: 'Demo-lition', password: 'password' }));
    }
    if (sessionUser){
        sessionLinks=(
            <>
            <li>
            <Profilebutton user={sessionUser} />
            </li>
            <li>
            <PostButton />
            </li>
            </>
        )
    } else {
        sessionLinks = (
            <>
            <li>
                <button onClick={(event)=>handleDemoButton(event)} className='demo-login'>
                    Demo
                </button>
            </li>
            <li>
            <LoginFormModel />
            </li>
            </>
        )
    };
    return (
        <>
        <header className='navBar-header'>
        <div className='title'>
            <Link to='/'>
                
                    mumblr.
                
            </Link>

        </div>
        <div className = 'navBody'>
            <ul className='navButtons'>
            <li>


            <Link className='linkedin' to='https://www.linkedin.com/in/vincent-pham-163347133/' target='_blank'>   
                <i className ="fa-brands fa-linkedin"></i>
            </Link>
            </li>
            <li>
                <Link className='github' to='https://github.com/vincentpham123/mumblr/wiki' target='_blank'>
                    <i className="fa-brands fa-github"></i>
                </Link>
                    
             </li>
                    {sessionLinks}
            </ul>
        </div>
        </header>
        </>
    )
}
export default Navigation;