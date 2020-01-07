import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
import { IServiceAgreementsPersistence } from './IServiceAgreementsPersistence';
export declare class ServiceAgreementsMemoryPersistence extends IdentifiableMemoryPersistence<ServiceAgreementV1, string> implements IServiceAgreementsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void;
}
