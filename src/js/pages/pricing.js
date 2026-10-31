import { useContext, useEffect } from "react";
import { Context } from "@/store/appContext";
import { PricingCard } from "../components/payment/pricingCard";

export const Pricing = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.setHeader("Suscripción");
  }, []);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Suscripción a LinkedTeam
        </h1>
        <p className="text-muted-foreground mt-2">
          Elige tu método de pago para ver los datos y activar tu suscripción.
        </p>
      </div>

      <PricingCard />
    </div>
  );
};
