document.addEventListener("DOMContentLoaded", function () {
  const summaryList = document.getElementById("summary-list");
  const totalPriceElement = document.getElementById("total-price");

  // Recuperar información del cliente
  const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
  if (clientInfo) {
    document.getElementById("clientNameDisplay").textContent = clientInfo.name;
    document.getElementById("clientPhoneDisplay").textContent =
      clientInfo.phone;
    document.getElementById("clientAddressDisplay").textContent =
      clientInfo.address;
    document.getElementById("clientEmailDisplay").textContent =
      clientInfo.email;
  }

  // Recuperar la información guardada del estimado
  const savedSummary = JSON.parse(localStorage.getItem("treeSummary")) || [];
  let total = 0;

  savedSummary.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.quantity}x ${item.name} - $${item.total.toFixed(
      2
    )}`;
    summaryList.appendChild(li);
    total += item.total;
  });

  // Mostrar el total
  totalPriceElement.textContent = total.toFixed(2);

  // Descargar PDF
  document
    .getElementById("downloadPdfBtn")
    .addEventListener("click", function () {
      const element = document.querySelector(".estimate");

      // Obtener el nombre del cliente desde localStorage
      const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
      const clientName = clientInfo
        ? clientInfo.name.replace(/\s+/g, "_")
        : "Estimate";

      html2pdf()
        .set({
          margin: [10, 10, 10, 10], // Márgenes en mm (arriba, derecha, abajo, izquierda)
          filename: `Tree_Lighting_Estimate_${clientName}.pdf`, // Incluir el nombre del cliente
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 }, // Aumenta la calidad de la imagen renderizada
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    });
});
