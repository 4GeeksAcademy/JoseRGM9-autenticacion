import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="col-auto">
				<Link to="/Login">
					<button className="Registrarse btn btn-danger mt-5">Login</button>
				</Link>
			</div>
			<div className="col-auto">
				<Link to="/Register">
					<button className="Registrarse btn btn-danger mt-5">Registrer</button>
				</Link>
			</div>
		</div>
	);
};
