"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const ServiceAgreementsServiceFactory_1 = require("../build/ServiceAgreementsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class ServiceAgreementsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("service_agreements", "Service agreements microservice");
        this._factories.add(new ServiceAgreementsServiceFactory_1.ServiceAgreementsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.ServiceAgreementsProcess = ServiceAgreementsProcess;
//# sourceMappingURL=ServiceAgreementsProcess.js.map