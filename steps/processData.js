const url = "https://server.basyx.iese.de/aasServer/shells/AssetAdministrationShell---896YHAPP/aas/submodels"; // Replace with your URL
const cardContainer = document.getElementById("card-container");

const localData =  [
  {
    "modelType": {
      "name": "Property"
    },
    "dataSpecification": [],
    "embeddedDataSpecifications": [],
    "kind": "Instance",
    "value": true,
    "valueType": "boolean",
    "idShort": "Normal_Incubator",
    "semanticId": {
      "keys": []
    },
    "parent": {
      "keys": [
        {
          "type": "Submodel",
          "local": true,
          "value": "https://example.com/ids/sm/5180_9082_0132_5943",
          "idType": "IRI"
        }
      ]
    }
  },
  {
    "modelType": {
      "name": "Property"
    },
    "dataSpecification": [],
    "embeddedDataSpecifications": [],
    "kind": "Instance",
    "value": true,
    "valueType": "boolean",
    "idShort": "Orbital_Incubator_1",
    "semanticId": {
      "keys": []
    },
    "parent": {
      "keys": [
        {
          "type": "Submodel",
          "local": true,
          "value": "https://example.com/ids/sm/5180_9082_0132_5943",
          "idType": "IRI"
        }
      ]
    }
  },
  {
    "modelType": {
      "name": "Property"
    },
    "dataSpecification": [],
    "embeddedDataSpecifications": [],
    "kind": "Instance",
    "value": false,
    "valueType": "boolean",
    "idShort": "Robot_1",
    "semanticId": {
      "keys": []
    },
    "parent": {
      "keys": [
        {
          "type": "Submodel",
          "local": true,
          "value": "https://example.com/ids/sm/5180_9082_0132_5943",
          "idType": "IRI"
        }
      ]
    }
  },
  {
    "modelType": {
      "name": "Property"
    },
    "dataSpecification": [],
    "embeddedDataSpecifications": [],
    "kind": "Instance",
    "value": false,
    "valueType": "boolean",
    "idShort": "Orbital_Incubator_2",
    "semanticId": {
      "keys": []
    },
    "parent": {
      "keys": [
        {
          "type": "Submodel",
          "local": true,
          "value": "https://example.com/ids/sm/5180_9082_0132_5943",
          "idType": "IRI"
        }
      ]
    }
  },
  {
    "modelType": {
      "name": "Property"
    },
    "dataSpecification": [],
    "embeddedDataSpecifications": [],
    "kind": "Instance",
    "value": false,
    "valueType": "boolean",
    "idShort": "Robot_2",
    "semanticId": {
      "keys": []
    },
    "parent": {
      "keys": [
        {
          "type": "Submodel",
          "local": true,
          "value": "https://example.com/ids/sm/5180_9082_0132_5943",
          "idType": "IRI"
        }
      ]
    }
  },
  {
    "modelType": {
      "name": "Property"
    },
    "dataSpecification": [],
    "embeddedDataSpecifications": [],
    "kind": "Instance",
    "value": false,
    "valueType": "boolean",
    "idShort": "Orbital_Incubator_3",
    "semanticId": {
      "keys": []
    },
    "parent": {
      "keys": [
        {
          "type": "Submodel",
          "local": true,
          "value": "https://example.com/ids/sm/5180_9082_0132_5943",
          "idType": "IRI"
        }
      ]
    }
  }
]




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

    // Extract submodelElements from the data
    const submodelElements = data[0].submodelElements;

    // Generate cards for each submodelElement
    localData.forEach((item, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "col-md-6 mb-4";
      cardDiv.innerHTML = `
                        <div class="card">
                               <div class="card-header" style="background-color: ${item.value ? '#28a745' : '#dc3545'}; color: white;">
                              <div class="d-flex justify-content-between">
                                  <h5 class="card-title">${item.idShort}</h5>
                                  <p class="card-title">${index + 1}</p>
                              </div>
                          </div>
                            <div class="card-body">
                                <p style="font-weight: bold" class="card-text">Status: ${item.value ? "Finished" : "Yet to start"}</p>
                                <input type="file" id="qr-image-input" accept="image/*">
                                <button  class="btn btn-outline-info"  id="decode-button"
                                onclick=decodeQRCode(${JSON.stringify(item)})>Scan QR Code</button>
                            </div>
                        </div>
                    `;

      cardContainer.appendChild(cardDiv);
    });



  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });



function decodeQRCode (selectedItem){




  const url = "https://server.basyx.iese.de/aasServer/shells/AssetAdministrationShell---896YHAPP/aas/submodels"; // Replace with your URL
  const cardContainer = document.getElementById("card-container");


  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(modelData => {
      // Handle the fetched data

      // Extract submodelElements from the data
      const allSubModelData = modelData[0].submodelElements;

      // Generate cards for each submodelElement
      localData.forEach((item, index) => {

        if (selectedItem && selectedItem.idShort === item.idShort) {
          item.value = true;

        }
      });

      generateAndRenderCards(localData);

    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });




  function generateAndRenderCards(data) {

    const cardContainer = document.getElementById("card-container");

    data.forEach((item, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "col-md-6 mb-4";
      cardDiv.innerHTML = `
      <div class="card">
        <div class="card-header" style="background-color: ${item.value ? '#28a745' : '#dc3545'}; color: white;">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">${item.idShort}</h5>
            <p class="card-title">${index + 1}</p>
          </div>
        </div>
        <div class="card-body">
          <p style="font-weight: bold" class="card-text">Status: ${item.value ? "Finished" : "Yet to start"}</p>
          <input type="file" id="qr-image-input" accept="image/*">
          <button class="btn btn-outline-info" id="decode-button"
            onclick="decodeQRCode(${JSON.stringify(item)})">Scan QR Code</button>
        </div>
      </div>
    `;

      cardContainer.appendChild(cardDiv);
    });
  }

// First fetch call
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(data => {
      // Handle the fetched data
      generateAndRenderCards(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

// Later, when you want to update or render the cards again with updated data
// Call generateAndRenderCards with the updated data









}
