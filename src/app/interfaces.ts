export interface IVehicle {
	MakeId: number;
	MakeName: string;
	VehicleTypeId: number;
	VehicleTypeName: string;
}

export interface IModel {
	Make_ID: number;
	Make_Name: string;
	Model_ID: number;
	Model_Name: string;
}

export interface IPath {
	makeId: string;
	year: string;
}

export interface ResultPageParams {
	params: {
		makeId: string;
		year: string;
	};
}

export interface VehicleModelsParams {
	makeId: string;
	year: string;
}
