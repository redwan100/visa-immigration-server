import { RequestHandler } from "express";
import httpStatus from "http-status";
import { VisaServices } from "./visa.service";

const createVisa: RequestHandler = async (req, res, next) => {
  try {
    const response = await VisaServices.createVisaIntoDB(req);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Visa created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVisa: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await VisaServices.deleteVisaFromDB(id);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Visa deleted successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getVisaFilter: RequestHandler = async (req, res, next) => {
  try {
    const response = await VisaServices.getVisaFiltering(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Visa retrieved successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getVisa: RequestHandler = async (req, res, next) => {
  try {
    const response = await VisaServices.getAllVisaFromDB();

    res.status(httpStatus.OK).json({
      success: true,
      message: "All Visa retrieved successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const VisaController = {
  createVisa,
  deleteVisa,
  getVisaFilter,
  getVisa,
};
