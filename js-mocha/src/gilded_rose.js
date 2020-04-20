class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let item of this.items) {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        this.changeQuality(item);
        this.reduceSellIn(item);
        this.changeQualityModifiers(item);
      }
    }

    return this.items;
  }

  changeQualityModifiers(item) {
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          this.reduceQuality(item);
        }
        else {
          item.quality = item.quality - item.quality;
        }
      }
      else {
        this.increaseQuality(item);
      }
    }
  }

  reduceSellIn(item) {
    item.sellIn = item.sellIn - 1;
  }

  reduceQuality(item) {
    item.quality = Math.max(0, item.quality - 1);
  }

  increaseQuality(item) {
    item.quality = Math.min(50, item.quality + 1);
  }

  changeQuality(item) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        this.reduceQuality(item);
    }
    else {
      this.increaseQuality(item);
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 11) {
          this.increaseQuality(item);
        }
        if (item.sellIn < 6) {
          this.increaseQuality(item);
        }
      }
    }
  }
}
module.exports = {
  Item,
  Shop
}
