function run(){
  const options = {
  method: 'POST',
  headers: {
    'x-rapidapi-key': '45b0e67815msh8f5fb5c3ed095a7p126d59jsn243789654347',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    Authorization: 'Basic dW5kZWZpbmVkOnVuZGVmaW5lZA==',
    'content-type': 'application/json'
  },
  body: JSON.stringify(
    {
    "source_code":window.editor.getValue(),
    "language_id":getCookie("lang_id")
    }
  )
};


fetch('https://ce.judge0.com/submissions/?base64_encoded=false&wait=true', options)
  .then(response => response.json())
  .then(response => res(response))
  .catch(err => console.error(err));
}
        
function res(response){
  console.log(response);
  
if( response.compile_output !== null){
  mes(response.compile_output , response.status.description,"mo");
}
else if(response.stderr !== null){
    mes(response.stderr , response.status.description,"mo");
}
else{
    mes(response.stdout , response.status.description,"n")
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