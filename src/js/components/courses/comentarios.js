import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/comments.css";
import { useParams } from "react-router-dom";

export const Comentarios = () => {
  const [comentario, setComentario] = useState("");
  const [responder, setResponder] = useState(false);
  const [responderSelected, setResponderSelected] = useState(null);
  const [commentSelected, setCommentSelected] = useState(null);
  const [respuestas, setRespuestas] = useState({}); // Estado de las respuestas como objeto
  const { store, actions } = useContext(Context);
  const { theid } = useParams();
  // console.log(theid);

  const handleRespuestaChange = (event) => {
    setRespuestas({ [event.target.id]: event.target.value });
  };

  const getRespuestas = (id) => {
    if (commentSelected == id) {
      setCommentSelected(null);
    } else {
      setCommentSelected(id);
    }
    actions.getRespuestas(id);
  };

  useEffect(() => {
    // console.log(theid);
    actions.getComentarios(theid);
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.postComentarios(
            {
              content: comentario,
            },
            theid
          );
          setComentario("");
          // console.log("entro aqui", comentario);
        }}
      >
        <div className="container-comentarios">
          {/* <h4 className="comment-header">
            Escribe aquí cualquier duda o comentario
          </h4> */}
          <div className="new-comentario">
            <input
              className="input-comentario"
              placeholder="Escribe aquí cualquier duda o comentario"
              onChange={(e) => setComentario(e.target.value)}
              value={comentario}
              type="text"
            ></input>
            <div className="form-group">
              <button type="submit" id="post" className="btn btn-warning">
                Publicar
              </button>
            </div>
          </div>
        </div>
      </form>

      {store.comentarios.map((comentario) => {
        return (
          <div className="comentario-publicado" key={comentario.id}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="comentario-content mb-3 mt-3">
                <div className="comentario">
                  <h3 className="usuario">
                    <strong>
                      {comentario.name + " " + comentario.lastname}
                    </strong>
                  </h3>
                  <p>{comentario.content}</p>
                  <div className="comment-action">
                    <span
                      onClick={() => {
                        if (comentario.id !== commentSelected) {
                          setResponder(true);
                        } else {
                          setResponder(false);
                        }
                        setResponderSelected(comentario.id);
                      }}
                    >
                      Responder
                    </span>
                    {store.respuestas !== "" ? (
                      <span onClick={() => getRespuestas(comentario.id)}>
                        {commentSelected !== comentario.id
                          ? "Ver respuestas"
                          : "Ocultar respuestas"}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {responder && comentario.id === responderSelected && (
                  <div className="input-group mb-3 mt-3">
                    <input
                      type="text"
                      id={comentario.id}
                      className="form-control respuesta"
                      placeholder="Responde este comentario"
                      aria-label={comentario.id}
                      aria-describedby={comentario.id}
                      onChange={(event) => handleRespuestaChange(event)}
                      value={respuestas[comentario.id] || ""}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => {
                          actions.postRespuestas(
                            respuestas[comentario.id],
                            comentario.id
                          );
                          setRespuestas({});
                        }}
                      >
                        <i className="fa-solid fa-reply"></i> Responder
                      </button>
                    </div>
                  </div>
                )}

                {store.respuestas.map((resp) => {
                  if (
                    resp.comment_id === comentario.id &&
                    commentSelected === comentario.id
                  ) {
                    return (
                      <div className="response-content" key={resp.id}>
                        <div className="comentario-resp">
                          <span className="thread-left thread-bottom"></span>
                          <div>
                            <p>
                              <strong>{resp.name + " " + resp.lastname}</strong>
                            </p>
                            <p>{resp.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
