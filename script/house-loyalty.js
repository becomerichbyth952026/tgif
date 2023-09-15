import { loyaltyData } from "./house-loyalty.mjs";
console.log(loyaltyData);

let loyal_data = loyaltyData.results[0].members;

let members = loyal_data.sort(function(a,b){
   return a - b
});


buildTable1(members)
function buildTable1(memebers_one) {
  document.getElementById("table1").innerHTML = ""; 
  for (var i = 0; i < 10; i++) { 
      var row = document.createElement("tr"); 
      var link = document.createElement("a"); 
      link.textContent = memebers_one[i].first_name + " " + (memebers_one[i].middle_name || "") + " " + memebers_one[i].last_name; 
      link.setAttribute("href", memebers_one[i].url) 
      row.insertCell().append(link); 
      row.insertCell().innerHTML = memebers_one[i].total_votes;
      row.insertCell().innerHTML = memebers_one[i].votes_with_party_pct;
      document.getElementById("table1").append(row) 
  }
}


buildTable2(loyal_data);
function buildTable2(memebers_two) {
  document.getElementById("table2").innerHTML = ""; 
  for (var i = 0; i < 10; i++) { 
      var row = document.createElement("tr"); 
      var link = document.createElement("a"); 
      link.textContent = memebers_two[i].first_name + " " + (memebers_two[i].middle_name || "") + " " + memebers_two[i].last_name; 
      link.setAttribute("href", memebers_two[i].url) 
      row.insertCell().append(link); 
      row.insertCell().innerHTML = memebers_two[i].total_votes;
      row.insertCell().innerHTML = memebers_two[i].votes_with_party_pct;
      document.getElementById("table2").append(row);
  }
}

buildTable(loyal_data);
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





