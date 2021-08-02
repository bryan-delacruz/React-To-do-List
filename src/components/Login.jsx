import React from "react";
import { auth, db } from "../firebase";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(null);

  const [esRegistro, setRegistro] = React.useState(false);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      console.log("Ingrese Email");
      setError("Ingrese Email");
      return;
    }
    if (!pass.trim()) {
      console.log("Ingrese Password");
      setError("Ingrese Password");
      return;
    }
    if (pass.length < 6) {
      console.log("Password mayor a 6 caracteres");
      setError("Password de 6 caracteres o más");
      return;
    }

    setError(null);
    console.log("Correcto ...");

    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);
      setEmail("");
      setPass("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no válido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Email no registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, pass, props.history]);

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection(res.user.uid).add({
        name: "Tarea de Ejemplo",
        fecha: Date.now(),
      });
      setEmail("");
      setPass("");
      setError(null);

      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no válido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya existe");
      }
    }
  }, [email, pass, props.history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro" : "Iniciar Sesión"}
      </h3>
      <hr />
      <div className="row justify-content-center text-center">
        <div className="col-12 col-sm8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese un password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button className="btn btn-dark btn-lg w-100 mb-2" type="submit">
              {esRegistro ? "Registrarse" : "Ingresar"}
            </button>
            {/* <button
              className="btn btn-info btn-sm w-100 mb-2"
              onClick={() => setRegistro(!esRegistro)}
              type="button"
            >
              {esRegistro ? "Ingresar a su cuenta" : "Crear cuenta"}
            </button> */}
            {!esRegistro ? (
              <button
                className="btn btn-info btn-sm w-100"
                type="button"
                onClick={() => props.history.push("/reset")}
              >
                ¿Olvidaste tu contraseña?
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
