// call to show recipe function for the when page is refresh data is not gone

let form = document.getElementById("recipeform");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  toStoreRecipe();
});

// function to store data in local storage
function toStoreRecipe() {
  let recipe = document.getElementById("recipe").value;
  let ingredients = document.getElementById("ingredient").value.split(",");
  let category = document.getElementById("category").value;

  if (recipe === "" || ingredients === "" || category == "") {
    alert("please enter all fields");
    return;
  }

  let recipearr = JSON.parse(localStorage.getItem("recipelist")) ?? [];
  recipearr.push({
    id: crypto.randomUUID(),
    recipe: recipe,
    ingredients: ingredients,
    category: category,
  });

  // JSON.stringify(localStorage,setItem("recipelist",recipearr))
  localStorage.setItem("recipelist", JSON.stringify(recipearr));
  toShowRecipe(recipearr);
  form.reset();
}

// function to show recipe in table
// function toShowRecipe() {
//   let recipearr = JSON.parse(localStorage.getItem("recipelist")) ?? [];
//   let tbody = document.getElementById("tbody");

//   tbody.innerHTML = "";

//   recipearr.forEach((element) => {
//     let tr = document.createElement("tr");
//     let td1 = document.createElement("td");
//     let td2 = document.createElement("td");
//     let td3 = document.createElement("td");
//     let td4 = document.createElement("td");
//     let editbtn = document.createElement("button");
//     let deletebtn = document.createElement("button");

//     tr.id = `recipe-row-${element.id}`;
//     td1.innerHTML = element.recipe;
//     td2.innerHTML = element.ingredients.join(",");
//     td3.innerHTML = element.category;

//     editbtn.textContent = "Edit";
//     deletebtn.textContent = "Delete";

//     td4.appendChild(editbtn);
//     td4.appendChild(deletebtn);
//     tr.appendChild(td1);
//     tr.appendChild(td2);
//     tr.appendChild(td3);
//     tr.appendChild(td4);

//     tbody.appendChild(tr);

//     deletebtn.addEventListener("click", () => {
//       toDeleteRecipe(element.id);
//     });

//     editbtn.addEventListener("click", () => {
//       toEditRecipe(element.id);
//     });
//   });
// }

function toShowRecipe(recipearr) {
  let tbody = document.getElementById("tbody");

  tbody.innerHTML = "";

  recipearr.forEach((element) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let editbtn = document.createElement("button");
    let deletebtn = document.createElement("button");

    tr.id = `recipe-row-${element.id}`;
    td1.innerHTML = element.recipe;
    td2.innerHTML = element.ingredients.join(",");
    td3.innerHTML = element.category;

    editbtn.textContent = "Edit";
    deletebtn.textContent = "Delete";

    td4.appendChild(editbtn);
    td4.appendChild(deletebtn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tbody.appendChild(tr);

    deletebtn.addEventListener("click", () => {
      toDeleteRecipe(element.id);
    });

    editbtn.addEventListener("click", () => {
      toEditRecipe(element.id);
    });
  });
}
toShowRecipe(JSON.parse(localStorage.getItem("recipelist")) ?? []);
// function to delete recipe
function toDeleteRecipe(deleteid) {
  let recipearr = JSON.parse(localStorage.getItem("recipelist")) ?? [];

  let newarrafterremove = recipearr.filter((e) => {
    return e.id !== deleteid;
  });

  localStorage.setItem("recipelist", JSON.stringify(newarrafterremove));

  let rowToRemove = document.getElementById(`recipe-row-${deleteid}`);
  if (rowToRemove) {
    rowToRemove.remove();
  }
}

// function to edit recipe
function toEditRecipe(editid) {
  let recipearr = JSON.parse(localStorage.getItem("recipelist")) ?? [];

  recipearr.find((element) => {
    if (element.id === editid) {
      console.log(element.recipe, element.ingredients, element.category);

      let recipe = document.getElementById("recipe");
      let ingredients = document.getElementById("ingredient");
      let category = document.getElementById("category");

      recipe.value = element.recipe;
      ingredients.value = element.ingredients;
      category.value = element.category;
    }
  });
}

// function to show searching result

let searchinput = document.getElementById("search-value");
searchinput.addEventListener("input", toSearch);

function toSearch(e) {
  let value = e.target.value.toLowerCase().trim();

  let recipearr = JSON.parse(localStorage.getItem("recipelist")) || [];

  if (value === "") {
    toShowRecipe(recipearr);
    return;
  }
  let filteredResult = recipearr.filter((element) => {
    return (
      element.recipe.toLowerCase().includes(value) ||
      element.ingredients.join().toLowerCase().includes(value) ||
      element.category.toLowerCase().includes(value)
    );
  });

  toShowRecipe(filteredResult);
}
let categoryfilter = document.getElementById("category-filter");
categoryfilter.addEventListener("change", toFilter);

function toFilter(e) {
  let filtervalue = e.target.value;
  let recipearr = JSON.parse(localStorage.getItem("recipelist")) || [];
  if (filtervalue === "All") {
    toShowRecipe(recipearr);
    return;
  }
  let filteredResult = recipearr.filter((element) => {
    return element.category.includes(filtervalue);
  });

  toShowRecipe(filteredResult);
}
