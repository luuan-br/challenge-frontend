import React from 'react';

import './styles.css';

export default function Header({ data }) {
	return (
		<h1 className='main-header'>
			Previsão do tempo para {data && data[0].name} -{' '}
			{data && data[0].state}
		</h1>
	);
}
