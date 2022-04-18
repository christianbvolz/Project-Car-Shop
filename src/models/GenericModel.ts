import { Model as M, Document } from 'mongoose';

import { Model } from '../interfaces/ModelInterface';

abstract class GenericModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  public create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  public update = async (id: string, obj: T): Promise<T | null> => {
    const result = await this.model.findByIdAndUpdate(id, obj, { new: true });
    return result;
  };
  
  public delete = async (id: string): Promise<T | null> => {
    const result = await this.model.findByIdAndDelete(id);
    return result;
  };
}

export default GenericModel;