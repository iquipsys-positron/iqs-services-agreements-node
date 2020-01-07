let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ServiceAgreementV1 } from '../../src/data/version1/ServiceAgreementV1';
import { ServiceAgreementsMemoryPersistence } from '../../src/persistence/ServiceAgreementsMemoryPersistence';
import { ServiceAgreementsController } from '../../src/logic/ServiceAgreementsController';
import { ServiceAgreementsLambdaFunction } from '../../src/container/ServiceAgreementsLambdaFunction';

let AGREEMENT1: ServiceAgreementV1 = {
    id: '1',
    number: 'A',
    create_time: new Date(),
    active: true,
    start_time: new Date(2017, 2, 1),
    end_time: new Date(2017, 3, 1),
    company: 'Company 1'
};
let AGREEMENT2: ServiceAgreementV1 = {
    id: '2',
    number: 'B',
    create_time: new Date(),
    active: true,
    start_time: new Date(2017, 2, 1),
    end_time: new Date(2017, 3, 1),
    company: 'Company 2'
};

suite('ServiceAgreementsLambdaFunction', ()=> {
    let lambda: ServiceAgreementsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-agreements:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-agreements:controller:default:default:1.0'
        );

        lambda = new ServiceAgreementsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var agreement1, agreement2;

        async.series([
        // Create one agreement
            (callback) => {
                lambda.act(
                    {
                        role: 'service_agreements',
                        cmd: 'create_agreement',
                        agreement: AGREEMENT1
                    },
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, AGREEMENT1.number);
                        assert.equal(agreement.active, AGREEMENT1.active);
                        assert.equal(agreement.company, AGREEMENT1.company);

                        agreement1 = agreement;

                        callback();
                    }
                );
            },
        // Create another agreement
            (callback) => {
                lambda.act(
                    {
                        role: 'service_agreements',
                        cmd: 'create_agreement',
                        agreement: AGREEMENT2
                    },
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, AGREEMENT2.number);
                        assert.equal(agreement.active, AGREEMENT2.active);
                        assert.equal(agreement.company, AGREEMENT2.company);

                        agreement2 = agreement;

                        callback();
                    }
                );
            },
        // Get all agreements
            (callback) => {
                lambda.act(
                    {
                        role: 'service_agreements',
                        cmd: 'get_agreements' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the agreement
            (callback) => {
                agreement1.name = 'Updated agreement 1';

                lambda.act(
                    {
                        role: 'service_agreements',
                        cmd: 'update_agreement',
                        agreement: agreement1
                    },
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.name, 'Updated agreement 1');
                        assert.equal(agreement.id, agreement1.id);

                        agreement1 = agreement;

                        callback();
                    }
                );
            },
        // Delete agreement
            (callback) => {
                lambda.act(
                    {
                        role: 'service_agreements',
                        cmd: 'delete_agreement_by_id',
                        agreement_id: agreement1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete agreement
            (callback) => {
                lambda.act(
                    {
                        role: 'service_agreements',
                        cmd: 'get_agreement_by_id',
                        agreement_id: agreement1.id
                    },
                    (err, agreement) => {
                        assert.isNull(err);

                        assert.isNull(agreement || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});