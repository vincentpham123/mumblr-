import ShowPost from "../posts/showPost";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as postActions from "../../store/posts";
const TodayDashboard = () =>{
    const sessionUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const randomPost = Math.floor(Math.random()*50)+1;
    console.log(randomPost);
    const post = useSelector(state=>state.posts[83])
    useEffect(()=>{
        dispatch(postActions.fetchPosts());
    },[]);
    if (sessionUser) return <Redirect to="/" />;
    //all Today dashboard will be in here
    //select posts that were reblogged by 
    //todayonmumblr
    // in seeding, need to have posts reblogged by todayonmumblr
    return (
        <ShowPost post={post} />
    );




}

export default TodayDashboard;