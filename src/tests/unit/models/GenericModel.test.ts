import { expect } from 'chai';
import mongoose from 'mongoose';

import Sinon from "sinon";

import GenericModel from '../../../models/GenericModel';

describe('GenericModel', () => {
  const genericSchema =  new mongoose.Schema({
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  });

  let genericModel = new GenericModel(mongoose.model('Generic', genericSchema));


  const carMock: any = {
    _id: 1,
    model: 'xablau',
    year: 2001,
    color: 'blue',
    status: true,
    buyValue: 5000,
    doorsQty: 4,
    seatsQty: 4,
  }

  describe('create test', () => {
    before(() => {
      Sinon.stub(genericModel.model, 'create').resolves(carMock);
    });

    after(() => {
      Sinon.restore();
    })

    it('returna o documento criado no DB', async() => {
      const newCar = await genericModel.create({
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

  describe('read test', () => {
    before(() => {
      Sinon.stub(genericModel.model, 'find').resolves([carMock]);
    });

    after(() => {
      Sinon.restore();
    })

    it('returna todos os documentos da coleção do DB', async() => {
      const cars = await genericModel.read();
      
      expect(cars).to.deep.eq([carMock]);
      });
  });

  // describe('readOne test', () => {
  //   before(() => {
  //     Sinon.stub(genericModel.model, 'findByIdAndUpdate').resolves(carMock);
  //   });

  //   after(() => {
  //     Sinon.restore();
  //   })

  //   it('returna um documento especifico da coleção do DB', async() => {
  //     const car = await genericModel.readOne('1');
      
  //     expect(car).to.deep.eq(carMock);
  //     });
  // });

  // describe('Update test', () => {
  //   before(() => {
  //     Sinon.stub(genericModel.model, 'update').resolves(carMock);
  //   });

  //   after(() => {
  //     Sinon.restore();
  //   })

  //   it('returna o documento atualizado da coleção do DB', async() => {
  //     const carUpdated = await genericModel.update('1', {
  //       model: 'xablau',
  //       year: 2001,
  //       color: 'blue',
  //       status: true,
  //       buyValue: 5000,
  //       doorsQty: 4,
  //       seatsQty: 4,
  //       });
      
  //     expect(carUpdated).to.deep.eq(carMock);
  //     });
  // });

  describe('delete test', () => {
    before(() => {
      Sinon.stub(genericModel.model, 'findByIdAndDelete').resolves(null);
    });

    after(() => {
      Sinon.restore();
    })

    it('deleta o documento da coleção do DB', async() => {
      const car = await genericModel.delete('1');

      expect(car).to.deep.eq(null);
      });
  });
});
