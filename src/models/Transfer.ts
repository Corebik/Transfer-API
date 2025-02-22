import mongoose, { Document, Schema } from 'mongoose';
// Types
import { TransportType, transportTypes } from '../types';

export interface ITransfer extends Document {
   startPoint: string;
   endPoint: string;
   transport: TransportType;
   kilometers: number;
   date: Date;
   worker: string;
   roundTrip: boolean;
}

export const TransferSchema: Schema = new Schema(
   {
      startPoint: {
         type: String,
         required: true,
         trim: true,
      },
      endPoint: {
         type: String,
         required: true,
         trim: true,
      },
      transport: {
         type: String,
         enum: Object.values(transportTypes),
         required: true,
         trim: true,
      },
      kilometers: {
         type: Number,
         required: true,
      },
      date: {
         type: Date,
         required: true,
      },
      worker: {
         type: String,
         required: true,
      },
      roundTrip: {
         type: Boolean,
         required: true,
      },
   },
   { versionKey: false },
);

const Transfer = mongoose.model<ITransfer>('Transfer', TransferSchema);

export default Transfer;
