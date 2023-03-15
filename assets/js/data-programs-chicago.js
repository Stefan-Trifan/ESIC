/*========================================================*/
/* LIBRERIA PAPAPARSE PARA EXTRAER DATOS DE GOOGLE SHEETS
/*========================================================*/
if(document.querySelector('#data-programs')){
	var lang_html = document.querySelector('html').lang
	var lang = lang_html.toLowerCase().trim().slice(0,2);
	var id_ga = document.querySelector('meta#data-programs')
	
	function  infoProgramas(url){
		Papa.parse(url, {
			download: true,
			complete: function(results) {
				
				var info = [];
				var cod_ga_col = 0;
				var title_col = 1;
				var subtitle_col = 2;
				var frase_col = 3;
				var type_course_col = 4;
				var state_col = 5;
				var start_col = 6;
				var end_col = 7;
				var duration_col = 8;
				var hour_col = 9;
				var price_col = 10;
				var description_col = 11;
				var format_col = 12;
				var ceus_col = 13;
				var idioma_col = 14;
				var language_col = 15;
				var dscto_col = 16;
				var dscto_date_col = 17;
				var dscto_footer_col = 18;
				var on_off_col = 19;
				var hubs_col = 20;
				var call_col = 21;
				var brochure_col = 22;			
				var img_home_col = 23;
				var url_web_col = 24;
				var url_landing_col = 25;			
				var url_pay_col = 26;
				var cod_pay_col = 27;
				
			
				var obj = new Object();
				
				for(let i = 1; i < results.data.length; i++){
					obj.id = results.data[i][cod_ga_col].toLowerCase().trim();
					obj.program  = results.data[i][title_col].trim();
					obj.subtitle = results.data[i][subtitle_col];
					obj.frase = results.data[i][frase_col];
					obj.type_course = results.data[i][type_course_col].toLowerCase().trim();
					obj.state = results.data[i][state_col].toLowerCase().trim();
					obj.start = results.data[i][start_col];
					obj.end = results.data[i][end_col];
					obj.duration = results.data[i][duration_col];
					obj.hour = results.data[i][hour_col];
					obj.price = results.data[i][price_col];
					obj.description = results.data[i][description_col];
					obj.format = results.data[i][format_col];
					obj.ceus = results.data[i][ceus_col];
					obj.idioma = results.data[i][idioma_col];
					obj.lang = results.data[i][language_col].toLowerCase().trim().slice(0,2);
					obj.lang_sufijo = results.data[i][language_col].toLowerCase().trim().slice(3,5);
					obj.dscto = results.data[i][dscto_col];
					obj.dscto_date = results.data[i][dscto_date_col];
					obj.dscto_footer = results.data[i][dscto_footer_col];
					obj.on_off = results.data[i][on_off_col];
					obj.hubs = results.data[i][hubs_col];
					obj.call = results.data[i][call_col];
					obj.brochure = results.data[i][brochure_col];
					obj.ulr_pay = results.data[i][url_pay_col];
					obj.img_home = results.data[i][img_home_col];
					obj.url_web = results.data[i][url_web_col];
					obj.url_landing = results.data[i][url_landing_col];
					obj.cod_pay= results.data[i][cod_pay_col];

					info[i-1] = obj;
					
					/*=============================================================*/
					/* funcion convierte fecha en formato: dia, mes, año
					/*=============================================================*/
					function isValidDate(day,month,year){
						var dteDate;
						month=month-1;
						dteDate=new Date(year,month,day);
						return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
					}

					/*===================================================================*/
					/*funcion convierte fecha en idioma-ENG para que la entienda el sistema
					/*===================================================================*/
					function convertDateEsToEn(dateEs,formatReturn){
						var patron=new RegExp("^([0-9]{1,2})([/])([0-9]{1,2})([/])(19|20)+([0-9]{2})$");
						if ( dateEs.search(patron) == 0 ) {
							values=dateEs.split("/");
							// Revisamos que la fecha sea correcta
							if(isValidDate(values[0],values[1],values[2])){
								// devuelve la fecha en formato ingles
								if(formatReturn==2){
									// puedes devolver un objeto fecha para trabajar con el
								
									return new Date(values[2],(parseInt(values[1])-1),values[0]);
								}else{
									// puedes devolver simplemente la fecha en formato cadena
									if (values[1].length <= 1){
										values[1] = '0' + values[1];
									}
									if (values[0].length <= 1){
										values[0] = '0' + values[0];
									}
									return values[2]+"/"+values[1]+"/"+values[0];
								}
							}
						}
						return "";
					}

					/*=============================================================*/
					/*funcion para convertir fecha a string segun idioma de landing
					/*=============================================================*/
					function fechaString(date_fecha){
						var f_format_eng = convertDateEsToEn(date_fecha, 1)
						const fecha = new Date(f_format_eng);
						//objeto en formato string de fecha
						var options = {  year: 'numeric', month: 'long', day: 'numeric'};
						// if ((lang_html == 'af-ZA') && (id_ga.dataset.lang == 'en')){
						// 	lang_html = 'en-US'
						// }
						// if ((id_ga.dataset.lang == 'en') || (id_ga.dataset.lang == 'us')){
						// 	//recoge un array de string tipo ['october', '4,', '1975']
						// 	var array = fecha.toLocaleDateString(lang_html, options).split(' ')
						// 	//quitamos la coma del día en el array
						// 	var dayEng = array[1].replace(',','')
						// 	//ponemos sufijo a dia
						// 	if (dayEng % 10 == 1 && dayEng != 11) {
						// 		dayEng = `${dayEng}st,`;
						// 	} else if (dayEng % 10 == 2 && dayEng != 12) {
						// 		dayEng = `${dayEng}nd,`;
						// 	} else if (dayEng % 10 == 3 && dayEng != 13) {
						// 		dayEng = `${dayEng}rd,`;
						// 	} else {
						// 		dayEng = `${dayEng}th,`;
						// 	}
						// 	return (array[0] + ' ' + dayEng + ' ' + array[2])
						// } else {
							return(fecha.toLocaleDateString(lang_html, options))
						// }
						
					}

					/*=============================================================*/
					/*funcion para poner comas de miles a los números
					/*=============================================================*/
					function separator(numb) {
						var str = numb.toString().split(".");
						if (id_ga.dataset.lang == 'fr'){ // si el habla idioma es frances
							str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
						} else if (lang == 'pt') { // si el habla idioma es pprtugués
							str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
						} else {
							str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						}
						return str.join(".");
					}
					
					
					/*=============================================================*/
					/*funcion para rellenar los datos de los programas y TYP
					/*=============================================================*/
					function dateProgramas(){
						var h1_title = document.querySelectorAll('#data-h1')
						var h2_subtitle = document.querySelectorAll('h1 + h2#data-h2')
						var data_start = document.querySelectorAll('#data-start')
						var data_format = document.querySelectorAll('#data-format')
						var data_idioma = document.querySelectorAll('#data-idioma')
						var data_duration = document.querySelectorAll('#data-duration')
						var data_price = document.querySelectorAll('#data-price')
						var data_ceus = document.querySelectorAll('#data-ceus')
						var data_dscto = document.querySelectorAll('#data-dscto')
						var data_dscto_foter = document.querySelectorAll('#data-dscto-footer')
						var click_call = document.querySelectorAll('a#clickcall')
						var click_admi = document.querySelectorAll('a#clickadmi')
						var click_info = document.querySelectorAll('a#clickinfo')


						// CALCULAR PRECIO DEL PROGRAMA MENOS EL 10% PARA TEXTO EL FALSO 10
						//var price_with_dscto = obj.price.replace(/[$*USD.,]/g,'') //eliminamos caracteres dentro de precio
						//price_with_dscto = price_with_dscto.replace(' ','') //Eliminamos del string espacios en blanco
						//price_with_dscto = parseInt(price_with_dscto) - (parseInt(price_with_dscto)*10/100) //cálculo menos 10% 
						//price_with_dscto = separator(price_with_dscto).toString() //se convierte a string el resultado
						
						if(obj.dscto.includes('XXX')){
							obj.dscto = obj.dscto.replace('XXX', fechaString(obj.dscto_date)) //se reemplaza el resultado por las XXX de la validación
						}
						// if(obj.dscto.includes('&')){
						// 	obj.dscto = obj.dscto.replace(' &', ',')
						// }
						// fin de calculo de precio menos 10% para texto de falso 10


						/*================================*/
						/*	URLS A LA PASARELA
						/*================================*/
						/*if (lang == 'af'){
							obj.ulr_pay = 'https://professionalprogramsmit.com/gateway/' + lang + '-' + id_ga.dataset.lang + '/' + obj.ulr_pay + '/runway/order'
						}
						obj.ulr_pay = 'https://professionalprogramsmit.com/gateway/' + lang + '/' + obj.ulr_pay + '/runway/order'*/

						//fin url pasarela

						

						h1_title.forEach(element => {
							element.innerText = obj.program
						});
						h2_subtitle.forEach(element => {
							element.innerText = obj.subtitle
						});
						data_start.forEach(element => {
							element.innerText = fechaString(obj.start)
						});
						data_duration.forEach(element => {
							element.innerText = obj.duration
						});
						data_price.forEach(element => {
							element.innerText = obj.price						
						});
						data_idioma.forEach(element => {
							element.innerText = obj.idioma
						});
						data_format.forEach(element => {
							element.innerText = obj.format
						});
						data_ceus.forEach(element => {
							element.innerText = obj.ceus
						});
						data_dscto.forEach(element => {
							element.innerText = obj.dscto
						});
						data_dscto_foter.forEach(element => {
							element.innerText = obj.dscto_footer
						});
						click_call.forEach(element => {
							element.href = obj.call;
						});
						click_admi.forEach(element => {
							element.href = obj.ulr_pay
						});

						/*================================*/
						/*	BROCHURE TYP
						/*================================*/
						if ( id_ga.dataset.typ === 'typ'){
							click_info.forEach(element => {
								element.href = obj.brochure
							});
						}

						/*================================*/
						/*	SEGUIMIENTO DE LAS UTMS
						/*================================*/
						var utmAux = window.location.href
						if(utmAux.includes('?utm')){
							var utmAdded = utmAux.split('?utm_')[1]
							click_admi.forEach(element => {
								element.href = element.href + '?utm_' + utmAdded
							});
						}
					}

					if((id_ga.dataset.codga.toLowerCase() === obj.id) && (lang === obj.lang) && (id_ga.dataset.state.toLowerCase() === obj.state) && (id_ga.dataset.lang.toLowerCase() === obj.lang_sufijo) ){
						dateProgramas();
					}
					
					   
				}
			}
		});
	}
	
	switch (lang){
		case 'en' : infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vR2VNpaVvotmWyHw2AWcdDYKWWnCB-Xx2zbdKXXHkp6bNtEfKNoe8gD00b4Y9g9A4cmGIeLQDNAybeq/pub?gid=0&single=true&output=csv");
		break;
		case 'es' : infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vS7ex3GQg_rnqi-1juA_EsWL85h09ALohjjixbCn6Pi718O7sVxn23UIQrNaaTyGbU_qnNPHVL7962K/pub?gid=1323684956&single=true&output=csv");
		break;
		// case 'fr' : infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vQZVqnCr-EM1KcLDexeUJpG_vA7_tqZ6zbAqAuWgxN4Ws4TRMDdDNbVjwcwHcyVPWdPnK5F7T0pSwsx/pub?gid=285198005&single=true&output=csv");
		// break;
		// case 'it' : infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vQZVqnCr-EM1KcLDexeUJpG_vA7_tqZ6zbAqAuWgxN4Ws4TRMDdDNbVjwcwHcyVPWdPnK5F7T0pSwsx/pub?gid=1098303678&single=true&output=csv");
		// break;
		case 'pt' : infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vR2VNpaVvotmWyHw2AWcdDYKWWnCB-Xx2zbdKXXHkp6bNtEfKNoe8gD00b4Y9g9A4cmGIeLQDNAybeq/pub?gid=816795300&single=true&output=csv");
		// infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vQZVqnCr-EM1KcLDexeUJpG_vA7_tqZ6zbAqAuWgxN4Ws4TRMDdDNbVjwcwHcyVPWdPnK5F7T0pSwsx/pub?gid=118068797&single=true&output=csv");
		break;
		// case 'af' : infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vQZVqnCr-EM1KcLDexeUJpG_vA7_tqZ6zbAqAuWgxN4Ws4TRMDdDNbVjwcwHcyVPWdPnK5F7T0pSwsx/pub?gid=1440549930&single=true&output=csv");
		// infoProgramas("https://docs.google.com/spreadsheets/d/e/2PACX-1vQZVqnCr-EM1KcLDexeUJpG_vA7_tqZ6zbAqAuWgxN4Ws4TRMDdDNbVjwcwHcyVPWdPnK5F7T0pSwsx/pub?gid=1751092392&single=true&output=csv");
		// break;
	}

}