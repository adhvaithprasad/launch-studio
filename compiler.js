function runInput(){

  const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'Content-Type': 'application/json',
		'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
		'X-RapidAPI-Key': '6484043fd0mshec484bf71a9f73ap1534a8jsn357afe17b801'
	},
	body: JSON.stringify(
    {
    "source_code": btoa(getEditorCode()),
    "language_id":getCookie("lang_id"),
    "stdin":btoa(prompt("Input for execution"))
    }
  )
};

  
console.log(JSON.stringify(
    {
    "source_code": btoa(getEditorCode()),
    "language_id":getCookie("lang_id")
    }
  ))


fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*', options)
	.then(response => response.json())
	.then(response => res(response))
	.catch(err => console.error(err));
        


}

function run(){

  const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'Content-Type': 'application/json',
		'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
		'X-RapidAPI-Key': '6484043fd0mshec484bf71a9f73ap1534a8jsn357afe17b801'
	},
	body: JSON.stringify(
    {
    "source_code": btoa(getEditorCode()),
    "language_id":getCookie("lang_id")
    }
  )
};

  
console.log(JSON.stringify(
    {
    "source_code": btoa(getEditorCode()),
    "language_id":getCookie("lang_id")
    }
  ))


fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*', options)
	.then(response => response.json())
	.then(response => res(response))
	.catch(err => console.error(err));
        


}


function res(response){
  console.log(response);
  
if( response.compile_output !== null){
  mes(atob(response.compile_output) , response.status.description ,"mo");
}
else if(response.stderr !== null){
    mes(atob(response.stderr) , response.status.description,"mo");
}
else{
    mes(atob(response.stdout) , response.status.description,"n")
}

  
}
function mes(mes,des,nes){
if(nes === "mo"){
    document.getElementById("output").innerHTML += `<div style="
    background: #4a0808;
    color: #e48181;
"><p>${des}</p><br><div style="
    background: #4a0808;
    color: #e48181;
">${mes}</div></div>`
}
  else{
        document.getElementById("output").innerHTML += `<div><p>${des}</p><br><div>${mes}</div></div>`
  }
}