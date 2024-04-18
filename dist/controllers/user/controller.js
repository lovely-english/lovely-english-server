"use strict";
// import { Request, Response } from 'express';
// const getAllUsers = async (req: Request, res: Response) => {
//   const { page, limit, query, sort } = paginateAndFilter(req.query);
//   const userAggregate = User.aggregate(getUserPipeline(query, sort));
//   const { docs, ...pagination } = await User.aggregatePaginate(userAggregate, {
//     page,
//     limit,
//   });
//   if (docs.length) {
//     return res.status(200).json({
//       message: 'Showing the list of users.',
//       data: docs,
//       pagination,
//       error: false,
//     });
//   }
//   throw new CustomError(404, 'Cannot find the list of users.');
// };
// export default {
//   getAllUsers,
// };
