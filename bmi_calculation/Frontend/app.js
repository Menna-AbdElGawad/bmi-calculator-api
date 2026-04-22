const API_BASE = 'http://localhost:8080/api/bmi';

const categoryConfig = {
  'Underweight': { badge: 'badge-under',  color: '#93c5fd', desc: 'Consider consulting a nutritionist to reach a healthy weight.' },
  'Normal weight':{ badge: 'badge-normal', color: '#86efac', desc: 'Great job! Keep maintaining your balanced diet and active lifestyle.' },
  'Overweight':  { badge: 'badge-over',   color: '#fde047', desc: 'Small lifestyle changes can make a big difference.' },
  'Obese':       { badge: 'badge-obese',  color: '#fca5a5', desc: 'Please consult a healthcare professional for personalized guidance.' },
};

// ─── State ────────────────────────────────────────────────
let currentUnit = 'metric';

// ─── DOM refs ─────────────────────────────────────────────
const tabs        = document.querySelectorAll('.nav-tab');
const pageCalc    = document.getElementById('page-calculate');
const pageHist    = document.getElementById('page-history');

const unitBtns    = document.querySelectorAll('.unit-btn');
const unitSubtitle= document.getElementById('unit-subtitle');
const heightLabel = document.getElementById('height-label');
const weightLabel = document.getElementById('weight-label');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');
const calcBtn     = document.getElementById('calc-btn');
const calcError   = document.getElementById('calc-error');
const resultCard  = document.getElementById('result-card');
const resultValue = document.getElementById('result-value');
const resultBadge = document.getElementById('result-badge');
const resultCat   = document.getElementById('result-category');
const resultDesc  = document.getElementById('result-desc');

const histError   = document.getElementById('history-error');
const histLoading = document.getElementById('history-loading');
const emptyState  = document.getElementById('empty-state');
const histList    = document.getElementById('history-list');
const histCount   = document.getElementById('history-count');

// ─── Navigation ───────────────────────────────────────────
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const page = tab.dataset.page;
    pageCalc.classList.toggle('hidden', page !== 'calculate');
    pageHist.classList.toggle('hidden', page !== 'history');

    if (page === 'history') loadHistory();
  });
});

// ─── Unit Toggle ──────────────────────────────────────────
unitBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    unitBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentUnit = btn.dataset.unit;

    heightInput.value = '';
    weightInput.value = '';
    resultCard.classList.add('hidden');
    calcError.classList.add('hidden');

    if (currentUnit === 'metric') {
      unitSubtitle.textContent = 'Enter height in meters and weight in kg';
      heightLabel.textContent  = 'Height (meters)';
      weightLabel.textContent  = 'Weight (kg)';
      heightInput.placeholder  = 'e.g. 1.75';
      weightInput.placeholder  = 'e.g. 70';
    } else {
      unitSubtitle.textContent = 'Enter height in inches and weight in lbs';
      heightLabel.textContent  = 'Height (inches)';
      weightLabel.textContent  = 'Weight (lbs)';
      heightInput.placeholder  = 'e.g. 69';
      weightInput.placeholder  = 'e.g. 154';
    }
  });
});

// ─── Calculate ────────────────────────────────────────────
calcBtn.addEventListener('click', async () => {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    showError(calcError, 'Please enter valid height and weight values.');
    return;
  }

  calcError.classList.add('hidden');
  calcBtn.disabled = true;
  calcBtn.textContent = 'Calculating...';

  try {
    const res = await fetch(`${API_BASE}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ height, weight, bmi_unit: currentUnit }),
    });

    if (!res.ok) throw new Error('Server returned an error');

    const data = await res.json();
    showResult(data);

  } catch (e) {
    showError(calcError, 'Could not connect to the server. Make sure your Spring Boot app is running on port 8080.');
  } finally {
    calcBtn.disabled = false;
    calcBtn.textContent = 'Calculate BMI';
  }
});

function showResult(data) {
  const cfg = categoryConfig[data.bmi_category] || {};
  const bmiVal = parseFloat(data.bmi_value).toFixed(1);

  resultValue.textContent = bmiVal;
  resultBadge.textContent = data.bmi_category;
  resultBadge.className   = `badge ${cfg.badge || ''}`;
  resultCat.textContent   = data.bmi_category;
  resultCat.style.color   = cfg.color || '#e8e6f0';
  resultDesc.textContent  = cfg.desc || '';

  resultCard.classList.remove('hidden');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── History ──────────────────────────────────────────────
async function loadHistory() {
  histError.classList.add('hidden');
  histList.innerHTML = '';
  emptyState.classList.add('hidden');
  histLoading.classList.remove('hidden');

  try {
    const res = await fetch(`${API_BASE}/history`);
    if (!res.ok) throw new Error();
    const records = await res.json();

    histLoading.classList.add('hidden');
    histCount.textContent = `${records.length} record${records.length !== 1 ? 's' : ''}`;

    if (records.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    }

    records.forEach((r, i) => {
      const cfg = categoryConfig[r.bmi_category] || {};
      const item = document.createElement('div');
      item.className = 'history-item';
      item.style.animationDelay = `${i * 0.05}s`;
      item.innerHTML = `
        <div class="history-bmi">${parseFloat(r.bmi_value).toFixed(1)}</div>
        <div class="history-details">
          <div class="history-category" style="color:${cfg.color || '#e8e6f0'}">${r.bmi_category}</div>
          <div class="history-measurements">Height: ${r.height} &nbsp;·&nbsp; Weight: ${r.weight}</div>
        </div>
        <span class="badge ${cfg.badge || ''}">${r.bmi_category}</span>
      `;
      histList.appendChild(item);
    });

  } catch {
    histLoading.classList.add('hidden');
    showError(histError, 'Could not load history. Make sure your Spring Boot app is running on port 8080.');
  }
}

// ─── Helpers ──────────────────────────────────────────────
function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}
