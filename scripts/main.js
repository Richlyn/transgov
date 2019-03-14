var allMembers = data.results[0].members; //allows us to access just the members of the representative API
var body = document.getElementById("tBody");

function filterMembers() {
  var party = document.querySelectorAll('input[type="checkbox"]:checked');
  var partyArray = Array.from(party);
  var state = document.getElementById("state");
  var state_value = state.options[state.selectedIndex].value; // get current option selected
  var members = []; //create empty member list

  partyArray.forEach(function(element) {
    members = members.concat(
      allMembers.filter(function(el) {
        return el["party"] == element.value; // filter by multi checkbox
      })
    );
  });

  members = members.length == 0 ? allMembers : members; //if empty show all members

  if (state_value !== "") {
    members = members.filter(function(el) {
      return el["state"] == state_value; // filter by select
    });
  }

  body.innerHTML = ""; // clean table
  renderTable(members); // rebuild table
}

function renderTable(allMembers) {
  for (var i = 0; i < allMembers.length; i++) {
    var order = i + 1 + ".";
    body.innerHTML =
      body.innerHTML +
      "<tr><td>" +
      order +
      "</td><td>" +
      fullName(
        allMembers[i]["last_name"],
        allMembers[i]["middle_name"],
        allMembers[i]["first_name"]
      ) +
      "</td><td>" +
      allMembers[i]["party"] +
      "</td><td>" +
      allMembers[i]["state"] +
      "</td><td>" +
      allMembers[i]["seniority"] +
      "</td><td>" +
      allMembers[i]["votes_with_party_pct"] +
      "</td></tr>";
  }
}
renderTable(allMembers);

function fullName(last_name, middle_name, first_name) {
  return middle_name == null
    ? last_name + ", " + first_name
    : last_name + ", " + middle_name + " " + first_name;
}

/*function memberTable(allMembers) {
  var tBody = document.getElementById("tBody");
  var party = document.querySelectorAll('input[type="checkbox"]:checked');
  var partyArray = Array.from(party);

  if (partyArray.length > 0) {
    tBody.innerHTML = "";
    tBody.insertRow("tRow");
    for (var i = 0; i < allMembers.length; i++) {
      for (var j = 0; j < partyArray.length; j++) {
        if (allMembers[i].party == partyArray[j].value) {
          //comparing arrays and not indexes not creating a false positive
          var tRow = tBody.insertRow();
          tRow.insertCell().innerHTML = i + 1 + ".";

          if (allMembers[i].middle_name == null) {
            var repName =
              allMembers[i].last_name + ", " + allMembers[i].first_name;
            tRow.insertCell().innerHTML = repName.link(allMembers[i].url);
          } else {
            var repName =
              allMembers[i].last_name +
              ", " +
              allMembers[i].first_name +
              " " +
              allMembers[i].middle_name;
            tRow.insertCell().innerHTML = repName.link(allMembers[i].url);
          }
          tRow.insertCell().innerHTML = allMembers[i].party;
          tRow.insertCell().innerHTML = allMembers[i].state;

          if (allMembers[i].seniority == 1) {
            tRow.insertCell().innerHTML = allMembers[i].seniority + " year";
          } else {
            tRow.insertCell().innerHTML = allMembers[i].seniority + " years";
          }
          tRow.insertCell().innerHTML =
            allMembers[i].votes_with_party_pct + "%";
          tBody.append(tRow);
        }
      }
    }
  } else {
    tBody.innerHTML = "";
    for (var i = 0; i < allMembers.length; i++) {
      var tRow = tBody.insertRow();
      tRow.insertCell().innerHTML = i + 1 + ".";

      if (allMembers[i].middle_name == null) {
        var repName = allMembers[i].last_name + ", " + allMembers[i].first_name;
        tRow.insertCell().innerHTML = repName.link(allMembers[i].url);
      } else {
        var repName =
          allMembers[i].last_name +
          ", " +
          allMembers[i].first_name +
          " " +
          allMembers[i].middle_name;
        tRow.insertCell().innerHTML = repName.link(allMembers[i].url);
      }
      tRow.insertCell().innerHTML = allMembers[i].party;
      tRow.insertCell().innerHTML = allMembers[i].state;

      if (allMembers[i].seniority == 1) {
        tRow.insertCell().innerHTML = allMembers[i].seniority + " year";
      } else {
        tRow.insertCell().innerHTML = allMembers[i].seniority + " years";
      }

      tRow.insertCell().innerHTML = allMembers[i].votes_with_party_pct + "%";
    }
  }
}
// memberTable(allMembers); */

for (var i = 0; i < usStates.length; i++) {
  var option = document.createElement("option");
  option.text = usStates[i].name;
  option.value = usStates[i].abbreviation;
  var select = document.getElementById("state");

  select.appendChild(option);
}
