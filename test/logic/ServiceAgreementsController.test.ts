let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ServiceAgreementV1 } from '../../src/data/version1/ServiceAgreementV1';
import { ServiceAgreementsMemoryPersistence } from '../../src/persistence/ServiceAgreementsMemoryPersistence';
import { ServiceAgreementsController } from '../../src/logic/ServiceAgreementsController';

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

suite('ServiceAgreementsController', ()=> {
    let persistence: ServiceAgreementsMemoryPersistence;
    let controller: ServiceAgreementsController;

    suiteSetup((done) => {
        persistence = new ServiceAgreementsMemoryPersistence();
        controller = new ServiceAgreementsController();

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-agreements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-agreements', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);

        persistence.open(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var agreement1, agreement2;

        async.series([
        // Create one agreement
            (callback) => {
                controller.createAgreement(
                    null, AGREEMENT1,
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
                controller.createAgreement(
                    null, AGREEMENT2,
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
                controller.getAgreements(
                    null,
                    new FilterParams(),
                    new PagingParams(),
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
                agreement1.number = 'A1';

                controller.updateAgreement(
                    null, agreement1,
                    (err, agreement) => {
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
                controller.deleteAgreementById(
                    null, agreement1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Check logical deletion
            (callback) => {
                controller.getAgreementById(
                    null, agreement1.id,
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