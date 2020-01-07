let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { NotFoundException } from 'pip-services3-commons-node';

import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
import { IServiceAgreementsPersistence } from '../persistence/IServiceAgreementsPersistence';
import { IServiceAgreementsController } from './IServiceAgreementsController';
import { ServiceAgreementsCommandSet } from './ServiceAgreementsCommandSet';

export class ServiceAgreementsController implements  IConfigurable, IReferenceable, ICommandable, IServiceAgreementsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-agreements:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ServiceAgreementsController._defaultConfig);
    private _persistence: IServiceAgreementsPersistence;
    private _commandSet: ServiceAgreementsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IServiceAgreementsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ServiceAgreementsCommandSet(this);
        return this._commandSet;
    }
    
    public getAgreements(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ServiceAgreementV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getAgreementById(correlationId: string, id: string, 
        callback: (err: any, agreement: ServiceAgreementV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public createAgreement(correlationId: string, agreement: ServiceAgreementV1, 
        callback: (err: any, obj: ServiceAgreementV1) => void): void {

        agreement.active = agreement.active != null ? agreement.active : true;
        agreement.create_time = new Date();
    
        this._persistence.create(correlationId, agreement, callback);
    }

    public updateAgreement(correlationId: string, agreement: ServiceAgreementV1, 
        callback: (err: any, obj: ServiceAgreementV1) => void): void {

        agreement.active = agreement.active != null ? agreement.active : true;
                
        this._persistence.update(correlationId, agreement, callback);
    }

    public deleteAgreementById(correlationId: string, id: string,
        callback: (err: any, obj: ServiceAgreementV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
