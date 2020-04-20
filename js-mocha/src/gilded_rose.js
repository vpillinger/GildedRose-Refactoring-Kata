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
    for (var i = 0; i < this.items.length; i++) {
      if (this.isReducingItem(i)) {
        if (this.isQualityIsOverMinimum(i)) {
          if (this.isSulfuras(i)) {
            this.reduceQuality(i);
          }
        }
      } else {
        if (this.isNotMaxQuality(i)) {
          this.increaseQuality(i);
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.isNotMaxQuality(i)) {
                this.increaseQuality(i);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.isNotMaxQuality(i)) {
                this.increaseQuality(i);
              }
            }
          }
        }
      }
      this._reduceSellIn(this.items[i]);
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.isQualityIsOverMinimum(i)) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.reduceQuality(i);
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.isNotMaxQuality(i)) {
            this.increaseQuality(i);
          }
        }
      }
    }

    return this.items;
  }

  increaseQuality(i) {
    this.items[i].quality = this.items[i].quality + 1;
  }

  reduceQuality(i) {
    this.items[i].quality = this.items[i].quality - 1;
  }

  isNotMaxQuality(i) {
    return this.items[i].quality < 50;
  }

  isSulfuras(i) {
    return this.items[i].name != 'Sulfuras, Hand of Ragnaros';
  }

  isQualityIsOverMinimum(i) {
    return this.items[i].quality > 0;
  }

  isReducingItem(i) {
    return this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert';
  }

  _reduceSellIn(item) {
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }
  }
}
module.exports = {
  Item,
  Shop
}
