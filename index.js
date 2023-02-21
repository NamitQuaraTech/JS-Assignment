var selectedRow = null;
var selectedValuesText;
function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) insertNewRecord(formData);
  else updateRecord(formData);
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["dob"] = document.getElementById("dob").value;
  formData["gender"] = document.getElementById("gender").value;
  let select = document.getElementById("skills");
  let selectedValues = [];
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].selected) {
      selectedValues.push(select.options[i].value);
    }
  }
  selectedValuesText = selectedValues.join(", ");
  formData["hobbies"] = document.getElementById("hobbies").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("studentList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.name;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = getAge(data.dob);
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.gender;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = selectedValuesText;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = storeCheckbox();
  cell4 = newRow.insertCell(5);
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("name").value;
  document.getElementById("dob").value;
  document.getElementById("gender").value;
  document.getElementById("skills").value;
  document.getElementById("hobbies").value;
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  console.log("editing");
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("dob").value = selectedRow.cells[1].innerHTML;
  document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
  // document.getElementById("skills").value = selectedRow.cells[3].innerHTML;
  document.getElementById("hobbies").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
  console.log("updating")
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = getAge(formData.dob);
  selectedRow.cells[2].innerHTML = formData.gender;
  let select = document.getElementById("skills");
  let selectedValues = [];
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].selected) {
      selectedValues.push(select.options[i].value);
    }
  }
  selectedValuesText = selectedValues.join(", ");
  selectedRow.cells[3].innerHTML = selectedValuesText;
  selectedRow.cells[4].innerHTML = storeCheckbox();
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("studentList").deleteRow(row.rowIndex);
    resetForm();
  }
}

function getAge(date) {
  var dob = new Date(date);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);
  return age;
}
function storeCheckbox() {
  let arr = [];
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  for (let i = 0 ; i < checkboxes.length; i++) {
   arr.push(checkboxes[i].value)
  }
  return arr;
 }