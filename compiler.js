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
  .then(response => console.log(response))
  .catch(err => console.error(err));
}
        

     