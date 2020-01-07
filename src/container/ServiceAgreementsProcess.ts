import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { ServiceAgreementsServiceFactory } from '../build/ServiceAgreementsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class ServiceAgreementsProcess extends ProcessContainer {

    public constructor() {
        super("service_agreements", "Service agreements microservice");
        this._factories.add(new ServiceAgreementsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
