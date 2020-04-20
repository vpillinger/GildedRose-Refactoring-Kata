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
      if (!this.isAgedBrie(item)) {
        if (!this.isBackstagePass(item)) {
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

  isBackstagePass(item) {
    return item.name == 'Backstage passes to a TAFKAL80ETC concert'
    || item.name == 'Conjured Backstage passes to a TAFKAL80ETC concert'
  }
  isAgedBrie(item) {
    return item.name == 'Aged Brie'
    || item.name == 'Conjured Aged Brie'
  }

  reduceSellIn(item) {
    item.sellIn = item.sellIn - 1;
  }

  reduceQuality(item) {
    if(item.name.startsWith('Conjured')) {
      item.quality = Math.max(0, item.quality - 2);
    } else {
      item.quality = Math.max(0, item.quality - 1);
    }
  }

  increaseQuality(item) {
    if(item.name.startsWith('Conjured')) {
      item.quality = Math.min(50, item.quality + 2);
    } else {
      item.quality = Math.min(50, item.quality + 1);
    }
  }

  changeQuality(item) {
    if (!this.isAgedBrie(item) && !this.isBackstagePass(item)) {
        this.reduceQuality(item);
    }
    else {
      this.increaseQuality(item);
      if (this.isBackstagePass(item)) {
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
