import { model, Schema } from "mongoose";
import { TVisa } from "./visa.types";

const visaSchema = new Schema<TVisa>({
  visaNumber: {
    type: String,
    required: true,
    unique: true,
  },
  clientNumber: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const Visa = model<TVisa>("Visa", visaSchema);

export default Visa;
