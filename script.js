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

function search_language() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('language');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="inline-block";                 
        }
    }
}


// const editor = ace.edit('editor')
// document.getElementById('editor').style.fontSize='19px';
// editor.setTheme("ace/theme/vibrant_ink")

// editor.session.setMode("ace/mode/html");
 
// editor.setShowPrintMargin(false);
// editor.renderer.setShowGutter(true);
// editor.session.setUseWorker(false)

function createUrl(html) {
  var blob = new Blob([html], { type: 'text/html' })
  return URL.createObjectURL(blob)
}


function removeUrl(url) {
  URL.revokeObjectURL(url)
}


function getEditorCode() {
  return window.editor.getValue()
}

function buttonclick68() {
  var code = getEditorCode()
  removeUrl(url)
  url = createUrl(code)
  document.getElementById('runframe').src=url;
  
}


function search(){
  var search = document.getElementById('search');
  var find = search.value ; 
  if(editor.find(find)){
var replacement =  prompt("What should we replace : " + find );
editor.replace(replacement);
  }
  else{
    alert('no such keyword in your file  as : ' + find);
  }
  
}
function selectlang(lang_id){
document.cookie = "lang_id="+lang_id;
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

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
document.querySelector(".languages").style.display="none";
}