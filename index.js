let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulL = document.getElementById("ul-l");
const deleteButton = document.getElementById("delete-btn");
const saveButton = document.getElementById("save-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveButton.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    // console.log(tabs[0].url);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    // listItems +=
    //   "<li><a href='" +
    //   myLeads[i] +
    //   "' target='_blank'>" +
    //   myLeads[i] +
    //   "</a></li>";
    listItems += `<li>
     <a href='${leads[i]}' target='_blank'>
        ${leads[i]}
      </a>
    </li> `;
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulL.append(li);
  }

  ulL.innerHTML = listItems;
}

deleteButton.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
