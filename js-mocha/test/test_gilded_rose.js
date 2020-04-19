var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  
  it(`if item name is not 'Aged Brie' or 'Backstage passes to a TAFKAL80ETC concert'
    and quality is greater than 0 
    and name is not 'Sulfuras, Hand of Ragnaros'
    Then it reduces quality by 1`, function() {
    const gildedRose = new Shop([ new Item("foo", 10, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(9);
  });
});
