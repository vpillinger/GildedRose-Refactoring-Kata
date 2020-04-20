var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("can create a shop with no items", function() {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
  });

  it("Should reduce the quality by 1", function() {
    const gildedRose = new Shop([ new Item("foo", 10, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Should reduce the sell by by 1", function() {
    const gildedRose = new Shop([ new Item("foo", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Should reduce the quality twice as fast when the sell-by is past", function() {
    const gildedRose = new Shop([
      new Item("foo", 0, 2),
      new Item("foo2", -1, 2)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
  });

  it("Should never reduce a quality to be negative", function() {
    const gildedRose = new Shop([
      new Item("foo", 0, 0),
      new Item("foo2", -1, 1)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].quality).to.equal(0);
  });

  it("Should increase the quality of 'Aged Brie' by 1", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  });

  it("Increases the quality of expired 'Aged Brie' by 2", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });

  it("Should not increase the quality of 'Aged Brie' by more than 50", function() {
    const gildedRose = new Shop([
      new Item("Aged Brie", 1, 50),
      new Item("Aged Brie", 0, 49)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
  });

  it("Should not change the sell by or quality of 'Sulfuras'", function() {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[1].quality).to.equal(80);
  });

  it("Increases the quality of 'Backstage passes' by 1 if sell by is more than 10", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  });

  it("Increases the quality of 'Backstage passes' by 2 if sell by is 10 or less", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });

  it("Increases the quality of 'Backstage passes' by 3 if sell by is 5 or less", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });

  it("Does not increase the quality of 'Backstage passes' by more than 50", function() {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
  });


  it("Reduces the quality of 'Backstage passes' to 0 after the concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Should reduce the quality of 'Conjured' items by 2", function() {
    const gildedRose = new Shop([ new Item("Conjured foo", 10, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Should reduce the quality of conjured items by 4 when sell-by is past", function() {
    const gildedRose = new Shop([
      new Item("Conjured foo", 0, 4),
      new Item("Conjured foo2", -1, 4)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[1].quality).to.equal(0);
  });


  it("Should increase the quality of 'Conjured Aged Brie' by 2", function() {
    const gildedRose = new Shop([ new Item("Conjured Aged Brie", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });

  it("Increases the quality of expired 'Conjured Aged Brie' by 4", function() {
    const gildedRose = new Shop([ new Item("Conjured Aged Brie", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
  });

  it("Increases the quality of 'Conjured Backstage passes' by 2 if sell by is more than 10", function() {
    const gildedRose = new Shop([ new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 11, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });

  it("Increases the quality of 'Conjured Backstage passes' by 3 if sell by is 10 or less", function() {
    const gildedRose = new Shop([ new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 10, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
  });

  it("Increases the quality of 'Conjured Backstage passes' by 6 if sell by is 5 or less", function() {
    const gildedRose = new Shop([ new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 5, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(6);
  });
});
