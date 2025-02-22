import type { Request, Response } from 'express';
import Transfer from '../models/Transfer';

type Filters = {
   worker?: string;
   startPoint?: string;
   endPoint?: string;
};

export class TransferController {
   static createTransfer = async (req: Request, res: Response) => {
      const transfer = new Transfer(req.body);

      try {
         const savedTransfer = await transfer.save();
         res.status(201).json({
            ok: true,
            msg: 'Transfer created successfully',
         });
      } catch (error) {
         res.status(500).json({
            ok: false,
            msg: 'Error creating transfer',
         });
      }
   };

   static getAllTransfers = async (req: Request, res: Response) => {
      try {
         const transfers = await Transfer.find();

         res.status(200).json(transfers);
      } catch (error) {
         res.status(500).json({
            ok: false,
            msg: 'Error getting transfers',
         });
      }
   };

   static getTransferById = async (req: Request, res: Response) => {
      try {
         const transfer = await Transfer.findById(req.params.transferId);

         if (!transfer) {
            res.status(404).json({
               ok: false,
               msg: 'Transfer not found',
            });
            return;
         }

         res.status(200).json(transfer);
      } catch (error) {
         res.status(500).json({
            ok: false,
            msg: 'Error getting transfer',
         });
      }
   };

   static findTransfers = async (req: Request, res: Response) => {
      try {
         const { worker, startPoint, endPoint } = req.query;

         const filters: Filters = {};

         if (worker) {
            filters.worker = worker.toString();
         }

         if (startPoint) {
            filters.startPoint = startPoint.toString();
         }

         if (endPoint) {
            filters.endPoint = endPoint.toString();
         }

         const transfers = await Transfer.find(filters);

         res.status(200).json(transfers);
      } catch (error) {
         res.status(500).json({
            ok: false,
            msg: 'Error finding transfers',
         });
      }
   };

   static updateTransfer = async (req: Request, res: Response) => {
      try {
         req.transfer.startPoint = req.body.startPoint;
         req.transfer.endPoint = req.body.endPoint;
         req.transfer.transport = req.body.transport;
         req.transfer.kilometers = req.body.kilometers;
         req.transfer.date = req.body.date;
         req.transfer.worker = req.body.worker;
         req.transfer.roundTrip = req.body.roundTrip;

         await req.transfer.save();
         res.status(200).json({
            ok: true,
            msg: 'Transfer updated successfully',
         });
      } catch (error) {
         res.status(500).json({
            ok: false,
            msg: 'Error updating transfer',
         });
      }
   };

   static deleteTransfer = async (req: Request, res: Response) => {
      try {
         await req.transfer.deleteOne();

         res.status(200).json({
            ok: true,
            msg: 'Transfer deleted successfully',
         });
      } catch (error) {
         res.status(500).json({
            ok: false,
            msg: 'Error deleting transfer',
         });
      }
   };
}
