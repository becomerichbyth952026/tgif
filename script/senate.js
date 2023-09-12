import { senateData } from "./senate.mjs"


console.log(senateData);


let senate_Data = senateData.results[0].members;

let element = document.getElementById('table');

// create a function to build table 

buildTable(senate_Data)


function buildTable(membersArr) {
  document.getElementById("tbody").innerHTML = ""; 
  for (let i = 0; i < membersArr.length; i++) { 
      let row = document.createElement("tr"); 
      let link = document.createElement("a"); 
      link.textContent = membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name; 
      link.setAttribute("href", membersArr[i].url) 
      row.insertCell().append(link);
      row.insertCell().innerHTML = membersArr[i].party; 
      row.insertCell().innerHTML = membersArr[i].state; 
      row.insertCell().innerHTML = membersArr[i].seniority;
      row.insertCell().innerHTML = membersArr[i].votes_with_party_pct;
      document.getElementById("tbody").append(row) 
  }
}




