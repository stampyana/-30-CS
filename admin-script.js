const products = [
  // เสื้อ: มีสี+ไซส์
  ...['ขาว','น้ำเงินเข้ม'].flatMap(color =>
    ['SS','S','M','L','XL','2XL','3XL','4XL'].map(size => ({
      id: `shirt-${color}-${size}`,
      name: 'เสื้อ',
      image: 'img/unnamed.png',
      price: 320,
      color, size,
      stock: Math.floor(Math.random()*20)+1
    }))
  ),
  ...['น้ำเงินเข้ม','สีเขียว','สีเทา'].map(color => ({
    id: `hat-${color}`,
    name: 'หมวก',
    image: 'img/หมวก.jpg',
    price: 250,
    color, size: '-',
    stock: Math.floor(Math.random()*20)+1
  })),
  { id:'bag', name:'กระเป๋า', image:'img/กระเป๋า.jpg', price:350, color:'-', size:'-', stock:10 },
  { id:'glass', name:'แก้ว', image:'img/แก้ว.jpg', price:190, color:'-', size:'-', stock:10 },
  { id:'pin', name:'เข็มกลัด', image:'img/เข็มกรัด.jpg', price:149, color:'-', size:'-', stock:10 },
  { id:'umbrella', name:'ร่ม', image:'img/ร่ม.jpg', price:250, color:'-', size:'-', stock:10 },
];

const grouped = products.reduce((acc, p) => {
  const key = `${p.name}-${p.price}`;
  (acc[key] = acc[key] || []).push(p);
  return acc;
}, {});


function render() {
  const tbody = document.getElementById('product-table');
  const search = document.getElementById('search-input')?.value?.toLowerCase() || '';
  tbody.innerHTML = '';

  let totalAll = 0;

  Object.values(grouped).forEach(group => {
    const totalStock = group.reduce((sum, p) => sum + p.stock, 0);
    totalAll += totalStock;

    if (!group[0].name.toLowerCase().includes(search)) return;

    const main = document.createElement('tr');
    main.innerHTML = `
      <td><img src="${group[0].image}" alt=""></td>
      <td>${group[0].name}</td>
      <td>${group[0].price}</td>
      <td id="total-${group[0].id}">${totalStock}</td>
      <td><button onclick="toggleDetails('${group[0].id}')">ดูรายละเอียด</button></td>
    `;
    tbody.appendChild(main);

    const det = document.createElement('tr');
    det.classList.add('details-row', 'hidden');
    det.id = `details-${group[0].id}`;
    const cell = document.createElement('td');
    cell.colSpan = 5;
    cell.classList.add('details-cell');

    const innerT = document.createElement('table');
    innerT.classList.add('details-table');
    innerT.innerHTML = `
      <thead><tr>
        <th>สี</th><th>ไซส์</th><th>คงเหลือ</th><th>เพิ่ม</th>
      </tr></thead>
      <tbody>
        ${group.map(p => `
          <tr>
            <td>${p.color}</td>
            <td>${p.size}</td>
            <td id="stk-${p.id}">${p.stock}</td>
            <td>
              <input type="number" id="inp-${p.id}" min="1" value="1">
              <button onclick="addStock('${p.id}')">เพิ่ม</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
    cell.appendChild(innerT);
    det.appendChild(cell);
    tbody.appendChild(det);
  });

  document.getElementById('summary').innerText = `รวมทั้งหมด: ${totalAll} ชิ้น`;
}

function toggleDetails(id) {
  const row = document.getElementById(`details-${id}`);
  row.classList.toggle('hidden');
}

function toggleAllDetails(show) {
  Object.values(grouped).forEach(group => {
    const row = document.getElementById(`details-${group[0].id}`);
    if (row) row.classList.toggle('hidden', !show);
  });
}


function addStock(id) {
  const input = document.getElementById(`inp-${id}`);
  const amt = parseInt(input.value);
  if (!amt || amt < 1) return;

  const p = products.find(x => x.id === id);
  p.stock += amt;
  document.getElementById(`stk-${id}`).innerText = p.stock;

  const key = `${p.name}-${p.price}`;
  const total = grouped[key].reduce((s, pp) => s + pp.stock, 0);
  document.getElementById(`total-${grouped[key][0].id}`).innerText = total;

  input.value = 1;

  render();
}

render();
