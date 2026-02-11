console.log('[Main] App initialized');

function getEquipment() {
  return JSON.parse(localStorage.getItem('equipment') || '[]');
}

function getCheckouts() {
  return JSON.parse(localStorage.getItem('checkouts') || '[]');
}

function saveEquipment(eq) {
  localStorage.setItem('equipment', JSON.stringify(eq));
}

function saveCheckouts(chk) {
  localStorage.setItem('checkouts', JSON.stringify(chk));
}

function renderEquipmentList() {
  const container = document.getElementById('equipment-list');
  container.innerHTML = '<h2>Available Equipment</h2>';

  const equipment = getEquipment();
  const checkouts = getCheckouts().filter(c => !c.returnedAt);
  const inUseIds = new Set(checkouts.map(c => c.equipmentId));
  const available = equipment.filter(e => !inUseIds.has(e.id));

  if (!available.length) {
    container.innerHTML += '<p>None available</p>';
    return;
  }

  const ul = document.createElement('ul');
  available.forEach(eq => {
    const li = document.createElement('li');
    li.textContent = eq.name;

    const btn = document.createElement('button');
    btn.textContent = 'Checkout';
    btn.onclick = () => openCheckoutModal(eq);

    li.appendChild(btn);
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

function renderOverdueReturns() {
  const container = document.getElementById('overdue-returns');
  container.innerHTML = '<h2>Overdue Returns</h2>';

  const now = new Date();
  const checkouts = getCheckouts();

  const overdue = checkouts.filter(c =>
    !c.returnedAt &&
    c.expectedReturnAt &&
    new Date(c.expectedReturnAt) < now
  );

  if (!overdue.length) {
    container.innerHTML += '<p>None overdue</p>';
    return;
  }

  const equipmentMap = Object.fromEntries(
    getEquipment().map(e => [e.id, e.name])
  );

  const ul = document.createElement('ul');
  overdue.forEach(c => {
    const li = document.createElement('li');
    const daysLate = Math.floor(
      (now - new Date(c.expectedReturnAt)) / (1000*60*60*24)
    );
    li.textContent = ${equipmentMap[c.equipmentId]} —  day(s) overdue;

    const btn = document.createElement('button');
    btn.textContent = 'Return';
    btn.onclick = () => openReturnModal(c);

    li.appendChild(btn);
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

let selectedCheckoutEq = null;
function openCheckoutModal(eq) {
  selectedCheckoutEq = eq;
  document.getElementById('checkout-equipment-name').innerText = eq.name;
  document.getElementById('checkout-modal').classList.remove('hidden');
}

document.getElementById('confirm-checkout').addEventListener('click', () => {
  const date = document.getElementById('checkout-expected-return').value;
  if (!date) return;

  const c = getCheckouts();
  c.push({
    id: crypto.randomUUID(),
    equipmentId: selectedCheckoutEq.id,
    checkedOutAt: new Date().toISOString(),
    expectedReturnAt: date,
    returnedAt: null
  });

  saveCheckouts(c);
  document.getElementById('checkout-modal').classList.add('hidden');
  selectedCheckoutEq = null;
  refresh();
});

document.getElementById('cancel-checkout').addEventListener('click', () => {
  document.getElementById('checkout-modal').classList.add('hidden');
});

let selectedReturnChk = null;
function openReturnModal(chk) {
  selectedReturnChk = chk;
  document.getElementById('return-equipment-name').innerText = 
    chk.equipmentId;
  document.getElementById('return-modal').classList.remove('hidden');
}

document.getElementById('confirm-return').addEventListener('click', () => {
  const c = getCheckouts();
  const idx = c.findIndex(x => x.id === selectedReturnChk.id);
  c[idx].returnedAt = new Date().toISOString();
  saveCheckouts(c);

  document.getElementById('return-modal').classList.add('hidden');
  selectedReturnChk = null;
  refresh();
});

document.getElementById('cancel-return').addEventListener('click', () => {
  document.getElementById('return-modal').classList.add('hidden');
});

function refresh() {
  renderEquipmentList();
  renderOverdueReturns();
}

window.addEventListener('DOMContentLoaded', refresh);
