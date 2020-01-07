"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class ServiceAgreementsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('service_agreements');
        super.ensureIndex({ number: 1 });
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ id: { $regex: searchRegex } });
            searchCriteria.push({ number: { $regex: searchRegex } });
            searchCriteria.push({ company: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let number = filter.getAsNullableString('number');
        if (number != null)
            criteria.push({ $or: [{ number: number }, { _id: number }] });
        let company = filter.getAsNullableString('company');
        if (company != null)
            criteria.push({ company: company });
        let active = filter.getAsNullableBoolean('active', false);
        if (active != null)
            criteria.push({ active: active });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.ServiceAgreementsMongoDbPersistence = ServiceAgreementsMongoDbPersistence;
//# sourceMappingURL=ServiceAgreementsMongoDbPersistence.js.map