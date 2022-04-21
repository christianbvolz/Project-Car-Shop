import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  })
    .max(2500, { message: ' must be greater less or equal to 2500' })
    .int({ message: 'engineCapacity must be an integer' })
    .positive(),
});

type Motorcycle = z.infer<typeof VehicleSchema & typeof MotorcycleSchema>;

export { Motorcycle, MotorcycleSchema };
