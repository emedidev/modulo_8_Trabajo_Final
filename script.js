
/* ESPACIO DONDE SE VISUALIZARA EN EL DOM LOS DATOS. */
let form = document.querySelector("#form")

/* FUNCION QUE DA INICIO AL EVENTO */
document.addEventListener("submit",(event)=>{

    /* SELECCIONANDO DATOS DEL FORMULARIO */
	event.preventDefault()
	const data = new FormData(form);
	const serchCity = data.get("country");
    const serchDate = data.get("date");

    const today = new Date()
    if(today < new Date(serchDate)){
        return alert("Seleccione maximo al dia de hoy")
    }

    /* CONSTRUYENDO FECHA LIMITE PARA LA URL DE LA API */
    const year = new Date(serchDate).getFullYear();
    const month = new Date(serchDate).getMonth()+1;
    const day = new Date(serchDate).getDate();

    const startDateSrt = ()=>{
        return String(year) + "-" + String(month).padStart(2, "0") + "-" + String(day-5).padStart(2, "0");
    }
    /* DEFINIENDO ARREGLO CON DATOS DE LAS ZONAS QUE SE BUSCARAN */
    const estaciones = {
        dom: {
            pais: "República Dominicana",
            ciudad: "Santo Domingo",
            station: "78486"
        },
        usa: {
            pais: "Estados Unidos",
            ciudad: "New York",
            station: "72503"
        },

        esp: {
            pais: "España",
            ciudad: "Madrid",
            station: "08221"
        }
    };
    /* DATOS DE LA API */
	let url = `https://meteostat.p.rapidapi.com/stations/daily?station=${estaciones[serchCity].station}&start=${startDateSrt()}&end=${serchDate}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'c66b427866msh2dfa59a3d32e402p13a14bjsnd4c0ec2486a0',
			'x-rapidapi-host': 'meteostat.p.rapidapi.com',
			'Content-Type': 'application/json'
		}

    };
	
    /* FUNCION PARA MOSTRAR LOS DATOS EN EL DOM */
	mostrarDatos(url, options, estaciones[serchCity], serchDate)

})

/* FUNCION QUE REGRESARA LOS DATOS DE LA API */
async function mostrarDatos(url, opt, sCity, sDate) {

	try{/* RESOLVIENDO API CON FETCH */
		const response = await fetch(url, opt);
		const result = await response.json();
		const data = result.data;

        /* VARIABLES CON LOS DATOS DE CADA REGISTRO QUE SE CARGARAN EN EL DOM */
		let country = sCity.ciudad;
		let date = data[6].data;
		let temp = data[6].tavg;
		let tsun = data[6].tsun;
		let tmin = data[6].tmin;
		let tmax = data[6].tmax;
		let windt = data[6].wspd;
		let rain = data[6].prcp;
        let snow = data[6].snow;
		/* VARIABLES QUE DEFINEN LOS ESTADOS METEOROLOGICOS DE CADA DIA */
        let estado = obtenerEstado(rain,snow,tsun);
        let dia5 = obtenerEstadosPass(data, 5)
        let dia4 = obtenerEstadosPass(data, 4)
        let dia3 = obtenerEstadosPass(data, 3)
        let dia2 = obtenerEstadosPass(data, 2)
        let dia1 = obtenerEstadosPass(data, 1)
        let dia0 = obtenerEstadosPass(data, 0)
        
        /* EJECUCION CON TIEMPO DE ESPERA PARA CARGAR LOS DATOS AL DOM */
		setTimeout(
            /* ESTRUCTURA HTML QUE SE CARGARA EN EL DOM */
            /* TARJETA PRINCIPAL Y TARJETAS SECUNDARIAS DE ULTIMOS DIAS */
			document.querySelector(".container").innerHTML = `
			<section class="weather-card">
			<div class="header">
			<div>
			<h2>${country}</h2>
			<p>${sDate}</p>
			</div>
                </div>
                <div class="containerMain">
				<div class="temperature">
                        <h1>${temp}</h1>
                        <span>${estado.Estado}</span>
                    </div>
                    <div class="icon">
                        ${estado.Icono}
                    </div>
                </div>

                <div class="stats">
                    <div class="stat">
                        <h4>Máxima</h4>
                        <p>${tmax}°C</p>
						</div>
						<div class="stat">
                        <h4>Mínima</h4>
                        <p>${tmin}°C</p>
						</div>
						<div class="stat">
                        <h4>Viento</h4>
                        <p>${windt} km/h</p>
                    </div>
                    <div class="stat">
                        <h4>Lluvia</h4>
                        <p>${rain}%</p>
                    </div>
                </div>
            </section>
            
            <!-- Últimos días -->

            <section class="forecast">
                <div class="day-card">
                    <h3>${dia5.NombreFecha}</h3>
                    <span>${dia5.Estado.Icono}</span>
                    <p>${dia5.Temp}º</p>
                </div>
                <div class="day-card">
                    <h3>${dia4.NombreFecha}</h3>
                    <span>${dia4.Estado.Icono}</span>
                    <p>${dia4.Temp}º</p>
                </div>
                <div class="day-card">
                    <h3>${dia3.NombreFecha}</h3>
                    <span>${dia3.Estado.Icono}</span>
                    <p>${dia3.Temp}º</p>
                </div>
                <div class="day-card">
                    <h3>${dia2.NombreFecha}</h3>
                    <span>${dia2.Estado.Icono}</span>
                    <p>${dia2.Temp}º</p>
                </div>
                <div class="day-card">
                    <h3>${dia1.NombreFecha}</h3>
                    <span>${dia1.Estado.Icono}</span>
                    <p>${dia1.Temp}º</p>
                </div>
                <div class="day-card">
                    <h3>${dia0.NombreFecha}</h3>
                    <span>${dia0.Estado.Icono}</span>
                    <p>${dia0.Temp}º</p>
                </div>
            </section>
		`
	);{5}
	} catch(error){
		console.error("Error: ", error)
	}
}
/* FUNCION PARA EVALUAR LOS ESTADOS Y ASIGNARLOS A CADA DIA */
function obtenerEstado(prcp, snow, tsun) {
    if (snow > 0) {
        return {Estado: "Nevado", Icono: "❄️"};
    }
    if (prcp >= 10) {
        return {Estado: "Lluvioso", Icono: "🌧️"};
    }
    if (prcp >= 2) {
        return {Estado: "Chubascos", Icono: "🌦️"};
    }
    if (tsun >= 500) {
        return {Estado: "Soleado", Icono: "☀️"};
    }
    if (tsun >= 180) {
        return {Estado: "Parcialmente nublado", Icono: "⛅"};
    }
    return {Estado: "Nublado", Icono: "☁️"};
}
/* FUNCION PARA OBTENER EL ESTADO DE LOS DIAS ANTERIORES AL BUSCADO */
function obtenerEstadosPass(datos, dia){
            
            const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

            let estadoDelDia = datos[dia];
            let numeroDia = new Date(estadoDelDia.date.replace(" ","T")).getDay()
            let nombreFecha = dias[numeroDia]
            

            let prcpInt = estadoDelDia.prcp;
            let snowInt = estadoDelDia.snow;
            let tsunInt = estadoDelDia.tsun;            
            let nuevoEstado = obtenerEstado(prcpInt, snowInt, tsunInt);

            let nuevaTemp = estadoDelDia.tavg;
            
            let resultado = {
                Estado: nuevoEstado,
                NombreFecha: nombreFecha,
                Temp: nuevaTemp
            }

            return resultado
        }