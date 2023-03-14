import mongoose from "mongoose";
import { connect } from '../config'
describe('healthcheck', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    test("It should console if cmongoose connection error occured", async () => {
    mongoose.connect = jest.fn().mockRejectedValueOnce("error")
        try{
            connect();
        } catch (e){
            const consoleSpy = jest.spyOn(console, 'log');
            console.log(e);
            expect(consoleSpy).toHaveBeenCalledWith('error');
        }
    });
  });