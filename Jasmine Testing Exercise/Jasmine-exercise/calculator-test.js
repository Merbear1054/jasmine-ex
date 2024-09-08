
it('should calculate the monthly rate correctly', function () {
  // ...
  const values = {
    amount: 10000,
    years: 8,
    rate: 5.8
  };
  expect(calculateMonthlyPayment(values)).toEqual('130.44');
});

it('should calculate the monthly rate correctly', function () {
  // ...
  const values = {
    amount: 200000,
    years: 35,
    rate: 6.8
  };
  expect(calculateMonthlyPayment(values)).toEqual('1259.78');
});


it("should return a result with 2 decimal places", function() {
  // ..
  const values = {
    amount: 10043,
    years: 8,
    rate: 5.8
  };
  expect(calculateMonthlyPayment(values)).toEqual('131.00');
});


it("should return a result with 2 decimal places", function() {
  // ..
  const values = {
    amount: 15076,
    years: 10,
    rate: 5.2
  };
  expect(calculateMonthlyPayment(values)).toEqual('161.38');
});

it("should handle terribly high interest rates", function() {
    const values = {
      amount: 1000,
      years: 40,
      rate: 99
    };
    expect(calculateMonthlyPayment(values)).toEqual('82.50');
});
