import toast from "react-hot-toast";

/* eslint-disable no-undef */
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      notification: undefined,
      usuario: [],
      favoritos: [],
      clientes: [],
      tareas: [],
      comentarios: [],
      respuestas: [],
      clientActivity: [],
      company: [],
      agencies: [],
      courses: [],
      totalUsuarios: [],
      usersByManager: [],
      userClients: [],
      managerClientActivity: [],
      notClosedArray: null,
      amountSumNotClosed: null,
      closedArray: null,
      amountSumClosed: null,
      payments: [],
      own_agencies: [],
      amountFilter: null,
      ageFilter: null,
      trustFilter: null,
      header: "",
      notnav: false,
      productos: [],
      clienteProductos: [],
      loader: false,
    },
    actions: {
      // Use getActions to call a function within a fuction
      login: async (email, password) => {
        const actions = getActions();
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/token`, opts);
          if (resp.status !== 200) {
            const mensaje = await resp.json();
            toast.error(mensaje.msg);
            return false;
          }
          const data = await resp.json();
          // console.log("Esto vino del backend", data);
          localStorage.setItem("token", data.access_token);

          console.log(data);
          setStore({ token: data.access_token });
          actions.getUsuario();
          return true;
        } catch (error) {
          toast.error("Hubo un error al hacer login in");
        }
      },

      syncTokenFromSessionStore: () => {
        const actions = getActions();
        const token = localStorage.getItem("token");
        // console.log(
        //   "La aplicacion acaba de cargar, sincronizando el token de session storage"
        // );
        if (token && token != "" && token != undefined) {
          setStore({ token: token });
        } else {
          actions.logout();
        }
      },

      signup: async (name, lastname, email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
          }),
        };

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            toast.error(danger);
            return false;
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("There has been an error login in from the backend");
        }
      },

      getUsuario: () => {
        const token = localStorage.getItem("token");
        const opts = {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/user`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => {
            localStorage.setItem("usuario.created_at", body.created_at);
            localStorage.setItem("usuario.id", body.id);
            localStorage.setItem("usuario.name", body.name);
            localStorage.setItem("usuario.lastname", body.lastname);
            localStorage.setItem("usuario.role", body.role);
            setStore({ usuario: body });
            toast.success(`Bienvenid@ a LinkedTeam ${body.name}`);
          })
          .catch((error) => toast.error(error.message));
      },

      putUserCompany: async (company, id) => {
        const store = getStore();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({ company: company }),
        };
        // console.log(company);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user_company/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          toast.error(error.message);
        }
      },

      putUserSalesGoal: async (salesGoal, id) => {
        const store = getStore();

        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({ sales_goal: salesGoal }),
        };
        // console.log(salesGoal);
        // console.log(id);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user_sales_goal/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          // console.log("This came from the backend", data);
          toast.success(
            `Tu meta de ventas es: $ ${salesGoal} vamos por ella!`,
            {
              // Custom Icon
              icon: "💪",
            }
          );
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al colocar la meta de ventas del usuario",
            error
          );
        }
      },

      getTotalUsuarios: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/users`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ totalUsuarios: body }))
          .catch((error) => console.log(error));
      },

      // getAgenciesId: () => {
      //   const store = getStore();
      //   const opts = {
      //     headers: {
      //       Authorization: `Bearer ${store.token} `,
      //     },
      //   };
      //   const apiURL = `${process.env.BACKEND_URL}/own_agencies/`;

      //   fetch(apiURL, opts)
      //     .then((response) => {
      //       if (response.ok) {
      //         return response.json();
      //       }
      //       throw new Error("Ha ocurrido un error");
      //     })
      //     .then((body) => setStore({ own_agencies: body }))
      //     .catch((error) => console.log(error));
      // },

      getUsersByManager: (manager_id) => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/users_by_manager/${manager_id}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ usersByManager: body }))
          .catch((error) => console.log(error));
      },

      getUserClients: (id) => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/user_clients/${id}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ userClients: body }))
          .catch((error) => console.log(error));
      },

      // selectAgency: async (agency) => {
      //   const store = getStore();
      //   const actions = getActions();
      //   const options = {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${store.token}`,
      //     },
      //     body: JSON.stringify(agency),
      //   };
      //   // console.log(agency);
      //   try {
      //     const response = await fetch(
      //       `${process.env.BACKEND_URL}/user/agency_ybt/${agency}`,
      //       options
      //     );

      //     if (!response.ok) {
      //       let danger = await response.json();
      //       throw new Error(danger);
      //     }

      //     const data = await response.json();
      //     // actions.getUsuario();
      //     // console.log("This came from the backend", data);
      //     return true;
      //   } catch (error) {
      //     console.error(
      //       "Ha habido un error al cambiar es estatus del cliente desde el backend",
      //       error
      //     );
      //   }
      // },

      selectRole: async (userRole) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(userRole),
        };
        // console.log(userRole.role);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user_role/${userRole.userId}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();

          // console.log("This came from the backend", data);
          toast.success("Cambiaste el rol del usuario a gerente!!! 🙌");
          actions.getTotalUsuarios();
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al cambiar el rol del usuario desde el backend",
            error
          );
        }
      },

      resetAgency: async ({ agency, agency_id, user_id }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            agency: agency,
            agency_id: agency_id,
          }),
        };
        // console.log(agency, agency_id);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/agency/${user_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();

          // console.log("This came from the backend", data);
          actions.setNotification("Reseteaste la agencia del usuario");
          actions.getTotalUsuarios();
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al cambiar el rol del usuario desde el backend",
            error
          );
        }
      },

      activateUser: async ({ status, user_id }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        };
        // console.log(status);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user_status/${user_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();

          // console.log("This came from the backend", data);
          actions.setNotification(
            `Cambiaste el estatus del usuario a ${status}`
          );
          actions.getTotalUsuarios();
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al cambiar el status del usuario desde el backend",
            error
          );
        }
      },

      postClientes: async (datosCliente) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(datosCliente),
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/clientes`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientes();
          toast.success("Tu prospecto fue registrado correctamente");
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          toast.error(error.message);
          console.error("Ha habido un error al registrar al cliente", error);
        }
      },

      putClientes: async (datosCliente, id) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(datosCliente),
        };
        // console.log(datosCliente);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/modify_cliente/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientes();
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al modificar la data del cliente",
            error
          );
          toast.error(error.message);
        }
      },

      getClientes: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/clientes`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ clientes: body }))
          .catch((error) => toast.error(error.message));
      },

      putCliente: async ({ status, cliente_id }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        };
        // console.log(status);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/cliente/${cliente_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientes();
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al cambiar es estatus del cliente desde el backend",
            error
          );
        }
      },

      deleteCliente: async (id) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/cliente/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientes();
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al cambiar es estatus del cliente desde el backend",
            error
          );
        }
      },

      updateClientStatus: (newList) => {
        setStore({ clientes: newList });
      },

      calcularEdad: (fecha) => {
        let hoy = new Date();
        let fechaDeNacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - fechaDeNacimiento.getFullYear();
        let m = hoy.getMonth() - fechaDeNacimiento.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < fechaDeNacimiento.getDate())) {
          edad--;
        }

        return edad;
      },

      calcularDiasDeUso: (fecha) => {
        let date = new Date(fecha);
        let hoy = new Date();
        let deMilisegundosADias =
          (hoy.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        let dias = 60 - Math.round(deMilisegundosADias);
        return dias;
      },

      calcularUso: (fecha) => {
        let date = new Date(fecha);
        let hoy = new Date();
        let deMilisegundosADias =
          (hoy.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        let dias = Math.round(deMilisegundosADias);
        return dias;
      },

      logout: () => {
        const store = getStore();
        localStorage.removeItem("token");
        // console.log("Se han borrado todos los tokens", store.token);
        setStore({ token: null });
      },

      setNotification: (mensaje) => {
        // console.log(mensaje);
        toast.success(mensaje);
        setStore({ notification: mensaje });
        setTimeout(() => {
          setStore({ notification: undefined });
        }, 10000);
      },

      setClientes: (nombre) => {
        setStore({ notification: mensaje });
        setTimeout(() => {
          setStore({ notification: undefined });
        }, 10000);
      },
      // obtener y agregar tareas
      postTareas: async ({ task, status }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            task: task,
            status: status,
          }),
        };
        // console.log(task, status);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/tareas`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getTareas();
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al registrar la tarea, problemas con el backend",
            error
          );
        }
      },

      getTareas: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/tareas`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ tareas: body }))
          .catch((error) => console.log(error));
      },

      updateTaskStatus: (newList) => {
        setStore({ tareas: newList });
      },

      putTarea: async ({ status, id }) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        };
        // console.log(status);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/tareas/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getTareas();
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al cambiar es estatus del cliente desde el backend",
            error
          );
        }
      },

      deleteTarea: async (id) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/tareas/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getTareas();
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al cambiar es estatus del cliente desde el backend",
            error
          );
        }
      },

      // obtener y agregar respuestas a comentarios
      postRespuestas: async (content, comment_id) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({ content: content }),
        };
        // console.log(content, comment_id);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/responses/${comment_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getRespuestas(comment_id);
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al registrar la respuesta, problemas con el backend",
            error
          );
        }
      },

      getRespuestas: (id) => {
        // console.log(id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/responses/${id}`;
        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => {
            setStore({ respuestas: body });
            // console.log(body);
          })
          .catch((error) => console.log(error));
      },

      // obtener y agregar comentarios
      postComentarios: async (data, video_id) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(data),
        };
        // console.log(data);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/comments/${video_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getComentarios(video_id);
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al registrar el comentario, problemas con el backend",
            error
          );
        }
      },

      getComentarios: (id) => {
        // console.log(id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/comments/${id}`;
        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ comentarios: body }))
          .catch((error) => console.log(error));
      },

      // obtener y agregar registros de actividad a clientes
      postClientActivity: async (activity, client_id) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(activity),
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/client_activity/${client_id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getClientActivity(client_id);
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al registrar la actividad del cliente, problemas con el backend",
            error
          );
        }
      },

      getClientActivity: () => {
        // console.log(client_id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/client_activity`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ clientActivity: body }))
          .catch((error) => console.log(error));
      },

      // obtener la actividad de cliente para manager
      getManagerClientActivity: (user_id, client_id) => {
        // console.log(client_id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/manager_client_activity/${user_id}/${client_id}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ managerClientActivity: body }))
          .catch((error) => console.log(error));
      },

      // crear compañía
      postCompany: async (company) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(company),
        };
        // console.log(company);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/company`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          // console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar la compañía", error);
        }
      },

      // obtener compañías
      getCompany: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/company`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ company: body }))
          .catch((error) => console.log(error));
      },

      // crear Agencias
      postAgencies: async (agency) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(agency),
        };
        // console.log(agency);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/agencies/${agency.companyId}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar la empresa", error);
        }
      },

      // obtener Agencias
      getAgencies: (id) => {
        // console.log(id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/agencies/${id}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ agencies: body }))
          .catch((error) => console.log(error));
        // actions.getAgencies(id)
      },

      // crear Courses
      postCourses: async (courses, id) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(courses),
        };
        // console.log(courses, id);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/courses/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          actions.getCourses(id);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar el curso", error);
        }
      },

      // obtener Cursos
      getCourses: (id) => {
        console.log(id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/courses/${id}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ courses: body }))
          .catch((error) => console.log(error));
        // actions.getAgencies(id);
      },

      // registro de meta de ventas

      notClosedArray: () => {
        const store = getStore();
        store.clientes.filter((index) => index.status != "Cerrado");
        setStore({ notClosedArray: notClosedArray });
      },

      amountSumNotClosed: () => {
        const store = getStore();
        store.notClosedArray.reduce(
          (acum, index) => acum + parseInt(index.amount),
          0
        );
        setStore({ amountSumNotClosed: amountSumNotClosed });
      },

      closedArray: () => {
        const store = getStore();
        let closedArray = store.clientes.filter(
          (index) => index.status == "Cerrado"
        );
        setStore({ closedArray: closedArray });
      },

      amountSumClosed: () => {
        const store = getStore();
        let amountSumClosed = store.closedArray.reduce(
          (acum, index) => acum + parseInt(index.amount),
          0
        );
        setStore({ amountSumClosed: amountSumClosed });
      },

      // obtener Pagos
      getPayments: (id) => {
        // console.log(id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/get_payments/${id}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ payments: body }))
          .catch((error) => console.log(error));
      },

      // Cargar Pago
      postPayment: async (payment) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(payment),
        };
        // console.log(payment);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/payments`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar el pago", error);
        }
      },

      // aprobar Pago
      approvePayment: async (company, id) => {
        const store = getStore();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({ company: company }),
        };
        // console.log(company);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/approvepayments/${id}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al colocar la propiedad company del usuario",
            error
          );
        }
      },
      filterByAmount: (firstAmount, lastAmount) => {
        const store = getStore();

        let firstFilteredClients = store.clientes.filter(
          (cliente) => parseInt(cliente.amount) >= firstAmount
        );

        let lastFilteredClients = firstFilteredClients.filter(
          (cliente) => parseInt(cliente.amount) <= lastAmount
        );

        setStore({ clientes: lastFilteredClients });
      },
      filterByAge: (firstAge, lastAge) => {
        const store = getStore();
        const actions = getActions();

        let firstFilteredClients = store.clientes.filter(
          (cliente) => actions.calcularEdad(cliente.birthdate) >= firstAge
        );

        let lastFilteredClients = firstFilteredClients.filter(
          (cliente) => actions.calcularEdad(cliente.birthdate) <= lastAge
        );

        setStore({ clientes: lastFilteredClients });
      },
      filterByTrust: (trust) => {
        const store = getStore();

        let filterByTrust = store.clientes.filter(
          (cliente) => cliente.trust === trust
        );

        setStore({ clientes: filterByTrust });
      },
      findByName: (name) => {
        const store = getStore();

        // console.log(name);
        let foundClient = store.clientes.filter((cliente) =>
          cliente.name.toLowerCase().includes(name.toLowerCase())
        );

        // console.log(foundClient);
        setStore({ clientes: foundClient });
      },
      /* agregamos las funciones para el caso de los asociados */
      filterByAmountAsociados: (firstAmount, lastAmount) => {
        const store = getStore();

        let firstFilteredClients = store.userClients.filter(
          (cliente) => parseInt(cliente.amount) >= firstAmount
        );

        let lastFilteredClients = firstFilteredClients.filter(
          (cliente) => parseInt(cliente.amount) <= lastAmount
        );

        setStore({ userClients: lastFilteredClients });
      },
      filterByAgeAsociados: (firstAge, lastAge) => {
        const store = getStore();
        const actions = getActions();

        let firstFilteredClients = store.userClients.filter(
          (cliente) => actions.calcularEdad(cliente.birthdate) >= firstAge
        );

        let lastFilteredClients = firstFilteredClients.filter(
          (cliente) => actions.calcularEdad(cliente.birthdate) <= lastAge
        );

        setStore({ userClients: lastFilteredClients });
      },
      filterByTrustAsociados: (trust) => {
        const store = getStore();

        let filterByTrust = store.userClients.filter(
          (cliente) => cliente.trust === trust
        );

        setStore({ userClients: filterByTrust });
      },
      findByNameAsociados: (name) => {
        const store = getStore();

        // console.log(name);
        let foundClient = store.userClients.filter((cliente) =>
          cliente.name.toLowerCase().includes(name.toLowerCase())
        );
        // console.log(foundClient);
        setStore({ userClients: foundClient });
      },
      setHeader: (name) => {
        // console.log(name);
        setStore({ header: name });
      },
      setNotNav: (param) => {
        setStore({ notnav: param });
      },
      setLoader: (param) => {
        setStore({ loader: param });
      },

      /* ----------------------------- CREAR PRODUCTOS ---------------------------- */
      postProducts: async (producto) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(producto),
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/products`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          actions.getProducts();
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar el curso", error);
        }
      },

      /* ----------------------------- LEER PRODUCTOS ----------------------------- */
      getProducts: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/products`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ productos: body }))
          .catch((error) => console.log(error));
        // actions.getAgencies(id);
      },

      /* --------------------- CREAR PRODUCTOS DE LOS CLIENTES -------------------- */
      postClienteProductos: async (clienteProducto, clienteId, productId) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(clienteProducto),
        };
        // console.log(courses, id);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/client_products/${clienteId}/${productId}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          actions.getClienteProductos(id);
          return true;
        } catch (error) {
          console.error("Ha habido un error al registrar el curso", error);
        }
      },

      /* --------------------- LEER PRODUCTOS DE LOS CLIENTES --------------------- */
      getClienteProductos: (clienteId, productId) => {
        // console.log(id);
        const store = getStore();
        const opts = {
          headers: {
            Authorization: `Bearer ${store.token} `,
          },
        };
        const apiURL = `${process.env.BACKEND_URL}/client_products/${clienteId}/${productId}`;

        fetch(apiURL, opts)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ clienteProductos: body }))
          .catch((error) => console.log(error));
      },

      /* ----------------------- Asignar gerente al usuario ----------------------- */
      putManager: async (manager) => {
        const store = getStore();
        const actions = getActions();
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            manager: manager.name,
            manager_id: manager.id,
          }),
        };
        // console.log(agency);
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/management_assignment/${manager.userId}`,
            options
          );

          if (!response.ok) {
            let danger = await response.json();
            throw new Error(danger);
          }

          const data = await response.json();
          actions.getTotalUsuarios();
          console.log("This came from the backend", data);
          toast.success("se ha cambiado el manager correctamente");
          return true;
        } catch (error) {
          console.error(
            "Ha habido un error al asigar gerente al usuario",
            error
          );
          toast.error(error.message);
        }
      },
    },
  };
};

export default getState;
