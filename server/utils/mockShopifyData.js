// utils/mockShopifyData.js

const createMockShopifyData = () => {
  const header = "Order ID,Date,Customer,Product,Quantity,Total\n";
  const orders = [
    "1001,2024-08-01,John Doe,T-Shirt,2,39.98",
    "1002,2024-08-02,Jane Smith,Jeans,1,59.99",
    "1003,2024-08-03,Bob Johnson,Sneakers,1,89.99",
    "1004,2024-08-04,Alice Brown,Dress,1,79.99",
    "1005,2024-08-05,Charlie Davis,Hat,3,44.97",
  ];

  return header + orders.join("\n");
};

module.exports = { createMockShopifyData };
