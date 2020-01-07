import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
import { IServiceAgreementsPersistence } from './IServiceAgreementsPersistence';
export declare class ServiceAgreementsMongoDbPersistence extends IdentifiableMongoDbPersistence<ServiceAgreementV1, string> implements IServiceAgreementsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void;
}
