let form = document.getElementById("add-recipe-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let recipe = document.getElementById("item").value;
  let ingredients = document.getElementById("ingredients").value.split(",");
  let category = document.getElementById("item-category").value;

  console.log(ingredients);

  let recipiesobj = {
    recipename: recipe,
    ingredientsarr: ingredients,
    categoryname: category,
  };
  console.log(recipiesobj);

  localStorage.setItem("recipilist", JSON.stringify(recipiesobj));

  //   let recipies = [];
  //   recipies.push(recipe, ingredients, category);
  //   console.log(recipies);

  //   let recipiesobj = Object.assign({}, recipies);
  //   console.log(JSON.stringify(recipiesobj));

  // Make a table dynamically for showing data of recipes
  let table = document.getElementById("recipe - list");

  let tr = document.createElement("tr");
  let td = document.createElement("td");

  console.log(tr.appendChild(td));

  console.log(td);
});
