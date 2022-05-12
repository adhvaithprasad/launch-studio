document.cookie = "lang_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
window.addEventListener('hashchange', function() {
  var hash = window.location.hash.replace(/#/g, '');
  read(hash)
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



async function doCloneAndStuff(url,fname) {
  
  firebase.database().ref('repos/languageDB/' + fname).set({
    lang_id: getCookie("lang_id")
  });
  
  document.getElementById(fname).style.border = "2px solid blue";
document.getElementById(fname).style.background = "#03a9f41a";
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
  var oid = getCookie("oid");

    await workerThread.setDir("/");
try{
      let read = await workerThread.read({
      oid:oid,
      filepath:"README.md",
    });
  var enc = new TextDecoder("utf-8");

    
  document.getElementById('output').innerHTML =
      marked.parse(enc.decode(read.blob));
}
      catch(e){
   console.log(e)
      }
  let files = await workerThread.listFiles({});
// firebase.database().ref('repos/FileDB/' + fname).set({
//     Files: files
//   });
  let image = "https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/";
// files.forEach(file => 
//   readm(file)
//   );
  files.forEach(file =>
    $("tree").innerHTML += `<div  class="file-container" onclick="window.location.hash='${file}'">
  <img src="${image + file.split('.')[file.split('.').length - 1] + '.svg'}" 
onerror="this.src='https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/file.svg'"
  />
  <p>${file}</p></div>`
  );



// }




}
// async function readm(filepath) {
//   var oid = getCookie("oid");
//   await workerThread.setDir("/");
//   let read = await workerThread.read({
//     oid: oid,
//     filepath: filepath,
//   });
//   var enc = new TextDecoder("utf-8");
//   console.log(enc.decode(read.blob));
// }
(async () => {
  const workerThread = await portal.get("workerThread");





  window.workerThread = workerThread;
  window.worker = worker;
  // console.log(workerThread);
  // doCloneAndStuff();

})();

async function read(filepath) {
  var oid = getCookie("oid");

  await workerThread.setDir("/");
  let read = await workerThread.read({
    oid: oid,
    filepath: filepath,
  });
  var enc = new TextDecoder("utf-8");

  console.log(enc.decode(read.blob));

  change_value(enc.decode(read.blob));


}