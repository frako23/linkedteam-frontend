import React from "react";
import "../../../styles/pricing-card.css";
import PostPayment from "./postPayment";
import pagoMovil from "../../../../public/pago-movil.jpg";
import zelle from "../../../../public/zelle.jpg";

export const PricingCard = () => {
  return (
    <div className="pricing-body">
      <div className="wrapper-pricing-card">
        <div className="table-pricing-card basic">
          <div className="head_tab fw-bold text-center">
            <h2 style={{ fontWeight: "600" }}>ZELLE</h2>
          </div>
          <img src={zelle} className="donation-card" />
          <h5 className="text-center" style={{ color: "#800080" }}>
            frako23@gmail.com
          </h5>
        </div>

        <div className="table-pricing-card premium">
          <div className="head_tab fw-bold text-center">
            <h2 style={{ fontWeight: "600" }}>Pago Móvil</h2>
          </div>
          <img src={pagoMovil} className="donation-card" />
        </div>

        <div className="table-pricing-card ultimate">
          <div className="head_tab fw-bold text-center">
            <h2 style={{ fontWeight: "600" }}>PAYPAL</h2>
          </div>
          <h5
            className="text-center"
            style={{ color: "#253b80", marginTop: "10rem" }}
          >
            frako23@gmail.com
          </h5>
        </div>
      </div>
    </div>
  );
};
