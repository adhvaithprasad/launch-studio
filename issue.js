function bugs(){
  var summary = prompt("summary");
   var description = prompt("description");
  var label = prompt("label");
  var creator = getCookie("user");
  create_issue(summary,description,label,creator)
}
function create_issue(summary,description,label,creator){
  firebase.database().ref('Jira/' + genRand(8)).set({
    summary: summary,
    description:description,
    label:label,
    creator:creator,
    date: new Date()
  });
}
firebase.database().ref().on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});