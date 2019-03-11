var allMembers = data.results[0].members; //allows us to access just the members of the representative API

function memberTable(allMembers) {
  var tRow = document.getElementById("tBody");
  for (var i = 0; i < allMembers.length; i++) {
    var tRow = tBody.insertRow("tRow");
    tRow.insertCell().innerHTML = i + 1 + ".";

    if (allMembers[i].middle_name == null) {
      tRow.insertCell().innerHTML =
        allMembers[i].last_name + ", " + allMembers[i].first_name;
    } else {
      tRow.insertCell().innerHTML =
        allMembers[i].last_name +
        ", " +
        allMembers[i].first_name +
        " " +
        allMembers[i].middle_name;
    }
    tRow.insertCell().innerHTML = allMembers[i].party;
    tRow.insertCell().innerHTML = allMembers[i].state;

    if (allMembers[i].seniority == 1) {
      tRow.insertCell().innerHTML = allMembers[i].seniority + " year";
    } else {
      tRow.insertCell().innerHTML = allMembers[i].seniority + " years";
    }

    tRow.insertCell().innerHTML = allMembers[i].votes_with_party_pct + "%";
    tBody.append(tRow);
  }
}

console.log(memberTable(allMembers));