document.addEventListener("DOMContentLoaded", function () {
  const treeList = document.getElementById("tree-list");
  const totalPriceElement = document.getElementById("total-price");

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
    quantityInput.style.display = "none"; // Oculto al inicio

    // Mostrar cantidad solo si el checkbox está seleccionado
    checkbox.addEventListener("change", function () {
      quantityInput.style.display = this.checked ? "inline-block" : "none";
      calculateTotal(); // Recalcular total cuando se seleccione/deseleccione un árbol
    });

    // Detectar cambios en la cantidad
    quantityInput.addEventListener("input", calculateTotal);

    // Agregar elementos al formulario
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(quantityInput);
    treeList.appendChild(div);
  });

  // Actualizar la lista de elementos seleccionados
  function updateSummary(summary) {
    const summaryList = document.getElementById("summary-list");
    summaryList.innerHTML = ""; // Limpiar lista antes de agregar nuevos elementos

    summary.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.quantity}x ${item.name} - $${item.total.toFixed(
        2
      )}`;
      summaryList.appendChild(li);
    });
  }

  // Función para calcular el total
  function calculateTotal() {
    let total = 0;
    let summary = [];

    document
      .querySelectorAll(".tree-item input[type='checkbox']")
      .forEach((checkbox, index) => {
        if (checkbox.checked) {
          const quantity = document.getElementById(`qty-${index}`).value || 1;
          const treeName =
            checkbox.nextElementSibling.textContent.split(" - $")[0]; // Extraer solo el nombre

          total += parseFloat(checkbox.dataset.price) * parseInt(quantity);

          summary.push({
            name: treeName,
            quantity: quantity,
            price: parseFloat(checkbox.dataset.price),
            total: parseFloat(checkbox.dataset.price) * parseInt(quantity),
          });
        }
      });

    // Mostrar el total en formato de moneda
    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // Actualizar resumen en el HTML
    updateSummary(summary);

    // Guardar el resumen en localStorage
    localStorage.setItem("treeSummary", JSON.stringify(summary));
  }

  document
    .getElementById("generateEstimateBtn")
    .addEventListener("click", function () {
      const clientName = document.getElementById("clientName").value.trim();
      const clientPhone = document.getElementById("clientPhone").value.trim();
      const clientAddress = document
        .getElementById("clientAddress")
        .value.trim();
      const clientEmail = document.getElementById("clientEmail").value.trim();

      // Validar que todos los campos están llenos
      if (!clientName || !clientPhone || !clientAddress || !clientEmail) {
        alert("Please fill in all required fields.");
        return;
      }

      // Guardar en localStorage para que estimate.html pueda recuperar los datos
      localStorage.setItem(
        "clientInfo",
        JSON.stringify({
          name: clientName,
          phone: clientPhone,
          address: clientAddress,
          email: clientEmail,
        })
      );

      // Redirigir a la página del estimado
      window.open("estimate.html", "_blank");
    });
});
