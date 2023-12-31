"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recorrido_controller_1 = require("../controllers/recorrido.controller");
const validate_token_1 = require("../middlewares/validate.token");
const router = (0, express_1.Router)();
router.get('/recorridos', recorrido_controller_1.getRecorridos);
router.get('/recorridos/:id', recorrido_controller_1.getRecorrido);
router.post('/recorridos', validate_token_1.validateTokenGuia, recorrido_controller_1.createRecorrido);
router.put('/recorridos/:id', validate_token_1.validateTokenGuia, recorrido_controller_1.updateRecorrido);
router.delete('/recorridos/:id', validate_token_1.validateTokenGuia, recorrido_controller_1.deleteRecorrido);
exports.default = router;
