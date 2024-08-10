import { Request } from "express";
import Visa from "./visa.model";

const createVisaIntoDB = async (req: Request) => {
  const file = req?.file;

  if (file) {
    req.body.picture = file?.originalname;
  }
  const res = await Visa.create(req.body);
  return res;
};

const deleteVisaFromDB = async (id: string) => {
  const res = await Visa.findByIdAndDelete(id);
  return res;
};

const getAllVisaFromDB = async () => {
  const result = await Visa.find();

  return result;
};
const getVisaFiltering = async (payload: any) => {
  const { visaNumber, clientNumber, passportNumber, dateOfBirth, nationality } =
    payload;
  if (!visaNumber || !clientNumber || !passportNumber || !nationality) {
    throw new Error("All fields must be provided");
  }
  const result = await Visa.findOne({
    visaNumber,
    clientNumber,
    passportNumber,
    dateOfBirth,
    nationality,
  });

  return result;
};
export const VisaServices = {
  createVisaIntoDB,
  deleteVisaFromDB,
  getAllVisaFromDB,
  getVisaFiltering,
};
