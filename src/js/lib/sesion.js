// Lee el JWT sin verificar la firma: solo sirve para elegir el espacio de datos
// del usuario y la pantalla de arranque. El servidor verifica cada petición.
export const leerToken = (token) => {
  try {
    if (!token) return null;
    const parte = token.trim().split(".")[1];
    if (!parte) return null;
    const base64 = parte.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    const payload = JSON.parse(json);
    const userId = Number(payload.sub);
    if (!Number.isFinite(userId)) return null;
    return { userId, exp: payload.exp };
  } catch (error) {
    return null;
  }
};

export const tokenVigente = (token, ahora = Date.now()) => {
  const datos = leerToken(token);
  return !!datos && !!datos.exp && datos.exp * 1000 > ahora;
};
