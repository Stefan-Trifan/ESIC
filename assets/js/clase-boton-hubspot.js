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

        // function filtrar() {
        //     var nombre = document.querySelector('input[name="firstname"]').value;
        //     var apellido = document.querySelector('input[name="lastname"]').value;
        //     var url = "https://online.esic.edu/es/certificados-cxo/chief-marketing-officer-cmo-esp-typinfo.html?nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);
        //     document.location.href = url;
        //     console.log()
        // }
        // document.querySelector('.submitinfo').addEventListener('click', filtrar)
    }
 });