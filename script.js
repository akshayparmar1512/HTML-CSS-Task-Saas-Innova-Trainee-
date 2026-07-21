let tbody = document.getElementById("tbody");

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Something went wrong!! Unable to fetch the data");
    }
    const data = await response.json();
    console.log(data);
    renderData(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData();

function renderData(data) {
  tbody.innerHTML = "";

  data.forEach((element) => {
    let row = document.createElement("tr");
    let namecell = document.createElement("td");
    let emailcell = document.createElement("td");
    let addresscell = document.createElement("td");
    let add = "";
    for (let key in element.address) {
      add += element.address[key];
    }

    row.setAttribute("id", `${element.recipeid}`);
    namecell.textContent = element.name;
    emailcell.textContent = element.email;
    addresscell.textContent = add;
    console.log(element.address);
    row.append(namecell, emailcell, addresscell);

    tbody.append(row);
  });
}
