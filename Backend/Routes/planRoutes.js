const express = require('express');
const planRouter = express.Router();
const { getAllplansController,
    createPlanController,
    updatePlanController,
    deletePlanController,
    getPlanController
} = require('../Controller/planControllers');
 
planRouter.route("/")
    .get(getAllplansController)
    .post(createPlanController)

planRouter.route("/:planRoutes")
    .get(getPlanController)
    .patch(updatePlanController)
    .delete(deletePlanController)

// loggedin plan
module.exports = planRouter;