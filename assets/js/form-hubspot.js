const form_Id = document.querySelector('#data-programs').dataset.form

function formHs(){
    hbspt.forms.create({
        region: "na1",
        portalId: "3391024",
        formId: form_Id,
        onFormSubmit: function ($form) {
            try {
                var codigo_pais = $form.find('select[id*="phone_ext-"]').val()
                var prefijo = $form.find('input[id*="phone-"]').val().split(
                    ' ')[0].trim();
                var pais = $form.find(
                    'select[id*="phone_ext-"] option:selected').text()
                if (pais.includes('(')) {
                    pais = pais.split('(')[0].trim();
                }
                $form.find('input[name="iso_codigo_pais"]').val(codigo_pais);
                $form.find('input[name="iso_prefijo"]').val(prefijo);
                $form.find('input[name="iso_pais"]').val(pais);
            } catch (error) {
                console.log('');
            }
        }
    });
}

window.addEventListener('message', event => {
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        let submitInfo = document.querySelectorAll('.contact-form form input[type="submit"]');
        for (let i=0; i < submitInfo.length; i++){
            submitInfo[i].classList.add('submitinfo');
            submitInfo[i].setAttribute('id', 'submitinfo')
        }
    }
 });