"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Logger_1 = require("./utility/Logger");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = require("./config/inversify.config");
const app_1 = require("./app");
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
    process.env.NODE_ENV = "dev";
}
(() => __awaiter(this, void 0, void 0, function* () {
    const container = new inversify_1.Container();
    yield container.loadAsync(inversify_config_1.bindings);
    const inversifyExpressServer = new inversify_express_utils_1.InversifyExpressServer(container, null, { rootPath: "/api/v1" }, app_1.app);
    const server = inversifyExpressServer.build();
    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        Logger_1.logger.info(`Server started on port ${PORT}`);
    });
}))();
//# sourceMappingURL=server.js.map