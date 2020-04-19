var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("Items past their sell by degrade twice as fast as normal", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

});
