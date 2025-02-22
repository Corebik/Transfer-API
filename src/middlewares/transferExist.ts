import { NextFunction, Request, Response } from 'express';
import Transfer, { ITransfer } from '../models/Transfer';

declare global {
   namespace Express {
      interface Request {
         transfer: ITransfer;
      }
   }
}

export const transferExist = async (req: Request, res: Response, next: NextFunction) => {
   const { transferId } = req.params;
   const transfer = await Transfer.findById(transferId);

   if (!transfer) {
      res.status(404).json({
         msg: 'Transfer not found',
      });
      return;
   }

   req.transfer = transfer;

   next();
};
