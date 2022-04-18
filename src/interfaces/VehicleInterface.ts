import { z } from 'zod';

const VehicleSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).min(1900, { message: 'Year must be greater than 1900' })
    .max(2022, { message: 'Year must be less than 2022' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a positive integer',
  }).int({ message: 'Buy Value must be a positive integer' })
    .nonnegative({ message: 'Buy Value must be not negative' }),
});

type Vehicle = z.infer<typeof VehicleSchema>;

export { Vehicle, VehicleSchema };