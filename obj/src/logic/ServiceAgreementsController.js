"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const ServiceAgreementsCommandSet_1 = require("./ServiceAgreementsCommandSet");
class ServiceAgreementsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(ServiceAgreementsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ServiceAgreementsCommandSet_1.ServiceAgreementsCommandSet(this);
        return this._commandSet;
    }
    getAgreements(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getAgreementById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createAgreement(correlationId, agreement, callback) {
        agreement.active = agreement.active != null ? agreement.active : true;
        agreement.create_time = new Date();
        this._persistence.create(correlationId, agreement, callback);
    }
    updateAgreement(correlationId, agreement, callback) {
        agreement.active = agreement.active != null ? agreement.active : true;
        this._persistence.update(correlationId, agreement, callback);
    }
    deleteAgreementById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.ServiceAgreementsController = ServiceAgreementsController;
ServiceAgreementsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-agreements:persistence:*:*:1.0');
//# sourceMappingURL=ServiceAgreementsController.js.map