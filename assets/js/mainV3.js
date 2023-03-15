/** ROTURA DE PANTALLA PARA RESPONSIVE */
/** Los números cambian dependiendo del ajuste del usuario */
const minWidth = 992;
const maxWidth = 991;
var minimo = '(min-width: ' + minWidth + 'px)'
var maximo = '(max-width: ' + maxWidth + 'px)'

var cabecera = document.querySelector('#cabecera')
var barFixed = document.querySelector('.bar-fixed')
var descuento = document.querySelector('#descuento')
var formResp = document.querySelector('#content-form-responsive')

function paddingFormResp(){
    formResp.style.paddingTop = (document.querySelector('#descuento').clientHeight * 1.5) + 'px'
}

function startClass(){
    console.log(screen.width)
    if (screen.width >= minWidth ) {
        barFixed.classList.add('no-fixed') //pone la clase no-fixed
        descuento.classList.remove('no-fixed')
    } else {
        barFixed.classList.remove('no-fixed') //quita la clase no-fixed
        descuento.classList.add('no-fixed')
        descuento.classList.remove('padding-dscto-mobile')
        paddingFormResp()
    }
}
startClass()
/*================================================================*/
/* RESTAURA LOS ELEMENTOS EN LA BARRA DE INFORMACIÓN DEL PROGRAMA
/*================================================================*/
function restore(){
    // descuento.classList.remove('no-fixed')
    barFixed.classList.add('no-fixed')
    barFixed.classList.remove('pos-fixed')
    document.querySelector('.bar-fixed .content-info-program').classList.add('container')
    document.querySelector('.bar-fixed .content-info-program').classList.remove('container-fluid', 'padding-lr-5')
    document.querySelector('.info-date .change-element').classList.remove('d-none')
    document.querySelector('.info-date a[role="button"]').classList.add('d-none')
    document.querySelector('#descuento').classList.remove('padding-dscto-mobile')
    document.querySelector('.content-info-date').lastElementChild.classList.remove('center-center')
    

    var imgInfo = document.querySelectorAll('.info-date')
    imgInfo.forEach(element => {
        element.children[0].classList.remove('d-none')
        element.classList.remove('margin-img-mobile')
    });

    var titInfo = document.querySelectorAll('.tit-info')
    titInfo.forEach(element => {
        element.style.color = 'var(--negro-chicago)'
    });
}
/*==============================================================*/
/* POSICIONA LA BARRA DE INFO-PROGRAMA EN FIXED SEGÚN PANTALLA
/*==============================================================*/
function infoFixed(){
    
    //posición bottom de info-date con respecto al top DOM  
    var positionInfoDate = document.querySelector('.content-info-date').getBoundingClientRect().bottom

    //posición bottom de cabecera con respecto al top DOM 
    var positionHead = cabecera.getBoundingClientRect().bottom
   

    if (window.matchMedia(minimo).matches) {
        if ((positionHead) <= 0) {
            
            // AÑADIR Y QUITAR CLASES A ELEMENTOS
            barFixed.classList.remove('no-fixed')
            barFixed.classList.add('pos-fixed')
            document.querySelector('.bar-fixed .content-info-program').classList.remove('container')
            document.querySelector('.bar-fixed .content-info-program').classList.add('container-fluid')
            document.querySelector('.info-date .change-element').classList.add('d-none')
            document.querySelector('.info-date a[role="button"]').classList.remove('d-none')
            document.querySelector('#descuento').classList.add('padding-dscto-mobile')
            document.querySelector('.content-info-date').lastElementChild.classList.add('center-center')
            //
            var imgInfo = document.querySelectorAll('.info-date')
            imgInfo.forEach(element => {
                element.children[0].classList.add('d-none')
                element.classList.add('margin-img-mobile')
            });
            
            var titInfo = document.querySelectorAll('.tit-info')
            titInfo.forEach(element => {
                element.style.color = 'var(--rojo-chicago)'
            });

        } else {
           restore()
        }
    } else {
        paddingFormResp()
        
        if (positionInfoDate <= 0) {
            descuento.classList.add('pos-fixed')
            
        } else {
            descuento.classList.remove('pos-fixed')
        }
    }
}

/*==============================================================*/
/* RESTAURAR ELEMENTOS SEGUN TAMAÑO DE PANTALLA, DINÁMICAMENTE
/*==============================================================*/
function reportWindowSize() {
    //obtenemos el ancho de pantalla dinámicamente
    var screenWidth = window.innerWidth
    if (screenWidth < minWidth){
        restore()
        startClass()
        paddingFormResp()
    }
    if (screenWidth >= minWidth) {
        startClass()
        descuento.classList.remove('pos-fixed')
        descuento.classList.remove('no-fixed')
    }
}

/** función que al hacer scroll se ejecutan operaciones */

window.addEventListener('scroll', function(){
    /** barra fija en desktop */
    infoFixed();
});

/** ejecutamos la función dinámicamente cuando la pantalla sufre cambios de tamaño */
window.onresize = reportWindowSize;