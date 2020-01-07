import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { ServiceAgreementsMemoryPersistence } from './ServiceAgreementsMemoryPersistence';
import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
export declare class ServiceAgreementsFilePersistence extends ServiceAgreementsMemoryPersistence {
    protected _persister: JsonFilePersister<ServiceAgreementV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
