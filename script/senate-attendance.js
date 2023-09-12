 import {senate_att_Data} from './senate-attendance.mjs'
 console.log(senate_att_Data.results[0].members);


 let data =  senate_att_Data.results[0].members;


 let members = data.sort(function(a, b) {
  return a.missed_votes - b.missed_votes;
});

let membersUp = members.slice(-10);

let defmembersUP = members.sort(function(a,b){
  return b.votes_with_party_pct - a.votes_with_party_pct;
})

  
let defMembersdown = membersUp.slice(0,10);


buildTable1(defmembersUP);
function buildTable1(members_one) {
  document.getElementById("table1").innerHTML = ""; 
  for (let i = 0; i < members_one.length; i++) { 
      let row = document.createElement("tr"); 
      let link = document.createElement("a"); 
      link.textContent = members_one[i].first_name + " " + (members_one[i].middle_name || "") + " " + members_one[i].last_name; 
      link.setAttribute("href", members_one[i].url) 
      row.insertCell().append(link); 
      row.insertCell().innerHTML = members_one[i].missed_votes;
      row.insertCell().innerHTML = members_one[i].missed_votes_pct;
      document.getElementById("table1").append(row) 
  }
}


buildTable2(defMembersdown);
function buildTable2(member_two) {
  document.getElementById("table2").innerHTML = ""; 
  for (var i = 0; i < member_two.length; i++) { 
      var row = document.createElement("tr"); 
      var link = document.createElement("a"); 
      link.textContent = member_two[i].first_name + " " + (member_two[i].middle_name || "") + " " + member_two[i].last_name; //el contenido de text content es el first middle y last name en cada indice i del array
      link.setAttribute("href", member_two[i].url) 
      row.insertCell().append(link); 
      row.insertCell().innerHTML = member_two[i].missed_votes;
      row.insertCell().innerHTML = member_two[i].missed_votes_pct;
      document.getElementById("table2").append(row) 
  }
}




buildTable(data);
function buildTable(members_three) {

  document.getElementById("table").innerHTML = ""; 
  let rep = members_three.filter(function(members){
    return members.party === "R"
  })
  let dem = members_three.filter(function(members){
    return members.party === "D"
  })
  let ind = members_three.filter(function(members){
    return members.party === "ID"
  })
  console.log(rep,dem,ind,'rep','dem','ind')
  let promediorep = rep.map((votes) => votes["votes_with_party_pct"]).reduce((a,c)=> (a+c) / (rep.length));
  let promediodem = dem.map((votes) => votes["votes_with_party_pct"]).reduce((a,c)=> (a+c) / (dem.length));
  let promedioind = ind.map((votes) => votes["votes_with_party_pct"]).reduce((a,c)=> (a+c) / (ind.length),0);
  
  
  for (var i = 0; i < 3; i++) { 
    let row = document.createElement("tr"); 
    
    if (i==0) {
      row.insertCell().innerHTML = "Republican";
      row.insertCell().innerHTML = rep.length;
      row.insertCell().innerHTML = promediorep+"%";
      document.getElementById("table").append(row)
    }
    if (i==1) {
      row.insertCell().innerHTML = "Democrat";
      row.insertCell().innerHTML = dem.length;
      row.insertCell().innerHTML = promediodem+"%";
      document.getElementById("table").append(row)
    }
    if (i==2) {
      row.insertCell().innerHTML = "Independent";
      row.insertCell().innerHTML = ind.length;
      row.insertCell().innerHTML = promedioind+"%";
      document.getElementById("table").append(row)
    }
  }
}