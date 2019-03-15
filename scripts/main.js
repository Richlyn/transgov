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

for (var s = 0; s < usStates.length; s++) {
  var option = document.createElement("option");
  option.text = usStates[s].name;
  option.value = usStates[s].abbreviation;
  var select = document.getElementById("state");

  select.appendChild(option);
}
