"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const ServiceAgreementV1Schema_1 = require("../data/version1/ServiceAgreementV1Schema");
class ServiceAgreementsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetAgreementsCommand());
        this.addCommand(this.makeGetAgreementByIdCommand());
        this.addCommand(this.makeCreateAgreementCommand());
        this.addCommand(this.makeUpdateAgreementCommand());
        this.addCommand(this.makeDeleteAgreementByIdCommand());
    }
    makeGetAgreementsCommand() {
        return new pip_services3_commons_node_2.Command("get_agreements", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getAgreements(correlationId, filter, paging, callback);
        });
    }
    makeGetAgreementByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_agreement_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('agreement_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let agreement_id = args.getAsString("agreement_id");
            this._logic.getAgreementById(correlationId, agreement_id, callback);
        });
    }
    makeCreateAgreementCommand() {
        return new pip_services3_commons_node_2.Command("create_agreement", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('agreement', new ServiceAgreementV1Schema_1.ServiceAgreementV1Schema()), (correlationId, args, callback) => {
            let agreement = args.get("agreement");
            this._logic.createAgreement(correlationId, agreement, callback);
        });
    }
    makeUpdateAgreementCommand() {
        return new pip_services3_commons_node_2.Command("update_agreement", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('agreement', new ServiceAgreementV1Schema_1.ServiceAgreementV1Schema()), (correlationId, args, callback) => {
            let agreement = args.get("agreement");
            this._logic.updateAgreement(correlationId, agreement, callback);
        });
    }
    makeDeleteAgreementByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_agreement_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('agreement_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let agreementId = args.getAsNullableString("agreement_id");
            this._logic.deleteAgreementById(correlationId, agreementId, callback);
        });
    }
}
exports.ServiceAgreementsCommandSet = ServiceAgreementsCommandSet;
//# sourceMappingURL=ServiceAgreementsCommandSet.js.map