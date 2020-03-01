import React from 'react';

import temperature from '../../assets/img2.png';
import rain from '../../assets/img4.png';
import precipitation from '../../assets/img3.png';
import calendar from '../../assets/calendar.png';

import './styles.css';

const Card = ({ data }) => {
	return (
		<article className='card'>
			<header className='header'>
				<h2 className='align-center'>
					<img src={calendar} alt='Calendario' />
					<span>
						{data.date
							.split('-')
							.reverse()
							.join('/')}
					</span>
				</h2>
				<p>{data.text}</p>
			</header>
			<section className='content'>
				<div className='align-center'>
					<img
						src={temperature}
						alt='temeperatura maxima'
						title='temeperatura maxima'
					/>
					<p>max - {data.temperature_max} C</p>
				</div>

				<div className='align-center'>
					<img
						src={temperature}
						alt='temeperatura minima'
						title='temeperatura minima'
					/>
					<p>min - {data.temperature_min} C</p>
				</div>

				<div className='align-center'>
					<img
						src={rain}
						alt='probabilidade de chuva'
						title='probabilidade de chuva'
					/>
					<p>{data.rain_probability}%</p>
				</div>

				<div className='align-center'>
					<img
						src={precipitation}
						alt='precipitação de chuva'
						title='precipitação de chuva'
					/>
					<p>{data.rain_precipitation}mm</p>
				</div>
			</section>
		</article>
	);
};

export default React.memo(Card);
