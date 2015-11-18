'use strict';

describe('getDiv', function() {
    var d = document.querySelector('.Kinderley');

    it('Should exist', function() {
        expect(d.nodeName).toBe('DIV');
    });
});