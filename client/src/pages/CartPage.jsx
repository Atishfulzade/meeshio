import React from "react";

import Stepper from "../component/Stepper";

const CartPage = () => {
  const steps = ["Cart", "Address", "Payment", "Summary"];

  return (
    <div className="md:mt-20  md:px-24">
      <Stepper steps={steps} />;
    </div>
  );
};

export default CartPage;
