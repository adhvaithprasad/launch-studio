document.cookie = "lang_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "current_file=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "files=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "fname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "oid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//Create a function that returns a string, of a given length
const genRand = (len) => {
  return Math.random().toString(36).substring(2,len+2);
}
window.addEventListener('hashchange', function() {
  var hash = window.location.hash.replace(/#/g, '');
  var m = genRand(8);
  firebase.database().ref('file-detect/' + m).set({
    file: hash
  });
  read(hash)
  setTimeout(function(){
 	   
firebase.database().ref().child("file-detect").child(m).get().then((snapshot) => {
  if (snapshot.exists()) {
    change_lang(snapshot.val().lang)
  
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
   }, 2000);
}, false);


const $ = id => document.getElementById(id);
let oid;
let worker = new Worker("./worker.js");
const portal = new MagicPortal(worker);
// worker.addEventListener("message", ({ data }) => console.log(data));

const mainThread = {

  async progress(evt) {
 if(evt.loaded === evt.total){

  
       document.getElementsByClassName("snippet")[0].style.display = "none";
         document.getElementsByClassName("snippet")[1].style.display = "none";
       
      }
      else{
        if(evt.total === undefined){

       document.getElementsByClassName("snippet")[0].style.display = "flex";
         document.getElementsByClassName("snippet")[1].style.display = "flex";
       
        }
        else{

       
        }
        
        
      }
    return;
  },
  async fill(url) {
    let username = window.prompt("Username:");
    let password = window.prompt("Password:");
    return { username, password };
  },
  async rejected({ url, auth }) {
    window.alert("Authentication rejected");
    return;
  }
};
portal.set("mainThread", mainThread, {
  void: ["print", "progress", "rejected"]
});



async function doCloneAndStuff(url,fname,user,name) {
  document.cookie = "fname="+fname;
  $("url").innerHTML=user;
  $("name").innerHTML=name;
  firebase.database().ref('repos/languageDB/' + fname).set({
    lang_id: getCookie("lang_id")
  });
  
//   document.getElementById(fname).style.border = "2px solid blue";
// document.getElementById(fname).style.background = "#03a9f41a";
  document.querySelector(".languages").style.display="none";
   document.getElementsByClassName("snippet")[0].style.display = "flex";
    await workerThread.setDir("/");

  await workerThread.clone({
    corsProxy: "https://cors.isomorphic-git.org",
    url: url
  });

  let commits = await workerThread.log({});
  commits.forEach(function(commit) {
    if (oid === undefined) {
      oid = commit.oid;
      document.cookie = "oid=" + oid;
    }
  });
  commits.forEach(function(commit) {
     $("commithash").innerHTML +=  `<div   class="commit-container">
<p class="commit-message">${commit.commit.message}</p>
<p class="commit-author">${commit.commit.author.name}</p>
<p class="commit-id">${commit.oid.slice(0,8)}</p>
</div>`
    
  });
  var oid = getCookie("oid");

    
  let files = await workerThread.listFiles({});

  document.cookie = "files=" + JSON.stringify(files);
  let image = "https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/";




  function addfile(file){
  if(document.getElementById(file.split("/")[0])){
  
  
  }
  else{
    if (file.split("/").length > 1){
    $("tree").innerHTML +=  `<div  id="${file.split("/")[0]}" class="file-container" onclick="window.location.hash='${file.split("/")[0]}'">
<img src="https://codesandbox.io/static/media/folderOpen.6913563c.svg" onerror="this.onerror=null;this.src='https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/file.svg';"
/>${file.split("/")[0]}</div>`
  }
  else{
    $("tree").innerHTML +=  `<div data-tippy="${file}" id="${file.split("/")[0]}" class="file-container" onclick="window.location.hash='${file.split("/")[0]}'">
<img src="${image + file.split('.')[file.split('.').length -1]+'.svg'}" onerror="this.onerror=null;this.src='https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/file.svg';"
/>${file.split("/")[0]}</div>`
  }
  }}
  
files.forEach(file => 
 addfile(file)
);


files.forEach(file => 
 document.cookie = "file_"+file+"="+read_cookie(file)
);



}

async function readk(file){
   var oid = getCookie("oid");
  await workerThread.setDir("/");
 let read = await workerThread.read({oid: oid,filepath: file});
  return read ;
}

(async () => {
  const workerThread = await portal.get("workerThread");





  window.workerThread = workerThread;
  window.worker = worker;


})();

async function read(filepath) {
  var oid = getCookie("oid");

  await workerThread.setDir("/");
  let read = await workerThread.read({
    oid: oid,
    filepath: filepath,
  });
  var enc = new TextDecoder("utf-8");

  
document.cookie = "current_file="+filepath;


  
  change_value(enc.decode(read.blob));


}
async function read_cookie(filepath){
  var oid = getCookie("oid");

  await workerThread.setDir("/");
  let read = await workerThread.read({
    oid: oid,
    filepath: filepath,
  });
  var enc = new TextDecoder("utf-8");

console.log(enc.decode(read.blob));  
}