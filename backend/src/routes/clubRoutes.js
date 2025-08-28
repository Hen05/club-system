import express from "express";
import clubController from "../controllers/clubController.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import {USER_ROLES_DIC} from "../constants/roles.js";

const router = express.Router();

router.post(
    '/',
    authorizeRoles(USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.MANAGER),
    clubController.createClub);

router.get(
    '/',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.WAITER),
    clubController.getAllClubs);

router.get(
    '/distilled',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.WAITER),
    clubController.getAllDistilled
)

router.get(
    '/name',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.WAITER),
    clubController.getAllNames
)

router.get(
    '/:id',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.WAITER),
    clubController.getClub);

router.put(
    '/:id',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN),
    clubController.updateClub);

router.delete(
    '/:id',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN),
    clubController.deleteClub);

export default router;