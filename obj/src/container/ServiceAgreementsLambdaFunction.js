"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const ServiceAgreementsServiceFactory_1 = require("../build/ServiceAgreementsServiceFactory");
class ServiceAgreementsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("service_agreements", "Service agreements function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-agreements', 'controller', 'default', '*', '*'));
        this._factories.add(new ServiceAgreementsServiceFactory_1.ServiceAgreementsServiceFactory());
    }
}
exports.ServiceAgreementsLambdaFunction = ServiceAgreementsLambdaFunction;
exports.handler = new ServiceAgreementsLambdaFunction().getHandler();
//# sourceMappingURL=ServiceAgreementsLambdaFunction.js.map