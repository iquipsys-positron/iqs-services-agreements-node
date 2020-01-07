import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';

export interface IServiceAgreementsController {
    getAgreements(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void;

    getAgreementById(correlationId: string, agreementId: string, 
        callback: (err: any, agreement: ServiceAgreementV1) => void): void;

    createAgreement(correlationId: string, agreement: ServiceAgreementV1, 
        callback: (err: any, agreement: ServiceAgreementV1) => void): void;

    updateAgreement(correlationId: string, agreement: ServiceAgreementV1, 
        callback: (err: any, agreement: ServiceAgreementV1) => void): void;

    deleteAgreementById(correlationId: string, agreementId: string,
        callback: (err: any, agreement: ServiceAgreementV1) => void): void;
}
