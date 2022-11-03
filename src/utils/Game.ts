export class Game {
  ruCollator = new Intl.Collator("ru-RU");
  nearestItem(dropped, position) {
    return dropped.reduce((prev, curr) =>
      Math.abs(curr.position - position) < Math.abs(prev.position - position)
        ? curr
        : prev
    );
  }
  canDropSymbol(params) {
    const { dropped, position, value } = { ...params } as any;
    const nearestItem = this.nearestItem(dropped, position);
    if (
      position < nearestItem.position &&
      this.ruCollator.compare(value, nearestItem.value) > -1
    ) {
      return false;
    }
    if (
      position > nearestItem.position &&
      this.ruCollator.compare(value, nearestItem.value) === -1
    ) {
      return false;
    }
    return true;
  }
  canDropNumeric(params) {
    const { dropped, position, value } = { ...params } as any;
    const nearestItem = this.nearestItem(dropped, position);
    console.log("value" + value);
    console.log("nearestItem" + nearestItem.value);
    if (position < nearestItem.position && value > nearestItem.value) {
      return false;
    }
    if (position > nearestItem.position && value < nearestItem.value) {
      return false;
    }
    return true;
  }
}
