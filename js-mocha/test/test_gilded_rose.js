var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should reduce the sellIn value by 1", function() {
    const gildedRose = new Shop([ new Item("Foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
  });

  it("should not reduce the sellIn value by 1 if the item is 'Sulfuras, Hand of Ragnaros'", function() {
    const gildedRose = new Shop([ new Item('Sulfuras, Hand of Ragnaros', 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

});
