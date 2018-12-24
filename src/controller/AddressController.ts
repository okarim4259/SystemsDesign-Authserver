import * as express from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  response,
  request,
  requestParam,
  requestBody
} from "inversify-express-utils";
import { Repository } from "typeorm";
import { Address } from "../entity/Address";
import { TYPE } from "../config/typeBindings/types";

@controller("/address")
export class AddressController {
  private readonly _addressRepository: Repository<Address>;

  public constructor(
    @inject(TYPE.AddressRepository) addressRespository: Repository<Address>
  ) {
    this._addressRepository = addressRespository;
  }

  @httpGet("/")
  public async get(@response() res: express.Response) {
    try {
      return this._addressRepository.find();
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  }
}
