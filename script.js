let to_day = new Date().toLocaleDateString();
let form = document.querySelector("#form")



document.addEventListener("submit",(event)=>{

	event.preventDefault()
	const data = new FormData(form)
	const serchCity = data.get("city")
	const serchDate = data.get("year")
	
	let url = `https://meteostat.p.rapidapi.com/stations/daily?station=10637&start=${serchDate}&end=${serchDate}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'c66b427866msh2dfa59a3d32e402p13a14bjsnd4c0ec2486a0',
			'x-rapidapi-host': 'meteostat.p.rapidapi.com',
			'Content-Type': 'application/json'
		}

};
	
	
	dataApi(url, options, serchCity, serchDate)
})


async function dataApi(url, opt, sCity, sDate = to_day) {
	try{
		const response = await fetch(url, opt);
		const result = await response.json();
		const data = result.data;
		console.log(data)
		let country = sCity;
		let date = sDate;
		let temp = data[0].tavg;
		let status = data[0].tsun;
		let tempMin = data[0].tmin;
		let tempMax = data[0].tmax;
		let windt = data[0].wspd;
		let rain = data[0].prcp;
		
		setTimeout(

			document.querySelector(".container").innerHTML = `
			<section class="weather-card">
			<div class="header">
			<div>
			<h2>${country}</h2>
			<p>Miércoles 26 Junio 2025</p>
			</div>
                </div>
                <div class="containerMain">
				<div class="temperature">
                        <h1>${temp}</h1>
                        <span>${status}</span>
                    </div>
                    <div class="icon">
                        ☀️
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
                    <h3>Lun</h3>
                    <span>☀️</span>
                    <p>30°</p>
                </div>
                <div class="day-card">
                    <h3>Mar</h3>
                    <span>🌤️</span>
                    <p>29°</p>
                </div>
                <div class="day-card">
                    <h3>Mié</h3>
                    <span>🌧️</span>
                    <p>27°</p>
                </div>
                <div class="day-card">
                    <h3>Jue</h3>
                    <span>☀️</span>
                    <p>31°</p>
                </div>
                <div class="day-card">
                    <h3>Vie</h3>
                    <span>🌩️</span>
                    <p>26°</p>
                </div>
                <div class="day-card">
                    <h3>Sáb</h3>
                    <span>🌥️</span>
                    <p>28°</p>
                </div>
            </section>
		`
	);{5}

		

	} catch(error){
		console.error(error)
	}
}
