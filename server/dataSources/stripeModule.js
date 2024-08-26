// stripeModule.js
const Stripe = require("stripe");

module.exports = {
  fetchData: async (user) => {
    try {
      const stripe = new Stripe(user.integrations.stripe.apiKey);

      const customers = await stripe.customers.list({ limit: 100 });
      const charges = await stripe.charges.list({ limit: 100 });

      return {
        customers: customers.data,
        charges: charges.data,
      };
    } catch (error) {
      console.error("Stripe data fetch error:", error);
      throw new Error("Failed to fetch Stripe data");
    }
  },
};
