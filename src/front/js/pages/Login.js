import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = () => {
        fetch(
            "https://obscure-happiness-g44jgxj669r9hv7xr-3001.app.github.dev/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        )
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.json());
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            actions.settingLogIn();
            navigate("/private");
        })
        .catch(error => {
            error.then(errorMessage => {
                console.log("Error:", errorMessage);
            });
        });
    };


    return (
        <div className="Container mt-5">
            <div className="tituloLogin text-center">
                <h1>Login page</h1>
            </div>
            <form
                onSubmit={(e) => {
                    if (email != "" && password != "") {
                        e.preventDefault();
                        loginUser();
                    } else alert("Fields cannot be empty");
                }}
            >
                <div className="container">
                    <form className="row g-3">
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <label for="inputPassword2" className="visually-hidden">Password</label>
                            <input type="password"
                                className="form-control"
                                id="inputPassword2"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Iniciar Sesion</button>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col text-center">
                            <Link to="/">
                                <button className="VolverListaContactos btn btn-primary">Volver a Pagina de Inicio</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};