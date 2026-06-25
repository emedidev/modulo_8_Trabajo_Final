let url = 'https://animals-by-api-ninjas.p.rapidapi.com/v1/animals?name=lion';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c66b427866msh2dfa59a3d32e402p13a14bjsnd4c0ec2486a0',
		'x-rapidapi-host': 'animals-by-api-ninjas.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

let form = document.querySelector("#form")

form.addEventListener("submit",(event)=>{
	event.preventDefault()
	let nameAnimal = event.target[0].value
	url = `https://animals-by-api-ninjas.p.rapidapi.com/v1/animals?name=${nameAnimal}`
	dataApi()
})





async function dataApi() {
	try{
		const response = await fetch(url, options);
		const result = await response.json();
		const data = result[0];
		
		console.log(data)

		document.querySelector("#card").innerHTML=`
		<h2>${data.name}</h2>
		<h3>Peso: ${data.characteristics.weight}</h3>
		<h3>Tamaño: ${data.characteristics.height}</h3>
		<p>Velocidad: ${data.characteristics.top_speed}</p>
		<p>Tipología: ${data.taxonomy.family}</p>
		<p>Tipología: ${data.taxonomy.order}</p>
		<p>Ubicación: ${data.characteristics.location}</p>
		`

	} catch(error){
		console.error(error)
	}
}

dataApi()