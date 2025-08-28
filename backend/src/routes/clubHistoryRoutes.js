import express from "express";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import {USER_ROLES_DIC} from "../constants/roles.js";
import clubHistoryController from "../controllers/clubHistoryController.js";

const router = express.Router();

router.post(
    '/',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN),
    clubHistoryController.createClubHistory)

router.get(
    '/club/:clubId',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.WAITER),
    clubHistoryController.getByClubId
)

router.delete(
    '/club/:clubId',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN),
    clubHistoryController.deleteByClubId
)

export default router;