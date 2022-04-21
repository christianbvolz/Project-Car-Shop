import { Model as M, Document } from 'mongoose';

import { Model } from '../interfaces/ModelInterface';

class GenericModel<T> implements Model<T> {
  constructor(public model: M<T & Document>) { }

  public create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  public update = async (id: string, obj: T)
  : Promise<T | null> => this.model.findByIdAndUpdate(id, obj, { new: true });
  
  public delete = async (id: string)
  : Promise<T | null> => this.model.findByIdAndDelete(id);
}

export default GenericModel;