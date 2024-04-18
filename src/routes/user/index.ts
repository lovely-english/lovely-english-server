import express from 'express';

import globalValidations from 'src/middlewares/validations';

const router = express.Router();

// router.get('/test', )
// router.get('/', firebaseValidations.superAdmin, controllers.getAllUsers);
// router.post('/manual', validations.userManualValidation, controllers.createManual);
// router.put(
//   '/:id',
//   firebaseValidations.superAdmin,
//   globalValidations.validateMongoId,
//   validations.userValidation,
//   controllers.update,
// );
// router.patch(
//   '/:id',
//   firebaseValidations.superAdmin,
//   globalValidations.validateMongoId,
//   controllers.deleteById,
// );
// router.delete(
//   '/:id',
//   firebaseValidations.superAdmin,
//   globalValidations.validateMongoId,
//   controllers.physicalDeleteById,
// );

export default router;
