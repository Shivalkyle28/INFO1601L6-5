async function getData(url, renderFun){
  try{
    let response = await fetch(url);
    let result = await response.json();
    renderFun(result);
  }catch(e){
    console.log(e);
  }
}

function drawTable(records){
  let result = document.querySelector('#result');
  let html = '';

  for(let record of records){
    html += `<tr id="${record.id}">
      <td>${record.id}</td>
      <td>${record.name}</td>
      <td>${record.brewery_type}</td>
      <td>
        <a href="#${record.id}" onclick="getData('https://api.openbrewerydb.org/breweries/${record.id}', drawDetails)">
          View More Details
        </a>
      </td>
    </tr>`;
  }

  result.innerHTML = html;
}

function drawDetails(record){
  let details = document.querySelector('#details');

  let html = `
    <div class="card">
      <div class="card-content">
        <span class="card-title">${record.name}</span>
        <p><strong>ID:</strong> ${record.id}</p>
        <p><strong>Type:</strong> ${record.brewery_type}</p>
        <p><strong>Phone:</strong> ${record.phone || 'N/A'}</p>
        <p><strong>Website:</strong> ${
          record.website_url
            ? `<a href="${record.website_url}" target="_blank">${record.website_url}</a>`
            : 'N/A'
        }</p>
        <p><strong>Address:</strong> ${record.street || 'N/A'}, ${record.city || ''}, ${record.state || ''}, ${record.country || ''}</p>
      </div>
    </div>
  `;

  details.innerHTML = html;
}

getData("https://api.openbrewerydb.org/breweries", drawTable);
