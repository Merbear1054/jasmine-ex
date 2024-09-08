//server tests
describe("Servers test (with setup and tear-down)", function() {
    beforeEach(function () {
      serverNameInput.value = 'Alice';
    });
  
    it('should add a new server to allServers on submitServerInfo()', function () {
      submitServerInfo();
  
      expect(Object.keys(allServers).length).toEqual(1);
      expect(allServers['server' + serverId].serverName).toEqual('Alice');
    });
  
    it('should not add a new server on submitServerInfo() with empty input', function () {
      serverNameInput.value = '';
      submitServerInfo();
  
      expect(Object.keys(allServers).length).toEqual(0);
    });
  
    it('should update #servertable on updateServerTable()', function () {
      submitServerInfo();
      updateServerTable();
  
      let curTdList = document.querySelectorAll('#serverTable tbody tr td');
  
      expect(curTdList.length).toEqual(3);
      expect(curTdList[0].innerText).toEqual('Alice');
      expect(curTdList[1].innerText).toEqual('$0.00');
      expect(curTdList[2].innerText).toEqual('X');
    });
  
    afterEach(function() {
      serverId = 0;
      serverTbody.innerHTML = '';
      allServers = {};
    });
  });

  //payment tests

  describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment1'].billAmt).toEqual('100');
      expect(allPayments['payment1'].tipAmt).toEqual('20');
      expect(allPayments['payment1'].tipPercent).toEqual(20);
    });
  
    it('should not add a new payment on submitPaymentInfo() with empty input', function () {
      billAmtInput.value = '';
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(0);
    });
  
    it('should payment update #paymentTable on appendPaymentTable()', function () {
      let curPayment = createCurPayment();
      allPayments['payment1'] = curPayment;
  
      appendPaymentTable(curPayment);
  
      let curTdList = document.querySelectorAll('#paymentTable tbody tr td');
  
      expect(curTdList.length).toEqual(4);
      expect(curTdList[0].innerText).toEqual('$100');
      expect(curTdList[1].innerText).toEqual('$20');
      expect(curTdList[2].innerText).toEqual('%20');
      expect(curTdList[3].innerText).toEqual('X');
    });
  
    it('should create a new payment on createCurPayment()', function () {
      let expectedPayment = {
        billAmt: '100',
        tipAmt: '20',
        tipPercent: 20,
      }
  
      expect(createCurPayment()).toEqual(expectedPayment);
    });
  
    it('should not create payment with empty input on createCurPayment()', function () {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      let curPayment = createCurPayment();
  
      expect(curPayment).toEqual(undefined);
    });
  
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      paymentId = 0;
      allPayments = {};
    });
  });

  //HELPERS Test
  describe("Utilities test (with setup and tear-down)", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
    });
  
    it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('tipAmt')).toEqual(20);
  
      billAmtInput.value = 200;
      tipAmtInput.value = 40;
  
      submitPaymentInfo();
  
      expect(sumPaymentTotal('tipAmt')).toEqual(60);
    });
  
    it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('billAmt')).toEqual(100);
  
      billAmtInput.value = 200;
      tipAmtInput.value = 40;
  
      submitPaymentInfo();
  
      expect(sumPaymentTotal('billAmt')).toEqual(300);
    });
  
    it('should sum total tip percent on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('tipPercent')).toEqual(20);
  
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
  
      submitPaymentInfo();
  
      expect(sumPaymentTotal('tipPercent')).toEqual(40);
    });
  
    it('should sum tip percent of a single tip on calculateTipPercent()', function () {
      expect(calculateTipPercent(100, 23)).toEqual(23);
      expect(calculateTipPercent(111, 11)).toEqual(10);
    });
  
    it('should generate new td from value and append to tr on appendTd(tr, value)', function () {
      let newTr = document.createElement('tr');
  
      appendTd(newTr, 'test');
  
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('test');
    });
  
    it('should generate delete td and append to tr on appendDeleteBtn(tr, type)', function () {
      let newTr = document.createElement('tr');
  
      appendDeleteBtn(newTr);
  
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('X');
    });
  
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      allPayments = {};
      paymentId = 0;
    });
  });