import {useState,useEffect} from 'react';

import { Link, useHistory } from 'react-router-dom';
import PostCircle from './PostCircle';
import { Modal } from '../Context/Modal';
import PostSelection from './PostSelection';
const NewPost = () =>{
    const [showSelection,setShowSelection] = useState(true);
    // to go back if a user clicks on the background
    const history = useHistory();
    const handleOnClick =()=>{
        history.goBack();
    }
    // post selection will pass in postType and the correct component
    // will be rendered based on the selection
    // have useEffect that will trigger when postType is selected
    // will set a variable equal to the type selected
    return (
        <>
        {showSelection &&
            <Modal onClose={handleOnClick}>
                <PostSelection showSelection={setShowSelection}/>
            </Modal>
        }
        </>
    )
}

export default NewPost;