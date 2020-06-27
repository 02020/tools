/** @format */

class Test {
  init(): void {}

  /** 方法重载测试代码 */
  info(name: string): void;
  info(name: number, age: number): void;
  info(name: any, age?: any): void {
    console.log(name);
  }

  /** 插入点 */
  insertPoint(pathIndex: number, pointIndex: number, point: number): Graphic {
    return;
  }
  // insertPoint(ringIndex, pointIndex, point) {}
  /**
   *
   * @param point
   */
  addToPolyline(point) {}
  /**
   *
   * @param point
   */
  addToPolygon(point) {}
}
