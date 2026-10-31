import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderTree, Users } from "lucide-react";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateClient } from "../components/clients/CreateClient";
import CreateProduct from "../components/clients/CreateProduct";
import CreateProductClient from "../components/clients/CreateProductClient";
import { EditClient } from "../components/clients/EditClient";
import { ClientProducts } from "../components/clients/ClientProducts";

export const Clients = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  useEffect(() => {
    actions.setHeader("Clientes");
  }, []);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);

  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  const clientes = (store.clientes || []).filter((c) => c.status == "Cliente");

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground text-sm">
            Personas que ya cerraron contigo y los productos que tienen.
          </p>
        </div>
        <div className="flex gap-2">
          <CreateProduct />
          <CreateClient />
        </div>
      </div>

      {clientes.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>Aún no tienes clientes cargados</EmptyTitle>
            <EmptyDescription>
              Añade tu primer cliente para asignarle productos.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nacimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.name}</TableCell>
                  <TableCell>{cliente.cellphone}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {cliente.email}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {cliente.birthdate}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <CreateProductClient clientId={cliente.id} />
                      <EditClient
                        name={cliente.name}
                        email={cliente.email}
                        cellphone={cliente.cellphone}
                        birthdate={cliente.birthdate}
                        id={cliente.id}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Ver productos"
                        title="Ver productos"
                        onClick={() => {
                          setSelectedClient(cliente);
                          setShow(true);
                        }}
                      >
                        <FolderTree />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <ClientProducts
        show={show}
        onClose={() => setShow(false)}
        client={selectedClient}
      />
    </div>
  );
};
