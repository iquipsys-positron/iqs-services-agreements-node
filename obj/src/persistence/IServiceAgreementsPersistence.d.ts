import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
export interface IServiceAgreementsPersistence extends IGetter<ServiceAgreementV1, string>, IWriter<ServiceAgreementV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: ServiceAgreementV1) => void): void;
    create(correlationId: string, item: ServiceAgreementV1, callback: (err: any, item: ServiceAgreementV1) => void): void;
    update(correlationId: string, item: ServiceAgreementV1, callback: (err: any, item: ServiceAgreementV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: ServiceAgreementV1) => void): void;
}
