import { Urls } from '../models/urls.model';
import shortId from 'shortid';

// function for get url
export const getUrl = async (req, res) => {
  try {
      var data = await Urls.findOne({code: req.params.code});   // get url data
      if(data && data._id) {
        return res.status(200).send({data: data.originalUrl, message: "Url found"}) // return response if url found
      } else {
        return res.status(404).send({data: {}, message: "No url found"}) // return response if url not found
      }
  } catch (e) {
    return res.status(500).send({error: e, message: "Something went wrong"})// return response if error
  }
}

// function for create new url
export const createUrl = async (req, res) => {
  try {
    const request = req.body;
    const baseUrl = req.protocol + '://' + req.get('host')
    let alreadyExist = await Urls.findOne({originalUrl: request.originalUrl})  // check already exists with same url
    if(alreadyExist && alreadyExist._id) {
      return res.status(409).send({data: alreadyExist, message: "Url already exists"})  // return response if already exists
    } else {
      let urlCode = shortId.generate();
      let shortUrl = baseUrl + "/" + urlCode;
      const data = new Urls({
        originalUrl: request.originalUrl,
        shortUrl,
        code: urlCode
      }); // create object for urls
      let urlData = await data.save();  // save the data
      return res.status(201).send({data: urlData, message: "Url successfully generated"}) // return response after data creation
    }
  } catch (e) {
    return res.status(500).send({error: e, message: "Something went wrong"})
  } 
}

