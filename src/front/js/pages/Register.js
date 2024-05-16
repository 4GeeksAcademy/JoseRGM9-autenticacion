import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const registerUser = () => {
		fetch(
			"https://obscure-happiness-g44jgxj669r9hv7xr-3001.app.github.dev/register",
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
				navigate('/login');
			})
			.catch(error => {
				error.then(errorMessage => {
					console.log("Error:", errorMessage);
				});
			});
	};


	return (
		<div className="container mt-5">
			<div className="tituloLogin text-center">
				<h1>Informacion Para Registrarse</h1>
			</div>
			<form
				onSubmit={(e) => {
					if (email != "" && password != "") {
						e.preventDefault();
						registerUser();
					} else (alert("Fields cannot be empty"))
				}}
			>
				<div className="container">
					<div className="container">
						<div className="my-3">
							<label className="form-label d-flex text-start">
								<i className="email" style={{ color: "#B197FC", fontSize: 24 }}></i>
								Email:
							</label>
							<input type="email"
								className="form-control"
								minLength={3}
								required={true}
								placeholder="email@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="col-auto">
							<label className="form-label d-flex text-start">
								<i className="pass" style={{ color: "#B197FC", fontSize: 24 }}></i>
								Password:
							</label>
							<input type="password"
								className="form-control"
								id="inputPassword2"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className="botonRegistrar ml-4 mt-3">
						<input type="submit" value={"Registrar"} className="btn btn-primary"></input>
					</div>

					<div className="row">
						<div className="col text-center">
							<Link to="/">
								<button className="VolverListaContactos btn btn-primary">Volver a Pagina de Inicio</button>
							</Link>
						</div>
					</div>
				</div>
			</form >
		</div>
	);
};



