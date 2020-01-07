"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class ServiceAgreementV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('number', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('active', pip_services3_commons_node_2.TypeCode.Boolean);
        this.withRequiredProperty('start_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withRequiredProperty('end_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withRequiredProperty('company', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('content', pip_services3_commons_node_2.TypeCode.String);
    }
}
exports.ServiceAgreementV1Schema = ServiceAgreementV1Schema;
//# sourceMappingURL=ServiceAgreementV1Schema.js.map