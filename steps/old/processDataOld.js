const url = "https://server.basyx.iese.de/aasServer/shells/AssetAdministrationShell---173B4C4E/aas/submodels/Process-Flow/submodel/submodelElements"; // Replace with your URL

// Use the fetch API to make the GET request
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    // Handle the fetched data
    const resultElement = document.getElementById("result");

    var myData = JSON.stringify(data, null, 4);


    // Assuming json_data is an array of objects
    const filtered_data = [];

    data.forEach(item => {
      const qualifiers = item.qualifiers || [];
      const process_number_qualifiers = qualifiers.filter(qualifier => qualifier.type === "process_number");

      if (process_number_qualifiers.length > 0) {
        const idShort = item.idShort;
        const value = item.value;
        const process_number_value = process_number_qualifiers[0].value;

        // Append the filtered data to the list
        filtered_data.push({
          idShort: idShort,
          value: value,
          process_number_value: process_number_value,
        });
      }
    });

    console.log(filtered_data)


    const cardContainer = document.getElementById("card-container");

    filtered_data.forEach(item => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "col-md-6 mb-4";
      cardDiv.innerHTML = `
                <div class="card">
                    <div class="card-header" id="cardHeader"  style="background-color: ${item.value ? '#28a745' : '#dc3545'}; color: white;">
                        <h5 class="card-title">${item.idShort}</h5>
                    </div>
                    <div class="card-body">
                        <p style="font-weight: bold" class="card-text">Status: ${item.value ? "Finished" : "Yet to start"}</p>
                        <p class="card-text">Process Number: ${item.process_number_value}</p>
                        <input type="file" id="qr-image-input" accept="image/*">
                        <button  class="btn ${item.value ? 'btn-success' : 'btn-danger'}"  id="decode-button" onclick="decodeQRCode()">Scan QR Code</button>
                    </div>

                </div>
            `;

      cardContainer.appendChild(cardDiv);
    })
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


function myFunction () {
  alert("ww")
  const fileInput = document.getElementById("decode-button");

  // Add an event listener to trigger decodeQRCode when a file is selected
  fileInput.addEventListener("change", decodeQRCode);
}








