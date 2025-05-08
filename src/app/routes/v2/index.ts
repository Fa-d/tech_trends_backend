import express, { Application } from "express";
import { insertIntoRssList } from '../../repositories/v2/rsslist.repo';


function userRoutesV2(app: Application) {

  app.get("/v2/categories", (req, res) => {
    
  })

  app.get("/v2/parseRss",async (req, res) =>{
    let rssRes = await insertIntoRssList()
    res.status(200).send(rssRes)
  })

}

export default userRoutesV2;