function clearData(){
  document.getElementById('customerName').value = '';
  document.getElementById('ticketID').value = '';
  document.getElementById('part').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('color').value = '';
  document.getElementById('model').value = '';
  document.getElementById('serialNumber').value = '';
  document.getElementById('partNumber').value = '';
  document.getElementById('date').value = '';
  document.getElementById('searchTicketID').value = '';
  document.getElementById('cs').value = '';
  document.getElementById('req').value = '';

}




const formData = {};

// Function to gather form data
function gatherData() {
  try {
formData.req =   document.getElementById('req').value;
    formData.cs = document.getElementById('cs').value;
    formData.customerName = document.getElementById('customerName').value;
    formData.ticketID = document.getElementById('ticketID').value;
    formData.part = document.getElementById('part').value;
    formData.quantity = document.getElementById('quantity').value;
    formData.color = document.getElementById('color').value;
    formData.model = document.getElementById('model').value;
    formData.serialNumber = document.getElementById('serialNumber').value;
    formData.partNumber = document.getElementById('partNumber').value;
    formData.date = document.getElementById('date').value;
    formData.picture = document.getElementById('picture').files[0];
  } catch (error) {
    console.error('Error gathering form data:', error);
    alert('There was an error gathering the form data. Please check the input fields.');
  }
}

// formData.push

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  gatherData(); 

  

  // Now you can use the formData object to post the data
  // console.log('Form Data:', formData);

  // const jsonData = JSON.stringify(formData);

  console.log('Form Data:', formData);
  // console.log('JSON Data:', jsonData);

  fetch("https://sheetdb.io/api/v1/bhaa1azojqomz", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((r) => r.json())
    .then((formData) => {
      // The response comes here
      console.log(formData);
      alert(`Data Submitted Successfully`)
    })
    .catch((error) => {
      // Errors are reported there
      console.log(error);
      alert(`There was a problem submitting the Data. Please Try again.`)
    });

    clearData();

}

// Attach event listener to the form
document.getElementById('disableBtn').addEventListener('click', handleSubmit);






//THIS IS THE SEARCH TICKET FUNCTION
function searchTicket(e) {
  e.preventDefault();
  const ticketID = document.getElementById('searchTicketID').value;
  fetch(`https://sheetdb.io/api/v1/bhaa1azojqomz?ticketID=${ticketID}`)
      .then(response => response.json())
      .then(data => {
          // Check if data contains any results
          if (data.length > 0) {
              let foundTicket = null;

              // Loop through the array to find the matching ticketID
              for (let i = 0; i < data.length; i++) {
                  if (data[i].ticketID === ticketID) {
                      foundTicket = data[i];
                      break; // Exit loop once ticket is found
                  }
              }

              if (foundTicket) {
                  // Populate form fields with the found ticket data
                  document.getElementById('customerName').value = foundTicket.customerName || '';
                  document.getElementById('ticketID').value = foundTicket.ticketID || '';
                  document.getElementById('part').value = foundTicket.part || '';
                  document.getElementById('quantity').value = foundTicket.quantity || '';
                  document.getElementById('color').value = foundTicket.color || '';
                  document.getElementById('model').value = foundTicket.model || '';
                  document.getElementById('serialNumber').value = foundTicket.serialNumber || '';
                  document.getElementById('partNumber').value = foundTicket.partNumber || '';
                  document.getElementById('date').value = foundTicket.date || '';
		document.getElementById('req').value = foundTicket.req || '';
		document.getElementById('cs').value = foundTicket.cs || '';
                  alert(`Ticket Found. Click Ok to Populate Data`);
              } else {
                  alert('Ticket ID not found.');
              }
          } else {
              alert('Ticket ID not found.');
          }
      })
      .catch(error => console.error('Error:', error));
}

document.getElementById('searchBtn').addEventListener('click', searchTicket);







//THIS IS THE UPDATE TICKET WITH PRICE FUNCTION
async function addPrice(e) {
  e.preventDefault();

	const req =   document.getElementById('req').value;
   const cs = document.getElementById('cs').value;
  const customerName = document.getElementById('customerName').value;
  const ticketID = document.getElementById('ticketID').value;
  const part = document.getElementById('part').value;
  const quantity = document.getElementById('quantity').value;
  const color = document.getElementById('color').value;
  const model = document.getElementById('model').value;
  const serialNumber = document.getElementById('serialNumber').value;
  const partNumber = document.getElementById('partNumber').value;
  const date = document.getElementById('date').value;
  const picture = document.getElementById('picture').files[0];
  const price = document.getElementById('price').value;
    const vendor = document.getElementById('vendor').value;
    const country = document.getElementById('country').value;
    const time = document.getElementById('time').value;
    const status = document.getElementById('status').value;
    

  const updatedData = {
      customerName: customerName,
      ticketID: ticketID,
      part: part,
      quantity: quantity,
      color: color,
      model: model,
      serialNumber: serialNumber,
      partNumber: partNumber,
      date: date,
      picture: picture ? picture.name : '' , // Only include the picture name if it exists
      price: price,
      vendor: vendor,
      country: country,
      time: time,
      status: status,
	cs: cs,
	req: req,
  };

  try {
      // Fetch the existing data
      const response = await fetch(`https://sheetdb.io/api/v1/bhaa1azojqomz/search?ticketID=${ticketID}`);
      const existingData = await response.json();

      if (existingData.length > 0) {
          // Merge existing data with updated data
          const dataToUpdate = { ...existingData[0], ...updatedData };

          // Send the updated data using PUT
          const updateResponse = await fetch(`https://sheetdb.io/api/v1/bhaa1azojqomz/ticketID/${ticketID}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToUpdate),
          });

          const updateResult = await updateResponse.json();
          console.log('Updated data:', updateResult);
          alert('Ticket updated successfully.');
      } else {
          alert('Ticket ID not found.');
      }
  } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Error updating ticket. Please try again.');
  }

  clearData();
  document.getElementById('price').value = '';
  document.getElementById('vendor').value = '';
  document.getElementById('country').value = '';
  document.getElementById('time').value = '';
  document.getElementById('status').value = '';

 window.location.reload();
}

document.getElementById('addPriceBtn').addEventListener('click', addPrice);



function updateTicket(e){
  e.preventDefault();
    const customerName = document.getElementById('customerName').value;
    const ticketID = document.getElementById('ticketID').value;
    const part = document.getElementById('part').value;
    const quantity = document.getElementById('quantity').value;
    const color = document.getElementById('color').value;
    const model = document.getElementById('model').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const partNumber = document.getElementById('partNumber').value;
    const date = document.getElementById('date').value;
    const picture = document.getElementById('picture').files[0];

    const updatedData = {
      customerName: customerName,
      ticketID: ticketID,
      part: part,
      quantity: quantity,
      color: color,
      model: model,
      serialNumber: serialNumber,
      partNumber: partNumber,
      date: date,
      picture: picture
    }

    fetch(`https://sheetdb.io/api/v1/bhaa1azojqomz?ticketID=${ticketID}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Updated data:', data);
      alert('Ticket updated successfully.');
  })
  .catch(error => {
      console.error('Error updating ticket:', error);
      alert('Error updating ticket. Please try again.');
  });

   clearData();
}

document.getElementById('updateReqBtn').addEventListener('click', addPrice);





const leftCont = document.getElementById('left');
const rightCont = document.getElementById('right');
const addpriceBtnHide = document.getElementById('addPriceBtn');
const disableBtnHide = document.getElementById('disableBtn');
const updateBtnHide = document.getElementById('updateReqBtn');
const searchBtnHide = document.getElementById('search-cont');
document.getElementById('addPriceLink').addEventListener('click', function(){
  rightCont.style.display = 'block';
  rightCont.style.width = '50%';
  leftCont.style.width = '50%';
  addpriceBtnHide.style.display = 'block';
  disableBtnHide.style.display = 'none';
  updateBtnHide.style.display = 'none';
  searchBtnHide.style.display = 'flex';
});

document.getElementById('openTicketLink').addEventListener('click', function(){
  document.getElementById('right').style.display = 'none';
leftCont.style.width = '100%';
addpriceBtnHide.style.display = 'none';
disableBtnHide.style.display = 'block';
updateBtnHide.style.display = 'none';
searchBtnHide.style.display = 'none';
})

document.getElementById('updateTicketLink').addEventListener('click', function(){
  updateBtnHide.style.display = 'block';
  rightCont.style.display = 'none';
disableBtnHide.style.display = 'none';
leftCont.style.width = '100%';
addpriceBtnHide.style.display = 'none';
searchBtnHide.style.display = 'flex';
})


