/** @format */
import MapView from 'esri/views/MapView';
import Point from 'esri/geometry/Point';
import Polyline from 'esri/geometry/Polyline';
import Polygon from 'esri/geometry/Polygon';
/**
 *
 *
 * @interface Coordinates
 */
interface Coordinates {
  x: number;
  y: number;
}
/**
 *
 *
 * @class ShapeStrategy
 */
class ShapeStrategy {
  private view: MapView;
  constructor(view) {
    this.view = view;
  }
  pointToArray(point: Array<number> | Coordinates) {
    return Array.isArray(point) ? point : [point.x, point.y];
  }
  /**
   * 点
   * @param point
   */
  point(point: Array<number> | Coordinates) {
    if (!point) {
      console.log('ShapeStrategy-入参为空');
      return null;
    }
    const _point = this.pointToArray(point);
    return new Point({
      longitude: _point[0],
      latitude: _point[1],
    });
  }
  /**
   * 文字
   * @param point
   */
  text(point) {
    this.point(point);
  }
  /**
   * 线
   * @param vertices
   */
  polyline(vertices) {
    if (!vertices || !Array.isArray(vertices)) {
      return null;
    }
    return new Polyline({
      paths: [vertices.map(this.pointToArray)],
      spatialReference: this.view.spatialReference,
    });
  }
  /**
   * 文字
   * @param vertices
   */
  polygon(vertices) {
    if (!vertices || !Array.isArray(vertices)) {
      return null;
    }
    return new Polygon({
      rings: [vertices.map(this.pointToArray)],
      spatialReference: this.view.spatialReference,
    });
  }
}

export { ShapeStrategy };
