let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
import { IServiceAgreementsPersistence } from './IServiceAgreementsPersistence';

export class ServiceAgreementsMemoryPersistence 
    extends IdentifiableMemoryPersistence<ServiceAgreementV1, string> 
    implements IServiceAgreementsPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: ServiceAgreementV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.number, search))
            return true;
        if (this.matchString(item.company, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let number = filter.getAsNullableString('number');
        let company = filter.getAsNullableString('company');
        let active = filter.getAsNullableBoolean('active');
        
        return (item) => {
            if (id != null && item.id != id) 
                return false;
            if (number != null && item.number != number && item.id != number) 
                return false;
            if (company != null && item.company != company) 
                return false;
            if (active != null && item.active != active) 
                return false;
            if (search != null && !this.matchSearch(item, search)) 
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
