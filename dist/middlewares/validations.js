"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateMongoId = (req, res, next) => {
    const entries = Object.entries(req.params);
    const idParams = entries.reduce((prev, [key, value]) => {
        if (key.toLowerCase().includes('id')) {
            prev.push([key, mongoose.Types.ObjectId.isValid(value)]);
        }
        return prev;
    }, []);
    if (!idParams.length) {
        throw new CustomError(400, 'Missing mongo id parameter.');
    }
    const invalidId = idParams.find((param) => param[1] === false);
    if (invalidId) {
        throw new CustomError(400, `Mongo id: ${invalidId[0]}  is not valid.`);
    }
    return next();
};
