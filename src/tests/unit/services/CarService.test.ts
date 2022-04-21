import { expect } from 'chai';
import Sinon from "sinon";
import CarService from '../../../services/CarsService';

describe('CarService', () => {
  let carService = new CarService();

  const carMock = {
    _id: '1',
    model: 'xablau',
    year: 2001,
    color: 'blue',
    status: true,
    buyValue: 5000,
    doorsQty: 4,
    seatsQty: 4,
  };

  it('deve ter o atributo model', () => {
    expect(carService.model).to.be.not.null;
  });

  describe('create test', () => {
    before(() => {
      Sinon.stub(carService.model, 'create').resolves(carMock);
    });

    after(() => {
      Sinon.restore();
    })

    it('returna o documento criado no DB', async() => {
      const newCar = await carService.create({
      model: 'xablau',
      year: 2001,
      color: 'blue',
      status: true,
      buyValue: 5000,
      doorsQty: 4,
      seatsQty: 4,
      });
      
      expect(newCar).to.deep.eq(carMock);
      });
  });
})
