'use client';

import { IModel, VehicleModelsParams } from '@/app/interfaces';
import { useState, useEffect } from 'react';

export default function VehicleModels({ makeId, year }: VehicleModelsParams) {
	const [models, setModels] = useState<IModel[] | []>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchModels() {
			setLoading(true);
			const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
			const data = await res.json();
			setLoading(false);
			setModels(data.Results);
		}

		if (makeId && year) {
			fetchModels();
		}
	}, [makeId, year]);

	return (
		<div className="text-xl italic ">
			{loading ? (
				<p>Loading vehicle models...</p>
			) : (
				<ul className='list-disc'>
					{models.map((model: IModel) => (
						<li key={model.Make_ID * model.Model_ID} className="mb-2">
							{model.Make_Name} {model.Model_Name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
