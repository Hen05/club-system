import express from 'express';
import authorizeRoles from "../middlewares/authorizeRoles.js";
import {USER_ROLES_DIC} from "../constants/roles.js";
import requestController from "../controllers/requestController.js";
const router = express.Router();

router.post(
    '/',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.WAITER),
    requestController.createRequest
)

router.get(
    '/',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN),
    requestController.getAllRequests
)

router.get(
    '/club/:clubId',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN, USER_ROLES_DIC.WAITER),
    requestController.getRequestByClubId
)

router.patch(
    '/club/:clubId/accept',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN),
    requestController.acceptRequest
)

router.patch(
    '/club/:clubId/reject',
    authorizeRoles(USER_ROLES_DIC.MANAGER, USER_ROLES_DIC.BARMAN),
    requestController.rejectRequest
)

export default router;