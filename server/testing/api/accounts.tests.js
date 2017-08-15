import { Factory } from 'meteor/dburles:factory'
import { resetDatabase } from 'meteor/xolvio:cleaner'

import { chai } from 'meteor/practicalmeteor:chai'

describe('Accounts collection API', function () {
    beforeEach(function () {
        resetDatabase()
    })

    it('Test success condition', function () {
        chai.assert.equal(true, true)
    })

    it('Test second success condition', function () {
        chai.assert.equal(1, 1.0)
    })
})