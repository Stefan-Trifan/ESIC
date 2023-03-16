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
name_ga = document.querySelector('h1')
subtitle = document.querySelector('h1 + h2')
start = document.querySelectorAll('#data-start')
format = document.querySelectorAll('#data-format')
duration = document.querySelectorAll('#data-duration')
hours = document.querySelectorAll('#hours-info')
price = document.querySelectorAll('#data-price')
dscto_header = document.querySelectorAll('#data-dscto')
dscto_footer = document.querySelectorAll('#data-dscto-footer')
url_pay = document.querySelectorAll('a.clickadmi')
// holiday = document.querySelectorAll('#holiday')
url_pasarela = "https://professionalprogramsmit.com/gateway/" + lang + '/XXX/runway/order'


/*=============================================================*/
/* funcion convierte fecha en formato: dia, mes, año
/*=============================================================*/
function isValidDate(day, month, year) {
    var dteDate;
    month = month - 1;
    dteDate = new Date(year, month, day);
    return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
}
/*========================================================================*/
/* funcion convierte fecha en idioma-ENG para que la entienda el sistema
/*=======================================================================*/
function convertDateEsToEn(dateEs, formatReturn) {
    var patron = new RegExp("^([0-9]{1,2})([/])([0-9]{1,2})([/])(19|20)+([0-9]{2})$");
    if (dateEs.search(patron) == 0) {
        values = dateEs.split("/");
        // Revisamos que la fecha sea correcta
        if (isValidDate(values[0], values[1], values[2])) {
            // devuelve la fecha en formato ingles
            if (formatReturn == 2) {
                // puedes devolver un objeto fecha para trabajar con el

                return new Date(values[2], (parseInt(values[1]) - 1), values[0]);
            } else {
                // puedes devolver simplemente la fecha en formato cadena
                if (values[1].length <= 1) {
                    values[1] = '0' + values[1];
                }
                if (values[0].length <= 1) {
                    values[0] = '0' + values[0];
                }
                return values[2] + "/" + values[1] + "/" + values[0];
            }
        }
    }
    return "";
}

/*=============================================================*/
/*funcion para convertir fecha a string segun idioma de landing
/*=============================================================*/
function fechaString(date_fecha) {
    var f_format_eng = convertDateEsToEn(date_fecha, 1)
    const fecha = new Date(f_format_eng);
    //objeto en formato string de fecha
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    if ((lang_html == 'af-ZA') && (cod_ga.dataset.lang == 'en')) {
        lang_html = 'en-US'
    }
    return (fecha.toLocaleDateString(lang_html, options))
}
/*=============================================================*/
/* funcion reemplazar cadena de descuento con fecha XXX
/*=============================================================*/
function textDscto(cadena, fin_dscto) {
    if (cadena.includes('XXX')) {
        //se reemplaza el resultado por las XXX de la validación
        cadena = cadena.replace('XXX', fechaString(fin_dscto))
    } else if (cadena.includes('&')) {
        cadena = cadena.replace(' &', ',')
    }
    return cadena;
}

const BreakException = {};

fetch('../../assets/js/csvjson.json')
    .then(response => response.json())
    .then(data => {
        //entramos a cada obj(objeto) del arreglo
        try {
            data.forEach(obj => {
                console.log(obj)
                //comparámos el código GA para inyectar valores a la landing
                if (obj.cod_ga.toLowerCase().trim() === cod_ga.dataset.codga.toLowerCase()) {
                    name_ga.innerText = obj.program
                    subtitle.innerText = obj.subtitle
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
                    url_pay.forEach(element => {
                        /*================================*/
                        /*	SEGUIMIENTO DE LAS UTMS
                        /*================================*/
                        if (utmAux.includes('?utm')) {
                            var utmAdded = utmAux.split('?utm_')[1]
                            // element.href = url_pasarela.replace('XXX', obj.cod_pay) + '?utm_' + utmAdded
                            element.href = 'https://online.esic.edu/gateway/es/buy/runway/profile/XXX-XXX-admi' + '?utm_' + utmAdded
                            
                        } else {
                            // element.href = url_pasarela.replace('XXX', obj.cod_pay)
                            element.href = 'https://online.esic.edu/gateway/es/buy/runway/profile/XXX-XXX-admi'
                        }

                    });

                    /*================================*/
                    /*	REDES SOCIALES
                    /*================================*/
                    if (document.querySelector('#social-share')) {
                        var titleHTML = document.querySelector('title').innerText
                        document.querySelector('#social-1').href = 'mailto:?subject=' + titleHTML + '&body=' + obj.url_landing
                        document.querySelector('#social-2').href = 'https://www.facebook.com/sharer.php?u=' + obj.url_landing
                        document.querySelector('#social-3').href = 'https://api.whatsapp.com/send?text=' + titleHTML + ' - ' + obj.url_landing
                        document.querySelector('meta#url_fb').content = obj.url_landing
                    }

                    throw BreakException;

                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }

    })
    .catch(error => console.error(error))
