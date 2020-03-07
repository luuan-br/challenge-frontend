import React, { useState, useEffect } from 'react';
import './App.css';

import { api } from './services/api';

import Header from './components/Header';
import Card from './components/Card';
import Input from './components/Input';

import filter from './assets/filter.png';

function App() {
	const [data, setDate] = useState([]);
	const [locale, setLocale] = useState('Osasco');
	const [dateMax, setDateMax] = useState('2017-02-07');
	const [dateMin, setDateMin] = useState('2017-02-01');
	const [params, setParams] = useState({
		name: locale,
		date_min: dateMin,
		date_max: dateMax
	});
	const [error, setError] = useState(null);

	const handleClick = e => {
		e.preventDefault();
		setParams({
			name: locale,
			date_min: dateMin,
			date_max: dateMax < dateMin ? dateMin : dateMax
		});
	};

	useEffect(() => {
		api.post('locales/search', params)
			.then(res => {
				const response = res.data;
				if (response.code) {
					setError(response);
					setDate([]);
				} else {
					setError(null);
					setDate(response);
				}
			})
			.catch(error =>
				setError({ message: 'There was an unexpected error' })
			);
	}, [params]);

	return (
		<div className='app'>
			{error && <div className='warning-erro'>{error.message} </div>}
			<form className='form' id='filter'>
				<Input
					label='Local:'
					type='text'
					value={locale}
					onChange={e => setLocale(e.target.value)}
				/>
				<Input
					label='Data minima:'
					type='date'
					name='date_min'
					value={dateMin}
					min='2017-02-01'
					max='2017-02-07'
					onChange={e => setDateMin(e.target.value)}
				/>
				<Input
					label='Data maxima:'
					type='date'
					name='date_max'
					value={dateMax < dateMin ? dateMin : dateMax}
					min='2017-02-01'
					max='2017-02-07'
					onChange={e => setDateMax(e.target.value)}
				/>
				<button onClick={handleClick}>Buscar</button>
			</form>

			{!error && <Header data={data.locale} />}

			<section className='container'>
				{data &&
					data.weathers &&
					data.weathers.map(res => <Card key={res.id} data={res} />)}
			</section>
			<a
				href='#filter'
				className='action-button'
				title='filtrar resultados'
			>
				<img src={filter} alt='filtrar resultados' />
			</a>
		</div>
	);
}

export default App;
