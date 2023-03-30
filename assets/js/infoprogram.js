var cod_ga,
    name_ga,
    subtitle,
    type_course,
    state,
    start,
    end,
    duration,
    hours,
    price,
    candidacy_fee,
    format,
    ceus,
    idioma_pgr,
    language,
    dscto_header,
    dscto_footer,
    end_dscto,
    hubs,
    round_1,
    round_2,
    round_3,
    price_r1,
    price_r2,
    price_r3,
    call,
    brochure,
    url_pay,
    img_home,
    url_web,
    url_landing,
    cod_pay,
    holiday,
    lang_html,
    lang,
    url_pasarela;

var utmAux = window.location.href

lang_html = document.querySelector('html').lang
lang = lang_html.toLowerCase().trim().slice(0, 2);
cod_ga = document.querySelector('meta#data-programs')
// url_pasarela = "https://online.esic.edu/gateway/" + lang + '/XXX'

const BreakException = {};

fetch('../../assets/js/csvjson.json')
    .then(response => response.json())
    .then(data => {
        //entramos a cada obj(objeto) del arreglo
        try {
            data.forEach(obj => {
                // console.log(obj)
                //comparámos el código GA para inyectar valores a la landing
                if (obj.cod_ga.toLowerCase().trim() === cod_ga.dataset.codga.toLowerCase()) {

                    name_ga = document.querySelector('#data-name')

                    start = document.querySelectorAll('#data-start')
                    format = document.querySelectorAll('#data-format')
                    duration = document.querySelectorAll('#data-duration')
                    hours = document.querySelectorAll('#hours-info')
                    price = document.querySelectorAll('#data-price')
                    dscto_header = document.querySelectorAll('#data-dscto')
                    dscto_footer = document.querySelectorAll('#data-dscto-footer')
                    // url_pay = document.querySelectorAll('a.clickadmi')
                    // holiday = document.querySelectorAll('#holiday')

                    name_ga.innerText = obj.program
                    if (document.querySelector('data-subtitle')) {
                        subtitle = document.querySelector('data-subtitle')
                        subtitle.innerText = obj.subtitle
                    }

                    start.forEach(element => {
                        element.innerText = fechaString(obj.start)
                    });
                    format.forEach(element => {
                        element.innerText = obj.format
                    });
                    duration.forEach(element => {
                        element.innerText = obj.duration
                    });
                    hours.forEach(element => {
                        element.innerText = obj.hours
                    });
                    price.forEach(element => {
                        element.innerText = obj.price
                    });
                    dscto_header.forEach(element => {
                        element.innerText = textDscto(obj.dscto_header, obj.end_dscto)
                    });
                    dscto_footer.forEach(element => {
                        element.innerText = obj.dscto_footer
                    });
                    //url_pay.forEach(element => {
                        /*================================*/
                        /*	SEGUIMIENTO DE LAS UTMS
                        /*================================*/
                        // if (utmAux.includes('?utm')) {
                        //     var utmAdded = utmAux.split('?utm_')[1]
                            // element.href = url_pasarela.replace('XXX', obj.cod_pay) + '?utm_' + utmAdded

                        // } else {
                            // element.href = url_pasarela.replace('XXX', obj.cod_pay)
                        // }

                    // });

                    throw BreakException;

                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }

    })
    .catch(error => console.error(error))
