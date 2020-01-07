let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
import { IServiceAgreementsPersistence } from './IServiceAgreementsPersistence';

export class ServiceAgreementsMongoDbPersistence extends IdentifiableMongoDbPersistence<ServiceAgreementV1, string> implements IServiceAgreementsPersistence {

    constructor() {
        super('service_agreements');
        super.ensureIndex({ number: 1 });
        this._maxPageSize = 1000;
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

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
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
