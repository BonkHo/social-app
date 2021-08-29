// Server
import { gql, useMutation } from "@apollo/client";
// JSX & Hooks
import React, { useState } from "react";
// SUI Components
import { Button, Form } from "semantic-ui-react";

const Register = () => {
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			console.log(result);
		},
		onError(err) {
			// Statement checks to see if there is an error and if not it returns an empty object
			console.log(err.graphQLErrors[0].extensions.exception.errors);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		addUser();
	};

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Register</h1>
				<Form.Input
					label="Username"
					placeholder="Username"
					name="username"
					value={values.username}
					onChange={onChange}
					type="text"
				/>
				<Form.Input
					label="Email"
					placeholder="Email"
					name="email"
					value={values.email}
					onChange={onChange}
					type="email"
				/>
				<Form.Input
					label="Password"
					placeholder="Password"
					name="password"
					value={values.password}
					onChange={onChange}
					type="password"
				/>
				<Form.Input
					label="Confirm Password"
					placeholder="Confirm Password"
					name="confirmPassword"
					value={values.confirmPassword}
					onChange={onChange}
					type="password"
				/>
				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
