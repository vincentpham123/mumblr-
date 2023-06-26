import { useSelector } from "react-redux"
import { useState, useRef,useEffect } from "react"
import { createPost } from "../../../store/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NewPostInput from "../NewPostInputs";
import '../styling/newtextpost.css';
const NewTextPost = () => {
    const [bodyCheck,setBodyCheck] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [paragraphs,setParagraphs] = useState({1:''});
    const [photo1,setPhoto1] = useState(null);
    const [photo2,setPhoto2] = useState(null);
    const [photo3,setPhoto3] = useState(null);
    const [photo4,setPhoto4] = useState(null);
    const [currentPhotoIndex,setCurrentPhotoIndex] = useState(1);
    const sessionUser = useSelector(state=>  state.session.user);
   

    useEffect(()=>{
        if(Object.values(paragraphs).some(paragraph=>paragraph.trim().length>0) ) {
            setBodyCheck('');
        } else {
            setBodyCheck(true);
        }
    },[paragraphs]);
    
    const handleFile = ({currentTarget}) => {
       
        //need data-type of the input to set paragraph to photo
        const file = currentTarget.files[0];
     
        // need to pass down the currentPhotoIndex to each input
        switch (currentPhotoIndex) {
            case 1:
                setPhoto1(file);
                setParagraphs({...paragraphs,[currentTarget.dataset.type]: 'photo1'});
                setCurrentPhotoIndex(2);
                break;
            case 2:
                setPhoto2(file);
                setParagraphs({...paragraphs,[Object.keys(paragraphs).length+1]: ''})
                setCurrentPhotoIndex(3);
                break;
            case 3: 
                setPhoto3(file);
                setParagraphs({...paragraphs,[Object.keys(paragraphs).length+1]: ''})
                setCurrentPhotoIndex(4);
            case 4:
                setPhoto4(file);
                setParagraphs({...paragraphs,[Object.keys(paragraphs).length+1]: ''})
                break;
            default: 
                break;
        }
        setParagraphs({...paragraphs,[Object.keys(paragraphs).length+1]: ''});

        
       
    }
    const handleTitleKeyDown = (event) => {
        console.log(event.key);
        if (event.key==='Enter'){
            setTimeout(()=>{
                event.target.nextElementSibling.focus()
            },0);
        }
    
         setTitle(event.target.innerText);
         console.log(title);
    }
    const handleKeyDown = (event) => {
        console.log(event.key);
        console.log(event.target.innerText);
    
        if(event.key !== 'Enter' && event.key!=='ArrowDown' && event.key!=='ArrowUp'){
            setTimeout(()=>{
                const pindex = event.target.dataset.type
            
                setParagraphs({...paragraphs,[pindex]: event.target.innerText});
            },0);
        }
            console.log(paragraphs);
  
     
      
    
        if (event.key==='Enter'){
            console.log(event.key);
            event.preventDefault();
            const newIndex = Object.keys(paragraphs).length+1;
            setParagraphs({
                ...paragraphs,
                [newIndex]: ''
            })
            console.log(paragraphs);
            setTimeout(()=>{
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                currentElement.nextElementSibling.querySelector('p').focus();
            },10);
            
        }
        if (event.key==='ArrowDown'){
            event.preventDefault();
            setTimeout(()=>{
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                if(currentElement.nextElementSibling && currentElement.nextElementSibling.querySelector('p') ) {
                    const nextP = currentElement.nextElementSibling.querySelector('p');
                    nextP.focus();
                    const range = document.createRange();
                    range.selectNodeContents(nextP);
                    range.collapse(false);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                };
            },10);
            
        }
        if (event.key==='ArrowUp'){
            event.preventDefault();

            console.log('event arrow down');
            setTimeout(()=>{
                let currentElement=event.target;
                while(currentElement.parentNode && !currentElement.parentNode.matches('.textbox-contents')){
                    currentElement=currentElement.parentNode;
                }
                if (!currentElement.previousElementSibling.matches('h1') && currentElement.previousElementSibling.querySelector('p')) {
                    const prevP = currentElement.previousElementSibling.querySelector('p');
                    prevP.focus();
                    const range = document.createRange();
                    range.selectNodeContents(prevP);
                    range.collapse(false); 
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            },10);
            
        }
        console.log(paragraphs);
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(bodyCheck);
        console.log(Object.values(paragraphs).join('\n'));
   
        
        dispatch(createPost({title,body:Object.values(paragraphs).join('\n') ,author_id: sessionUser.id}))
        history.go(-2);
    }

    const disableButton = () => {
        return bodyCheck ? '' : 'disabled'
    }

    
return (
    <>
    <div className='text-post-container'>
        <div className='postheader-container'>
            <div className='postHeader-body'>
            {/* for the left side of the header */}
                <div className='postheader-left'>
                    <div className="post-username">{sessionUser.username}</div>
                </div>
                {/* button for the options on the right */}
                <div className='postheader-right'>
                    <button className='post-options'>
                        <i className='fa-solid fa-gear'></i>
                    </button>
                </div>
            </div>
        </div>
            {/* start of the text area */}
            <div className='newtext-container'>
                <div className = 'newtext-body'>
                        <div className='text-box'>
                            <div className='textbox-contents'>
                                <h1 onKeyDown={event=>handleTitleKeyDown(event)} className="contentEdit text-title" contentEditable='true'></h1>
                                {Object.keys(paragraphs).map((paragraph,index)=>{
                                return <NewPostInput handleKeyDown={handleKeyDown} index={index} handleFile={handleFile} photoIndex={currentPhotoIndex}/>
                                })}
                               
                            </div>
                        </div>
                    <div className='text-footer'>
                        {/* make this button a div to avoid clashing with the submit button */}
                        <button className='close-text' onClick={()=>history.go(-2)}>Close</button>
                        <button disabled={bodyCheck} className='text-submit' onClick={handleSubmit}>Post Now</button>
                    </div>
                </div>

            </div>
        
    </div>
            
            
        
    </>
)

    // have an option for files, 
    //optional 
}

export default NewTextPost;