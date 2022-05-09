var url = null
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function selectlang(lang_id){
document.cookie = "lang_id="+lang_id;
document.getElementById("editorheader").innerHTML=files_name[lang_id];
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };
document.getElementById(lang_id).style.border = "2px solid blue";
document.getElementById(lang_id).style.background = "#03a9f41a";
let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
	window.editor = monaco.editor.create(document.getElementById('editor'), {language: document.getElementById(lang_id).getAttribute("mode"),
		theme: 'vs-dark',
    wordWrap: true,
    minimap: {
		enabled: true
	}});
	
	// editor.addListener('didType', () => {
	// 	buttonclick68()
	// });
  
});

}
function files(){
  var x = document.getElementById("tree");
  if ( x.style.display === "none"){
    x.style.display="block";
  }
  else{
    x.style.display="none";
  }
}
function change_value(val){
  window.editor.getModel().setValue(val);
}
function minify(){
window.editor.getAction('editor.action.formatDocument').run();
}