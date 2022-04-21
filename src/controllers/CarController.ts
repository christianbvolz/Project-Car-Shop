import { Request, Response } from 'express';
import GenericController,
{ RequestWithBody, ResponseError } from './GenericController';
import CarService from '../services/CarsService';
import { Car } from '../interfaces/CarInterface';

class CarController extends GenericController<Car> {
  private _route: string;

  constructor() {
    super(new CarService());
    this._route = '/cars';
  }

  get route() { return this._route; }

  public create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const frame = await this.service.create(body);
      if (!frame) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in frame) {
        return res.status(400).json(frame);
      }
      return res.status(201).json(frame);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(400).json({
        error: 'Id must have 24 hexadecimal characters' });
    }
  };

  public update = async (
    req: Request<{ id: string, obj: Car }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const car = req.body;

    try {
      const updatedCar = await this.service.update(id, car);

      return updatedCar
        ? res.json(updatedCar)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(400).json({
        error: 'Id must have 24 hexadecimal characters' });
    }
  };
}

export default CarController;