import { MainChart } from "./mainChart";

export const AdminPannel = () => (
  <div className="flex flex-col gap-4 p-4 lg:p-6">
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Panel de administrador
      </h1>
      <p className="text-muted-foreground text-sm">
        Gestiona usuarios, gerentes y roles.
      </p>
    </div>
    <MainChart />
  </div>
);
