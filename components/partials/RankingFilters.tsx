import { useState } from 'react';

import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';

const RankingFilters = ({ filter, handleFilterCallback }) => {
	const t: typeof en | typeof pl = useLanguage() === 'en' ? en : pl;

	return (
		<div className="p-3 text-md text-center">
			<span
				onClick={() => handleFilterCallback('')}
				className={
					filter === '' ? (
						'cursor-pointer  text-blue-600 dark:text-white'
					) : (
						'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
					)
				}
			>
				{t.allspecies}
			</span>{' '}
			/{' '}
			<span
				onClick={() => handleFilterCallback('carp')}
				className={
					filter === 'carp' ? (
						'cursor-pointer  text-blue-600 dark:text-white'
					) : (
						'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
					)
				}
			>
				{t.carp}
			</span>{' '}
			/{' '}
			<span
				onClick={() => handleFilterCallback('perch')}
				className={
					filter === 'perch' ? (
						'cursor-pointer  text-blue-600 dark:text-white'
					) : (
						'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
					)
				}
			>
				{t.perch}
			</span>{' '}
			/{' '}
			<span
				onClick={() => handleFilterCallback('pike')}
				className={
					filter === 'pike' ? (
						'cursor-pointer  text-blue-600 dark:text-white'
					) : (
						'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
					)
				}
			>
				{t.pike}
			</span>{' '}
			/{' '}
			<span
				onClick={() => handleFilterCallback('catfish')}
				className={
					filter === 'catfish' ? (
						'cursor-pointer  text-blue-600 dark:text-white'
					) : (
						'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
					)
				}
			>
				{t.catfish}
			</span>
		</div>
	);
};

export default RankingFilters;
