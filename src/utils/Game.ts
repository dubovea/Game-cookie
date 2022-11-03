type DropType = {
  dropped: number[];
  position: number;
  value: any;
  mode: string;
};

export class Game {
  ruCollator = new Intl.Collator("ru-RU");

  findClosest(settings: any) {
    var lo = -Infinity,
      hi = Infinity,
      arr = settings.arr.map((o: { position: number }) => o.position),
      valueToFind = settings.valueToFind,
      result;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] <= valueToFind && arr[i] >= lo) {
        lo = arr[i];
        continue;
      }

      if (arr[i] >= valueToFind && arr[i] <= hi) {
        hi = arr[i];
      }
    }

    result = {
      lo: settings.arr.find((o: { position: number }) => o.position === lo),
      hi: settings.arr.find((o: { position: number }) => o.position === hi),
    };

    return result;
  }

  canDropSymbol(params: DropType) {
    const { dropped, position, value, mode } = { ...params } as DropType;
    const nearestItems = this.findClosest({
        arr: dropped,
        valueToFind: position,
      }),
      isAscending = mode === "asc";

    if (
      nearestItems.lo &&
      this.ruCollator.compare(value, nearestItems.lo.value) <= 0
    ) {
      return false;
    }
    if (
      nearestItems.hi &&
      this.ruCollator.compare(value, nearestItems.hi.value) >= 0
    ) {
      return false;
    }
    if (
      !isAscending &&
      nearestItems.lo &&
      this.ruCollator.compare(value, nearestItems.lo.value) >= 0
    ) {
      return false;
    }
    if (
      !isAscending &&
      nearestItems.hi &&
      this.ruCollator.compare(value, nearestItems.hi.value) <= 0
    ) {
      return false;
    }
    return true;
  }
  canDropNumeric(params: DropType) {
    const { dropped, position, value, mode } = { ...params } as DropType;
    const nearestItems = this.findClosest({
        arr: dropped,
        valueToFind: position,
      }),
      isAscending = mode === "asc";
    if (isAscending && nearestItems.lo && value <= nearestItems.lo.value) {
      return false;
    }
    if (isAscending && nearestItems.hi && value >= nearestItems.hi.value) {
      return false;
    }
    if (!isAscending && nearestItems.lo && value >= nearestItems.lo.value) {
      return false;
    }
    if (!isAscending && nearestItems.hi && value <= nearestItems.hi.value) {
      return false;
    }
    return true;
  }
}
