import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ResponseStatus, IResponse } from "../utils/service";
import { User } from '../domain/entity'
