import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class ServiceAgreementV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('number', TypeCode.String);
        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('active', TypeCode.Boolean);
        this.withRequiredProperty('start_time', TypeCode.DateTime);
        this.withRequiredProperty('end_time', TypeCode.DateTime);
        this.withRequiredProperty('company', TypeCode.String);
        this.withOptionalProperty('content', TypeCode.String);
    }
}
