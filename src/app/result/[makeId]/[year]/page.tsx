import { Suspense } from 'react';
import VehicleModels from '@/components/vehicleModels';
import { IVehicle, ResultPageParams } from '@/app/interfaces';

async function fetchMakes() {
	const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
	const data = await res.json();

	return data.Results;
}

const availableYears: number[] = Array.from({ length: new Date().getFullYear() - 2014 },(_, i) => i + 2015);

export async function generateStaticParams() {
	const makes = await fetchMakes();

	const paths = makes.flatMap((make: IVehicle) =>
		availableYears.map((year: number) => ({
			makeId: make.MakeId.toString(),
			year: year.toString(),
		}))
	);

	return paths;
}

export default function ResultPage({ params }: ResultPageParams) {
	const { makeId, year } = params;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-bold mb-5">Vehicle Models for {year} year</h1>

			<Suspense fallback={<div>Loading vehicle models...</div>}>
				<VehicleModels makeId={makeId} year={year} />
			</Suspense>
		</div>
	);
}
