'use client';

import { useEffect, useState } from 'react';
import { IVehicle } from './interfaces';
import Link from 'next/link';

export default function HomePage() {
	const [vehicles, setVehicles] = useState<IVehicle[] | []>([]);
	const [selectedVehicle, setSelectedVehicle] = useState<string>('440');
	const [selectedYear, setSelectedYear] = useState<string>('2015');
	const currentYear: number = new Date().getFullYear();
	const years: number[] = Array.from({ length: currentYear - 2015 + 1 },(_, i) => 2015 + i);

	useEffect(() => {
		const getVehicles = async () => {
			const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
			const data = await res.json();

			setVehicles(data.Results);
		};

		getVehicles();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-5xl font-bold mb-8">Select a Vehicle</h1>

			<div className="flex flex-row gap-5 justify-center items-center">
				<div className="flex flex-col justify-center items-start w-1/2">
					<h2 className="text-lg font-bold">Select the model</h2>
					<select
						onChange={(e) => setSelectedVehicle(e.target.value)}
						className="w-full min-h-8 rounded-lg p-2 bg-inherit border-2 border-neutral-600 focus:border-neutral-600 active:border-neutral-500"
						value={selectedVehicle}
					>
						{vehicles.map((vehicle: IVehicle) => (
							<option
								key={vehicle.MakeId}
								value={vehicle.MakeId}
								className="bg-[#e6ece8]"
							>
								{vehicle.MakeName}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col justify-center items-start w-1/2">
					<h2 className="text-lg font-bold">Select the year</h2>
					<select
						onChange={(e) => setSelectedYear(e.target.value)}
						className="w-full min-h-8 rounded-lg p-2 bg-inherit border-2 border-neutral-600 focus:border-neutral-600 active:border-neutral-500"
						value={selectedYear}
					>
						{years.map((year: number) => (
							<option key={year} value={year} className="bg-[#e6ece8]">
								{year}
							</option>
						))}
					</select>
				</div>
			</div>

			<button disabled={!selectedVehicle || !selectedYear} className="mt-8">
				<Link
					href={`/result/${selectedVehicle}/${selectedYear}`}
					className={`rounded-lg p-2 text-white bg-stone-700 hover:bg-stone-500 cursor-pointer ${
						!selectedVehicle || !selectedYear ? 'opacity-50' : ''
					}`}
				>
					Next
				</Link>
			</button>
		</div>
	);
}
