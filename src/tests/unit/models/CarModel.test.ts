import { expect } from 'chai';
import CarModel from '../../../models/CarModel';

describe('CarModel', () => {
  let carModel = new CarModel();
  it('deve ter o atributo model', () => {
    expect(carModel.model).to.be.not.null;
  });
})