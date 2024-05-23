const result = document.getElementById("result");
const filter = document.getElementById("filter");
const statusEl = document.querySelector(".status");
const listItem = [];

async function getData() {
  filter.disabled = true; // Disable the input field
  statusEl.innerHTML = "กำลังโหลดขัอมูล...";
  const url = "https://restcountries.com/v3.1/all";
  try {
    const response = await fetch(url);
    const items = await response.json();
    result.innerHTML = "";
    items.forEach((data) => {
      const li = document.createElement("li");
      listItem.push(li);
      li.innerHTML = `
          <img src="${data.flags.svg}" alt="Flag of ${data.name.common}"/>
          <div class="info">
            <h4>${data.name.common}</h4>
            <p>${formatNumber(data.population)}</p>
          </div>
        `;
      result.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  } finally {
    filter.disabled = false; // Enable the input field
    statusEl.innerHTML = "";
  }
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

filter.addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase();
  let hasMatch = false;
  console.log(listItem);
  listItem.forEach((item) => {
    if (item.innerText.toLowerCase().includes(search)) {
      //แสดงรายการ
      item.classList.remove("hide");
      hasMatch = true;
    } else {
      //ซ่อนรายการไม่เกี่ยวข้อง
      item.classList.add("hide");
    }
  });
  if (!hasMatch) {
    if (!document.getElementById("no-data")) {
      const noDataItem = document.createElement("li");
      noDataItem.id = "no-data";
      noDataItem.innerHTML = `
      <h3>ไม่พบข้อมูล...</h3>
    `;
      result.appendChild(noDataItem);
    }
  } else {
    const noDataItem = document.getElementById("no-data");
    if (noDataItem) {
      noDataItem.remove();
    }
  }
});
getData();
