import { CommandSet } from 'pip-services3-commons-node';
import { IServiceAgreementsController } from './IServiceAgreementsController';
export declare class ServiceAgreementsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IServiceAgreementsController);
    private makeGetAgreementsCommand;
    private makeGetAgreementByIdCommand;
    private makeCreateAgreementCommand;
    private makeUpdateAgreementCommand;
    private makeDeleteAgreementByIdCommand;
}
