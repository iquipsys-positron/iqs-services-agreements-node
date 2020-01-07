import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { ServiceAgreementsServiceFactory } from '../build/ServiceAgreementsServiceFactory';

export class ServiceAgreementsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("service_agreements", "Service agreements function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-agreements', 'controller', 'default', '*', '*'));
        this._factories.add(new ServiceAgreementsServiceFactory());
    }
}

export const handler = new ServiceAgreementsLambdaFunction().getHandler();