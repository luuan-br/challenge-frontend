import React, { useState, useEffect } from 'react';
import './App.css';

import { api } from './services/api';

import Header from './components/Header';
import Card from './components/Card';

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
			.then(res => setDate(res.data))
			.catch(res => console.log(`${res}`));
	}, [params]);

	return (
		<div className='app'>
			<form className='form'>
				<label htmlFor='locale'>
					<span>Local:</span>
					<input
						type='text'
						name='name'
						value={locale}
						onChange={e => setLocale(e.target.value)}
					/>
				</label>
				<label htmlFor='date_min'>
					<span>Data minima:</span>
					<input
						type='date'
						name='date_min'
						value={dateMin}
						min='2017-02-01'
						max='2017-02-07'
						onChange={e => setDateMin(e.target.value)}
					/>
				</label>
				<label htmlFor='date_max'>
					<span>Data maxima:</span>
					<input
						type='date'
						name='date_max'
						value={dateMax < dateMin ? dateMin : dateMax}
						min='2017-02-01'
						max='2017-02-07'
						onChange={e => setDateMax(e.target.value)}
					/>
				</label>
				<button onClick={handleClick}>Buscar</button>
			</form>

			<Header data={data.locale} />
			<section className='container'>
				{data &&
					data.weathers &&
					data.weathers &&
					data.weathers.map(res => <Card key={res.id} data={res} />)}
			</section>
		</div>
	);
}

export default App;
