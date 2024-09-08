//server section
let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');

let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);

// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';

  for (let key in allServers) {
    let curServer = allServers[key];

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));
    appendDeleteBtn(newTr, 'server');

    serverTbody.append(newTr);
  }
}

let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');

let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener('submit', submitPaymentInfo);

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let curPayment = createCurPayment();

  if (curPayment) {
    paymentId += 1;

    allPayments['payment' + paymentId] = curPayment;

    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();

    billAmtInput.value = '';
    tipAmtInput.value = '';
  }
}
//Payment section
// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  if (billAmt === '' || tipAmt === '') return;

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
  }
}
//HELPERS
// Create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
  let newTr = document.createElement('tr');
  newTr.id = 'payment' + paymentId;

  appendTd(newTr, '$' + curPayment.billAmt);
  appendTd(newTr, '$' + curPayment.tipAmt);
  appendTd(newTr, '%' + curPayment.tipPercent);

  appendDeleteBtn(newTr, 'payment');

  paymentTbody.append(newTr);
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg = sumPaymentTotal('tipPercent') / Object.keys(allPayments).length;

  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + '%';
}

// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
    let total = 0;
  
    for (let key in allPayments) {
      let payment = allPayments[key];
  
      total += Number(payment[type]);
    }
  
    return total;
  }
  
  // converts the bill and tip amount into a tip percent
  function calculateTipPercent(billAmt, tipAmt) {
    return Math.round(100 / (billAmt / tipAmt));
  }
  
  // expects a table row element, appends a newly created td element from the value
  function appendTd(tr, value) {
    let newTd = document.createElement('td');
    newTd.innerText = value;
  
    tr.append(newTd);
  }
  
  // append delete button and click handler for removing server from allServers and DOM td
  function appendDeleteBtn(tr, type) {
    let newTd = document.createElement('td');
    newTd.className = 'deleteBtn';
    newTd.innerText = 'X';
  
    newTd.addEventListener('click', removeEle);
  
    tr.append(newTd);
  }
  
  function removeEle(evt) {
    let ele = evt.target.closest('tr');
  
    delete allServers[ele.id];
  
    ele.parentNode.removeChild(ele);
    updateServerTable();
  }