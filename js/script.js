const trees = [
  { name: "Bismark Palm, Trunk", price: 420 },
  { name: "Bismark Palm, Trunk and Fronds", price: 720 },
  { name: "Bottle Palm", price: 128 },
  { name: "C7 Installation (Per lnf)", price: 3.75 },
  { name: "C9 Installation (Per lnf)", price: 5.75 },
  { name: "C9, Twinkle (Per lnf)", price: 5.25 },
  { name: "Canary Palm, Trunk", price: 420 },
  { name: "Canary Palm, Trunk and Fronds", price: 820 },
  { name: "Christmas Palm, Trunk", price: 80 },
  { name: "Christmas Palm, Trunk and Fronds", price: 155 },
  { name: "Coconut Palm, Trunk", price: 380 },
  { name: "Coconut Palm, Trunk and Fronds", price: 640 },
  { name: "Cypress Tree", price: 295 },
  { name: "Eugenia Cone", price: 89 },
  { name: "Flat Figure (1ft Height)", price: 125 },
  { name: "Flat Figure (3ft Height)", price: 375 },
  { name: "Flat Figure (4ft Height)", price: 500 },
  { name: "Foxtail Palm, Trunk", price: 125 },
  { name: "Foxtail Palm, Trunk and Fronds", price: 385 },
  { name: "Montgomery Palm Trunk", price: 150 },
  { name: "Oak Tree, 60% wrap", price: 1620 },
  { name: "Reclinata Trunk", price: 95 },
  { name: "Robellini Palm Trunk", price: 65 },
  { name: "Sabal Palm Trunk", price: 380 },
  { name: "Shrubs (Per lnf)", price: 14.75 },
  { name: "Volumetric Figure (6ft Height)", price: 980 },
  { name: "Washingtonia Palm Trunk", price: 420 },
];

const treeList = document.getElementById("tree-list");

// Generar dinámicamente los checkboxes con input de cantidad
trees.forEach((tree, index) => {
  const div = document.createElement("div");
  div.classList.add("tree-item");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `tree-${index}`;
  checkbox.name = "trees";
  checkbox.value = tree.price;
  checkbox.dataset.price = tree.price;

  // Etiqueta del checkbox
  const label = document.createElement("label");
  label.htmlFor = `tree-${index}`;
  label.textContent = `${tree.name} - $${tree.price.toFixed(2)}`;

  // Input de cantidad
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.classList.add("quantity-input");
  quantityInput.id = `qty-${index}`;
  quantityInput.min = "1";
  quantityInput.value = "1";

  // Mostrar cantidad solo si el checkbox está seleccionado
  checkbox.addEventListener("change", function () {
    quantityInput.style.display = this.checked ? "inline-block" : "none";
  });

  // Agregar elementos al formulario
  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(quantityInput);
  treeList.appendChild(div);
});
