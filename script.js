window.onload = setTableData();

async function shortIt(e) {
  const fullUrl = document.querySelector(".link-form").elements[0].value;
  // const shortUrl = await fetch(`http://localhost:3000/api?link=${fullUrl}`);
  const shortUrl = await fetch(
    `https://shorttit.herokuapp.com/api?link=${fullUrl}`
  );
  const shortUrlData = await shortUrl.json();
  const local = JSON.parse(window.localStorage.getItem("shortLinks"));
  let data = [];
  if (local !== null) {
    data = local.shortLinks;
    data.unshift(shortUrlData.short);
  } else {
    data = [shortUrlData.short];
  }
  const links = {
    shortLinks: data,
  };
  window.localStorage.setItem("shortLinks", JSON.stringify(links));
  setTableDataOnClick({
    full: shortUrlData.full,
    short: shortUrlData.short,
    clicks: shortUrlData.clicks,
  });
  document.querySelector(".link-form").elements[0].value = "";
}

function setTableDataOnClick(arg) {
  const tableBody = document.querySelector(".table-body");
  const row = document.createElement("tr");
  const data1 = document.createElement("th");
  data1.innerHTML = `<a href=${
    arg.full
  } target="_blank" rel="noopener noreferrer">${arg.full.slice(0, 50)}...</a>`;
  row.appendChild(data1);
  const data2 = document.createElement("th");
  data2.innerHTML = `<a href="https://shorttit.herokuapp.com/${arg.short}" target="_blank" rel="noopener noreferrer">
  https://shorttit.herokuapp.com/${arg.short}
  </a>
  <button onclick="copyText('https://shorttit.herokuapp.com/${arg.short}')">Copy</button>`;
  row.appendChild(data2);
  const data3 = document.createElement("th");
  data3.innerHTML = `${arg.clicks}`;
  row.appendChild(data3);
  tableBody.insertBefore(row, tableBody.firstChild);
}

async function setTableData() {
  const local = JSON.parse(window.localStorage.getItem("shortLinks"));

  const shortUrlData = local.shortLinks;
  const tableBody = document.querySelector(".table-body");

  for (let i = 0; i < shortUrlData.length; i++) {
    let linkData = shortUrlData[i];
    const fullUrl = await fetch(
      `https://shorttit.herokuapp.com/shortUrl?id=${linkData}`
    );
    const fullUrlData = await fullUrl.json();
    const row = document.createElement("tr");
    const data1 = document.createElement("th");
    data1.innerHTML = `<a href=${
      fullUrlData.full
    } target="_blank" rel="noopener noreferrer">${fullUrlData.full.slice(
      0,
      50
    )}...</a>`;
    row.appendChild(data1);
    const data2 = document.createElement("th");
    data2.innerHTML = `<a href="https://shorttit.herokuapp.com/${fullUrlData.short}" target="_blank" rel="noopener noreferrer">
    https://shorttit.herokuapp.com/${fullUrlData.short}
    </a>
    <button onclick="copyText('https://shorttit.herokuapp.com/${fullUrlData.short}')">Copy</button>`;
    row.appendChild(data2);
    const data3 = document.createElement("th");
    data3.innerHTML = `${fullUrlData.clicks}`;
    row.appendChild(data3);
    tableBody.appendChild(row);
  }
}

function copyText(link) {
  navigator.clipboard.writeText(link).then(
    function () {
      alert("Link copied to clipboard");
    },
    function (err) {
      console.error("Cannot copy link to clipboard", err);
    }
  );
}
