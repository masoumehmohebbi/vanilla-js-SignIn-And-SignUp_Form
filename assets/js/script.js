let $ = document,
    pannelButtons = $.querySelector('.pannel-buttons'),
    sectionElem = $.querySelector('section'),
    inputName = $.querySelector('input[type = "text"]')
    inputEmails = $.querySelectorAll('input[type = "email"]')
    inputPasswords = $.querySelectorAll('input[type = "password"]')
    placeholderSpans = $.querySelectorAll('.placeholder-span')
    eyeIcons = $.querySelectorAll('.eyeIcons')
    signInBtn = $.querySelector('#sign-in-btn')
    signOutBtn = $.querySelector('#sign-out-btn')
    modal = $.querySelector('.modal-container')
    modalText = $.querySelector('.modal-container p')
    emailSignInForm = $.querySelector('#signIn-email')
    emailSignOutForm = $.querySelector('#signOut-email')


function topPlaceHolder(e) {
   e.target.nextElementSibling.style.top ="-27px"
   e.target.nextElementSibling.style.transition ="top 0.6s ease-in-out "
}
function downPlaceHolder(e) {
    if (e.target.value == "") {
        e.target.nextElementSibling.style.top ="0px" 
    }
}
function toggleEyeIcon(e) {
    e.target.parentNode.classList.toggle('eye') 

    if ( e.target.parentNode.classList.contains('eye')) {
        e.target.parentNode.previousElementSibling.previousElementSibling.type = "text"
        e.target.parentNode.previousElementSibling.previousElementSibling.style.paddingLeft = "2rem"
    }else{
        e.target.parentNode.previousElementSibling.previousElementSibling.type = "password"
    }
}
let redDot = $.querySelector('.red-dot'),
    greenDot = $.querySelector('.green-dot')
    redDotSignOut = $.querySelector('.red-dot-sOut')
    greenDotSignOut = $.querySelector('.green-dot-sOut')
    pattern =  /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function emailValidation(email) {
    let inputEmailValue = email.value;
        // pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!inputEmailValue.match(pattern)) {
        modal.style.display = "block"
        modal.style.transition = "all 0.6s ease-in-out"
        modalText.innerHTML = "لطفا ایمیل خود را درست وارد نمایید"

        setTimeout(() => {
            modal.style.display = "none"
            modal.style.transition = "display 0.6s"

            redDot.style.display = "none"
            redDotSignOut.style.display = "none"
        }, 4000);
    }
}
    

// *addEventListeners ----- 
pannelButtons.addEventListener('click', ()=>{
    sectionElem.classList.toggle('move')
})

inputName.addEventListener('focus', topPlaceHolder)
inputName.addEventListener('blur', downPlaceHolder) 

placeholderSpans.forEach(element => {
    element.addEventListener('click', ()=>{
        element.previousElementSibling.focus()
    })
});

inputEmails.forEach(inputEmail =>{
   inputEmail.addEventListener('focus', topPlaceHolder)
   inputEmail.addEventListener('blur', downPlaceHolder) 
})

inputPasswords.forEach(inputPassword =>{
    inputPassword.addEventListener('focus', topPlaceHolder)
    inputPassword.addEventListener('blur', downPlaceHolder)
})
eyeIcons.forEach(eyeIcon =>{
    eyeIcon.addEventListener('click' , toggleEyeIcon)
})

signInBtn.addEventListener('click', ()=>{
    emailValidation(emailSignInForm)

    if (!emailSignInForm.value.match(pattern)) {
        redDot.style.display="block"
        greenDot.style.display = "none"
    }else{
        redDot.style.display="none"
        greenDot.style.display = "block"
    }
})
signOutBtn.addEventListener('click', ()=>{
    emailValidation(emailSignOutForm)
    if (!emailSignOutForm.value.match(pattern)) {
        redDotSignOut.style.display="block"
        greenDotSignOut.style.display = "none"
    }else{
        redDotSignOut.style.display="none"
        greenDotSignOut.style.display = "block"
    }
})

// *Custom- menu
let contextMenu = $.querySelector('#contextMenu'),
    copyElem = $.querySelector('#li-copy'),
    pasteElem = $.querySelector('#li-paste'),
    confirmPassElem = $.querySelector('.confirmPass-input'),
    cutElem = $.querySelector('#li-cut'),
    pElem = $.querySelector('.pElem'),
    refreshElem = $.querySelector('#li-refresh'),
    customMenuSignIn = $.querySelector('.customMenu-signIn'),
    customMenuSignOut = $.querySelector('.customMenu-signOut')

function contextMenuHandler(event) { 
    event.preventDefault()  

    if (contextMenu.style.display === "none") {   
        contextMenu.style.top = event.pageY + "px"
        contextMenu.style.left =  event.pageX + "px"
        contextMenu.style.display = "block"

    }else{
        contextMenu.style.top = event.pageY + "px"
        contextMenu.style.left =  event.pageX + "px"
    } 
}
function clickHandler() {
    contextMenu.style.display = "none"
}

document.documentElement.addEventListener('contextmenu', contextMenuHandler) 
document.documentElement.addEventListener('click', clickHandler) 


function getSelectedText() {
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (window.document.getSelection) {
        txt =window.document.getSelection();
    } else if (window.document.selection) {
        txt = window.document.selection.createRange().text;
    }
    // alert(txt); 

    copyElem.addEventListener('click',()=>{
        navigator.clipboard.writeText(txt); 
    })
    
    pasteElem.addEventListener('click', ()=>{
        navigator.clipboard.readText()
        .then(txt => {
            // confirmPassElem.value = txt
            emailSignOutForm.value = txt
            
          })
    })

    confirmPassElem.addEventListener('paste',(e)=>{
        e.preventDefault()
        modal.style.display = "block"
        modal.style.transition = "all 0.6s ease-in-out"
        modalText.innerHTML = "در این فیلد نمی توانید درج کنید"
        setTimeout(() => {
            modal.style.display = "none"
            modal.style.transition = "display 0.6s ease-in-out"
        }, 4000);
    })
    // cutElem.addEventListener('click', ()=>{
        
    //     navigator.clipboard.writeText(txt)
     
    //     pElem.innerHTML= pElem.innerHTML.replace(txt, "")
    // })

}


refreshElem.addEventListener('click', ()=>{
  window.location.reload();  
})
customMenuSignIn.addEventListener('click',()=>{
    sectionElem.classList.toggle('move')
})
