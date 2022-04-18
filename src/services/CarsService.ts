import { Car, CarSchema } from '../interfaces/CarInterface';
import { VehicleSchema } from '../interfaces/VehicleInterface';
import GenericService, { ServiceError } from './GenericService';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor() {
    super(new CarModel());
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsedVehicle = VehicleSchema.safeParse(obj);
    const parsedCar = CarSchema.safeParse(obj);

    if (!parsedVehicle.success) return { error: parsedVehicle.error };
    if (!parsedCar.success) return { error: parsedCar.error };

    return this.model.create(obj);
  };
}

export default CarService;