import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class ServiceAgreementV1 implements IStringIdentifiable {
    id: string;
    number: string;
    create_time?: Date;
    active?: boolean;
    start_time: Date;
    end_time: Date;
    company: string;
    content?: string;
}
