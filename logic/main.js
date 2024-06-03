let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let Create = document.getElementById("Create");
let products;
let mode = "create";
let tmp;

if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

function getTotal() {
  if (price.value != "") {
    let totalcount = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = totalcount;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "red";
    total.innerHTML = "";
  }
}
Create.addEventListener("click", function () {
  let prod = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    count: count.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
    total: total.innerHTML,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    category.value
  ) {
    if (mode === "create") {
      if (prod.count > 1) {
        for (let i = 0; i < prod.count; i++) {
          products.push(prod);
        }
      } else {
        products.push(prod);
      }
    } else {
      products[tmp] = prod;
      count.style.display = "block";
      mode = "create";
      Create.innerHTML = "create";
      total.style.background = "red";
    }
  } else {
    cleardata();
  }
  localStorage.setItem("product", JSON.stringify(products));
  showdata();
});

// clear inputs

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
function showdata() {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `<tr>
                        <td>${i + 1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let BtnDelete = document.getElementById("deleteAll");
  if (products.length != 0) {
    BtnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All ( ${products.length})</button>
        `;
  } else {
    BtnDelete.innerHTML = "";
  }
  cleardata();
}
showdata();
function deleteData(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showdata();
}
function updateData(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  getTotal();
  category.value = products[i].category;
  count.style.display = "none";
  tmp = i;
  Create.innerHTML = "update";
  mode = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
function deleteAll() {
  products.splice(0);
  localStorage.product = JSON.stringify(products);
  showdata();
}

// search
let searchMood = "title";
function getSearchMode(id) {
  let search = document.getElementById("Search");
  if (id == "SeachTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
    search.value = "";
    showdata();
  } else {
    searchMood = "Category";
    search.placeholder = "Search By Category";
    search.value = "";
    showdata();
  }
  search.focus();
}
function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(value)) {
        table += `<tr>
                        <td>${i}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(value)) {
        table += `<tr>
                        <td>${i}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
