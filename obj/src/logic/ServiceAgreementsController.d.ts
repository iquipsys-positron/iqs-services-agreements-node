import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
import { IServiceAgreementsController } from './IServiceAgreementsController';
export declare class ServiceAgreementsController implements IConfigurable, IReferenceable, ICommandable, IServiceAgreementsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getAgreements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void;
    getAgreementById(correlationId: string, id: string, callback: (err: any, agreement: ServiceAgreementV1) => void): void;
    createAgreement(correlationId: string, agreement: ServiceAgreementV1, callback: (err: any, obj: ServiceAgreementV1) => void): void;
    updateAgreement(correlationId: string, agreement: ServiceAgreementV1, callback: (err: any, obj: ServiceAgreementV1) => void): void;
    deleteAgreementById(correlationId: string, id: string, callback: (err: any, obj: ServiceAgreementV1) => void): void;
}
