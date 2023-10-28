// Function to handle the image selection and decoding
function decodeQRCode() {

 var qrData = [
    {
      "idShort": "Process_A_Status",
      "value": true,
      "process_number_value": "1"
    },
    {
      "idShort": "Process_B_Status",
      "value": { "value": true },
      "process_number_value": "2"
    }
  ]

  const input = document.getElementById("qr-image-input");

  var QRdata = null;

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        QRdata = code;

        if (code) {
        //  qrCodeData = JSON.parse(code.data);
            console.log(code.data);
        //  console.log(qrData[0].process_number_value);
        } else {

        }
      };

    };

    reader.readAsDataURL(input.files[0]);
  }



}



// Attach an event listener to the button element

