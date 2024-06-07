import React from "react";

export const AverageSale = () => {
  return (
    <div className="d-flex my-2">
      <div className="card flex-fill border-0">
        <div className="card-body py-4">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              <h4 className="mb-2">$ 78.00</h4>
              <p className="mb-2"> Venta Promedio</p>
              <div className="mb-0">
                <span className="badge text-success me-2">+9.0%</span>
                <span className="text-muted">Since Last Month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
