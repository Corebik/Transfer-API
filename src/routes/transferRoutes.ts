import { Router } from 'express';
import { check, param } from 'express-validator';
//Controllers
import { TransferController } from '../controllers/TransferController';
//Middlewares
import { handleInputErrors, transferExist } from '../middlewares';

const router = Router();

// router.use(authenticate);

router.post(
   '/',
   [
      check('startPoint', 'startPoint is required').not().isEmpty(),
      check('endPoint', 'endPoint is required').not().isEmpty(),
      check('transport', 'transport is required').not().isEmpty(),
      check('kilometers', 'must be a positive number').custom(
         (value) => typeof value === 'number' && value > 0,
      ),
      check('date', 'This is not a valid date').isDate({
         format: 'YYYY-MM-DD',
      }),
      check('worker', 'worker is required').not().isEmpty(),
      check('roundTrip', 'roundTrip is required').custom((value) => typeof value === 'boolean'),
      handleInputErrors,
   ],
   TransferController.createTransfer,
);

router.get('/', TransferController.getAllTransfers);

router.get(
   '/:transferId',
   [param('transferId', 'Invalid ID').isMongoId(), handleInputErrors],
   TransferController.getTransferById,
);

router.get('/find/filters', TransferController.findTransfers);

router.use('/:transferId', transferExist);

router.put(
   '/:transferId',
   [
      param('transferId', 'Invalid ID').isMongoId(),
      check('startPoint', 'startPoint is required').not().isEmpty(),
      check('endPoint', 'endPoint is required').not().isEmpty(),
      check('transport', 'transport is required').not().isEmpty(),
      check('kilometers', 'must be a positive number').custom(
         (value) => typeof value === 'number' && value > 0,
      ),
      check('date', 'This is not a valid date').isDate({
         format: 'YYYY-MM-DD',
      }),
      check('worker', 'worker is required').not().isEmpty(),
      check('roundTrip', 'roundTrip is required').custom((value) => typeof value === 'boolean'),
      handleInputErrors,
   ],
   TransferController.updateTransfer,
);

router.delete(
   '/:transferId',
   [param('transferId', 'Invalid ID').isMongoId(), handleInputErrors],
   TransferController.deleteTransfer,
);

export default router;
