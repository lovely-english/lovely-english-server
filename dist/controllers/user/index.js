"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
exports.default = router;
