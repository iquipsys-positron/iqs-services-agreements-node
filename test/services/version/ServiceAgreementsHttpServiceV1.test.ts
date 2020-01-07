let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { ServiceAgreementV1 } from '../../../src/data/version1/ServiceAgreementV1';
import { ServiceAgreementsMemoryPersistence } from '../../../src/persistence/ServiceAgreementsMemoryPersistence';
import { ServiceAgreementsController } from '../../../src/logic/ServiceAgreementsController';
import { ServiceAgreementsHttpServiceV1 } from '../../../src/services/version1/ServiceAgreementsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('ServiceAgreementsHttpServiceV1', ()=> {    
    let service: ServiceAgreementsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new ServiceAgreementsMemoryPersistence();
        let controller = new ServiceAgreementsController();

        service = new ServiceAgreementsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-agreements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-agreements', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-agreements', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let agreement1, agreement2: ServiceAgreementV1;

        async.series([
        // Create one agreement
            (callback) => {
                rest.post('/v1/service_agreements/create_agreement',
                    {
                        agreement: AGREEMENT1
                    },
                    (err, req, res, agreement) => {
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
                rest.post('/v1/service_agreements/create_agreement', 
                    {
                        agreement: AGREEMENT2
                    },
                    (err, req, res, agreement) => {
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
                rest.post('/v1/service_agreements/get_agreements',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the agreement
            (callback) => {
                agreement1.number = 'A1';

                rest.post('/v1/service_agreements/update_agreement',
                    { 
                        agreement: agreement1
                    },
                    (err, req, res, agreement) => {
                        assert.isNull(err);

                        assert.isObject(agreement);
                        assert.equal(agreement.number, 'A1');
                        assert.equal(agreement.id, agreement1.id);

                        agreement1 = agreement;

                        callback();
                    }
                );
            },
        // Delete agreement
            (callback) => {
                rest.post('/v1/service_agreements/delete_agreement_by_id',
                    {
                        agreement_id: agreement1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete agreement
            (callback) => {
                rest.post('/v1/service_agreements/get_agreement_by_id',
                    {
                        agreement_id: agreement1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});