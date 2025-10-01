import React from "react";

const PricingForm = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData("pricing", { ...data.pricing, [name]: value });
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">E. Pricing & Offers</h3>
      <div className="grid grid-cols-3 gap-3">
        <input
          type="number"
          name="discount"
          placeholder="Discount Price"
          value={data.pricing.discount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="currency"
          value={data.pricing.currency}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>
        <select
          name="paymentType"
          value={data.pricing.paymentType}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Paid</option>
          <option>Free</option>
        </select>
      </div>
    </section>
  );
};

export default PricingForm;
