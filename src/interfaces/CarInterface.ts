import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number({
    required_error: 'Doors quantity is required',
    invalid_type_error: 'Doors quantity must be a number',
  }).int({ message: 'Doors quantity must be a integer' })
    .min(2, { message: 'Doors quantity must be greater than or equal to 2' })
    .max(4, { message: 'Doors quantity must be less than or equal to 4' }),
  seatsQty: z.number({
    required_error: 'Seats quantity is required',
    invalid_type_error: 'Seats quantity must be a number',
  }).int({ message: 'Seats quantity must be a integer' })
    .min(2, { message: 'Seats quantity must be greater than or equal to 2' })
    .max(7, { message: 'Seats quantity must be less than or equal to 7' }),
});

type Car = z.infer<typeof VehicleSchema & typeof CarSchema>;

export { Car, CarSchema };
