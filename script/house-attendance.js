import { house_att_Data } from "./house-attandance.mjs";
console.log(house_att_Data);


let house_att = house_att_Data.results[0].members;

let members = house_att.sort(function(a,b){
  return a.missed_votes - b.missed_votes;
})

let membersUp = members.slice(-10);

let members_Up = membersUp.sort(function(a,b){
  return  b.votes_with_party_pct - a.votes_with_party_pct;
});


let membersDown = members_Up.slice(0,10);  


buildTable1(members_Up);
function buildTable1(member_One) {
  document.getElementById("table1").innerHTML = ""; 
  for (let i = 0; i < member_One.length; i++) { 
      let row = document.createElement("tr"); 
      let link = document.createElement("a"); 
      link.textContent = member_One[i].first_name + " " + (member_One[i].middle_name || "") + " " + member_One[i].last_name; 
      link.setAttribute("href", member_One[i].url) 
      row.insertCell().append(link); 
      row.insertCell().innerHTML = member_One[i].missed_votes;
      row.insertCell().innerHTML = member_One[i].missed_votes_pct;
      document.getElementById("table1").append(row) 
  }
}


buildTable2(membersDown);
function buildTable2(member_two) {
  document.getElementById("table2").innerHTML = ""; 
  for (let i = 0; i < member_two.length; i++) { 
      let row = document.createElement("tr"); 
      let link = document.createElement("a"); 
      link.textContent = member_two[i].first_name + " " + (member_two[i].middle_name || "") + " " + member_two[i].last_name; 
      link.setAttribute("href", member_two[i].url) 
      row.insertCell().append(link); 
      row.insertCell().innerHTML = member_two[i].missed_votes;
      row.insertCell().innerHTML = member_two[i].missed_votes_pct;
      document.getElementById("table2").append(row) 
  }
}


buildTable(house_att);
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