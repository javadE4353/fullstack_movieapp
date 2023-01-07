import { validationResult } from "express-validator";
import db from "../model/index.js";
import { responce } from "../util/configResponce.js";
import { paginate } from "../helper/paginate.js";
import sequelize from "sequelize";
import {Op} from "sequelize";

export const controllerCategory=new(class CategoryController{
    constructor(){}


   async insert(req,res){

   }

   async update(req,res){

   }

  async delete(req,res){

  }

  async get(req,res){
    try {
        const categorys=await db.Category.findAll({});
        const count=await db.Category.count();
        responce({
            res,
            message:"ok",
            code:200,
            data: { categorys: categorys, count: count }
        })
    } catch (error) {
        responce({
            res,
            message:"error",
            code:500,
            data:error
        })
    }
  }

}())