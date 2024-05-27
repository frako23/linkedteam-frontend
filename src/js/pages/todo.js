import React, { useContext, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Context } from "../store/appContext";
import "../../styles/todo.css";

import toast from "react-hot-toast";
import { Pricing } from "./pricing";

export function Todo() {
  const [task, setTask] = useState("");
  const { store, actions } = useContext(Context);
  const [dragOn, setDragOn] = useState(false);

  const notify = () => toast.error("No puedes crear tareas vacias");

  useEffect(() => {
    actions.setHeader("Tareas pendientes");
  }, []);

  // useEffect(() => {
  //   if (store.usuario.status === "inactive") {
  //     navigate("/pricing");
  //   }
  // }, [store.usuario.status]);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getTareas();
    }
  }, [store.token]);

  let status = "por realizar";

  const onDragEnd = (result) => {
    // console.log(result);
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    // console.log(source, destination, draggableId);
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = store.tareas.findIndex(
        (e) => e.id === Number(draggableId)
      );
      // console.log(sourceColIndex);
      const newList = [...store.tareas];
      // console.log(newList);
      newList[sourceColIndex].status = destination.droppableId;
      // console.log(newList[sourceColIndex].status, newList[sourceColIndex].id);
      actions.updateTaskStatus(newList);
      // console.log(store.tareas);
      actions.putTarea({
        status: newList[sourceColIndex].status,
        id: newList[sourceColIndex].id,
      });
    }
  };
  // let { theid } = useParams();

  return (
    <>
      {/* pagina */}
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <main
              className="clients"
              style={{
                paddingLeft: "5rem",
              }}
            >
              <div className="board">
                <form
                  id="todo-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (task === "") {
                      notify();
                    } else {
                      actions.postTareas({
                        task: task,
                        status: status,
                      });
                      setTask("");
                      // console.log("entro aqui");
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nueva tarea..."
                    value={task}
                    style={{ fontWeight: "bold" }}
                    onChange={(e) => setTask(e.target.value)}
                  />
                  <button type="submit">Agregar tarea +</button>
                </form>
                <div className="lanes">
                  <Droppable droppableId="por realizar">
                    {(droppableProvided) => (
                      <div
                        className="swim-lane"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                      >
                        <h3 className="heading">
                          POR HACER{" "}
                          <span
                            style={{ background: "black" }}
                            className="badge"
                          >
                            {
                              store.tareas.filter(
                                (tarea) => tarea.status === "por realizar"
                              ).length
                            }
                          </span>{" "}
                        </h3>
                        {store.tareas
                          .filter(
                            (tareasFiltradas) =>
                              tareasFiltradas.status === "por realizar"
                          )
                          .map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={String(task.id)}
                              index={index}
                            >
                              {(draggableProvided, snapshot) => (
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  style={{
                                    ...draggableProvided.draggableProps.style,
                                    opacity: snapshot.isDragging ? "0.5" : "1",
                                  }}
                                >
                                  <p
                                    className={`task ${
                                      dragOn == true ? "is-dragging" : ""
                                    } 
                                                    d-flex justify-content-between
                                                    `}
                                    key={index}
                                    onDragStart={() => setDragOn(true)}
                                    onDragEnd={() => setDragOn(false)}
                                    onDragOver={(e) => {
                                      e.preventDefault();
                                    }}
                                    draggable="true"
                                  >
                                    {task.task}

                                    <button
                                      className="todo-button"
                                      onClick={() =>
                                        actions.deleteTarea(task.id)
                                      }
                                    >
                                      <i className="bx bx-trash fs-5"></i>
                                    </button>
                                  </p>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {droppableProvided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <Droppable droppableId="en ejecución">
                    {(droppableProvided) => (
                      <div
                        className="swim-lane"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                      >
                        <h3 className="heading">
                          EN PROCESO{" "}
                          <span
                            style={{ background: "black" }}
                            className="badge"
                          >
                            {
                              store.tareas.filter(
                                (tarea) => tarea.status === "en ejecución"
                              ).length
                            }
                          </span>
                        </h3>
                        {store.tareas
                          .filter(
                            (tareasFiltradas) =>
                              tareasFiltradas.status === "en ejecución"
                          )
                          .map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={String(task.id)}
                              index={index}
                            >
                              {(draggableProvided, snapshot) => (
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  style={{
                                    ...draggableProvided.draggableProps.style,
                                    opacity: snapshot.isDragging ? "0.5" : "1",
                                  }}
                                >
                                  <p
                                    className={`task ${
                                      dragOn == true ? "is-dragging" : ""
                                    } 
                                                    d-flex justify-content-between
                                                    `}
                                    key={index}
                                    onDragStart={() => setDragOn(true)}
                                    onDragEnd={() => setDragOn(false)}
                                    onDragOver={(e) => {
                                      e.preventDefault();
                                    }}
                                    draggable="true"
                                  >
                                    {task.task}

                                    <button
                                      className="todo-button"
                                      onClick={() => {
                                        actions.deleteTarea(task.id);
                                      }}
                                    >
                                      <i className="bx bx-trash fs-5"></i>
                                    </button>
                                  </p>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {droppableProvided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <Droppable droppableId="realizado">
                    {(droppableProvided) => (
                      <div
                        className="swim-lane"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                      >
                        <h3 className="heading">
                          REALIZADO{" "}
                          <span
                            style={{ background: "black" }}
                            className="badge"
                          >
                            {
                              store.tareas.filter(
                                (tarea) => tarea.status === "realizado"
                              ).length
                            }
                          </span>{" "}
                        </h3>
                        {store.tareas
                          .filter(
                            (tareasFiltradas) =>
                              tareasFiltradas.status === "realizado"
                          )
                          .map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={String(task.id)}
                              index={index}
                            >
                              {(draggableProvided, snapshot) => (
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  style={{
                                    ...draggableProvided.draggableProps.style,
                                    opacity: snapshot.isDragging ? "0.5" : "1",
                                  }}
                                >
                                  <p
                                    className={`task ${
                                      dragOn == true ? "is-dragging" : ""
                                    } 
                                                    d-flex justify-content-between text-decoration-line-through
                                                    `}
                                    key={index}
                                    onDragStart={() => setDragOn(true)}
                                    onDragEnd={() => setDragOn(false)}
                                    onDragOver={(e) => {
                                      e.preventDefault();
                                    }}
                                    draggable="true"
                                  >
                                    {task.task}

                                    <button
                                      className="todo-button"
                                      onClick={() => {
                                        actions.deleteTarea(task.id);
                                      }}
                                    >
                                      <i className="bx bx-trash fs-5"></i>
                                    </button>
                                  </p>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {droppableProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </main>
          </DragDropContext>
        </div>
      )}
    </>
  );
}
