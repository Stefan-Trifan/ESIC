window.addEventListener('message', event => {
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        let submitInfo = document.querySelectorAll('.contact-form-info .contact-form form input[type="submit"]');
        for (let i=0; i < submitInfo.length; i++){
            submitInfo[i].classList.add('submitinfo');
            submitInfo[i].setAttribute('id', 'submitinfo')
        }
        let submitAdmi = document.querySelectorAll('.contact-form-admi .contact-form form input[type="submit"]');
        for (let i=0; i < submitAdmi.length; i++){
            submitAdmi[i].classList.add('submitadmi');
            submitInfo[i].setAttribute('id', 'submitadmi')
        }
    }
 });