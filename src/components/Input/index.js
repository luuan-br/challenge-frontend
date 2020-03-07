import React from 'react';

// import { Container } from './styles';

export default function Input({ onChange, label, ...props }) {
	const cunstomOnChange = event => {
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<label htmlFor={label}>
			<span>{label}</span>
			<input type='text' onChange={cunstomOnChange} {...props} />
		</label>
	);
}
