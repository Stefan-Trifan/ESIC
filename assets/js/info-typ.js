var cod_ga,
    name_ga,
    subtitle,
    type_course,
    call,
    brochure,
    url_pay,
    url_landing,
    cod_pay,
    lang_html,
    lang,
    url_pasarela;

var utmAux = window.location.href

lang_html = document.querySelector('html').lang
lang = lang_html.toLowerCase().trim().slice(0, 2);
cod_ga = document.querySelector('meta#data-programs')

// holiday = document.querySelectorAll('#holiday')
//url_pasarela = "https://professionalprogramsmit.com/gateway/" + lang + '/XXX/runway/order'

const BreakException = {};

fetch('../../assets/js/csvjson.json')
    .then(response => response.json())
    .then(data => {
        //entramos a cada obj(objeto) del arreglo
        try {
            data.forEach(obj => {
                // console.log(obj)
                //comparámos el código GA para inyectar valores a la landingname_ga = document.querySelector('h1')

                if (obj.cod_ga.toLowerCase().trim() === cod_ga.dataset.codga.toLowerCase()) {

                    if (document.querySelector('#data-subt')) {
                        subtitle = document.querySelector('#data-subt')
                        subtitle.innerText = obj.subtitle
                    }
                    brochure = document.querySelector('a.clickinfo')
                    url_pay = document.querySelector('a.clickadmi')

                    brochure.href = obj.brochure
                    name_ga.innerText = obj.program
                    brochure.innerText = obj.brochure

                    
                    /*================================*/
                    /*	SEGUIMIENTO DE LAS UTMS
                    /*================================*/
                    if (utmAux.includes('?utm')) {
                        var utmAdded = utmAux.split('?utm_')[1]
                        // element.href = url_pasarela.replace('XXX', obj.cod_pay) + '?utm_' + utmAdded
                        url_pay.href = obj.url_pay + '?utm_' + utmAdded

                    } else {
                        // element.href = url_pasarela.replace('XXX', obj.cod_pay)
                        url_pay.href = obj.url_pay
                    }


                    throw BreakException;

                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }

    })
    .catch(error => console.error(error))