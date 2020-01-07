import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { ServiceAgreementV1 } from '../data/version1/ServiceAgreementV1';
import { ServiceAgreementV1Schema } from '../data/version1/ServiceAgreementV1Schema';
import { IServiceAgreementsController } from './IServiceAgreementsController';

export class ServiceAgreementsCommandSet extends CommandSet {
    private _logic: IServiceAgreementsController;

    constructor(logic: IServiceAgreementsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetAgreementsCommand());
		this.addCommand(this.makeGetAgreementByIdCommand());
		this.addCommand(this.makeCreateAgreementCommand());
		this.addCommand(this.makeUpdateAgreementCommand());
		this.addCommand(this.makeDeleteAgreementByIdCommand());
    }

	private makeGetAgreementsCommand(): ICommand {
		return new Command(
			"get_agreements",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getAgreements(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetAgreementByIdCommand(): ICommand {
		return new Command(
			"get_agreement_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('agreement_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let agreement_id = args.getAsString("agreement_id");
                this._logic.getAgreementById(correlationId, agreement_id, callback);
            }
		);
	}

	private makeCreateAgreementCommand(): ICommand {
		return new Command(
			"create_agreement",
			new ObjectSchema(true)
				.withRequiredProperty('agreement', new ServiceAgreementV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let agreement = args.get("agreement");
                this._logic.createAgreement(correlationId, agreement, callback);
            }
		);
	}

	private makeUpdateAgreementCommand(): ICommand {
		return new Command(
			"update_agreement",
			new ObjectSchema(true)
				.withRequiredProperty('agreement', new ServiceAgreementV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let agreement = args.get("agreement");
                this._logic.updateAgreement(correlationId, agreement, callback);
            }
		);
	}
	
	private makeDeleteAgreementByIdCommand(): ICommand {
		return new Command(
			"delete_agreement_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('agreement_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let agreementId = args.getAsNullableString("agreement_id");
                this._logic.deleteAgreementById(correlationId, agreementId, callback);
			}
		);
	}

}