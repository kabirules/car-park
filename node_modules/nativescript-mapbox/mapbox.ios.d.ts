import { AddGeoJsonClusteredOptions, MapboxMarker, AddPolygonOptions, AddPolylineOptions, AnimateCameraOptions, DeleteOfflineRegionOptions, DownloadOfflineRegionOptions, LatLng, MapboxApi, MapboxCommon, MapboxViewBase, MapStyle, OfflineRegion, SetCenterOptions, SetTiltOptions, SetViewportOptions, SetZoomLevelOptions, ShowOptions, Viewport, AddExtrusionOptions } from "./mapbox.common";
export { MapStyle };
export declare class MapboxView extends MapboxViewBase {
    private mapView;
    private delegate;
    getNativeMapView(): any;
    createNativeView(): Object;
    initMap(): void;
}
export declare class Mapbox extends MapboxCommon implements MapboxApi {
    show(options: ShowOptions): Promise<any>;
    hide(): Promise<any>;
    unhide(): Promise<any>;
    destroy(nativeMap?: any): Promise<any>;
    setMapStyle(style: string | MapStyle, nativeMap?: any): Promise<any>;
    addMarkers(markers: MapboxMarker[], nativeMap?: any): Promise<any>;
    removeMarkers(ids?: any, nativeMap?: any): Promise<any>;
    setCenter(options: SetCenterOptions, nativeMap?: any): Promise<any>;
    getCenter(nativeMap?: any): Promise<LatLng>;
    setZoomLevel(options: SetZoomLevelOptions, nativeMap?: any): Promise<any>;
    getZoomLevel(nativeMap?: any): Promise<number>;
    setTilt(options: SetTiltOptions, nativeMap?: any): Promise<any>;
    getTilt(nativeMap?: any): Promise<number>;
    addPolygon(options: AddPolygonOptions, nativeMap?: any): Promise<any>;
    addPolyline(options: AddPolylineOptions, nativeMap?: any): Promise<any>;
    private removePolylineById(theMap, id);
    removePolylines(ids?: Array<any>, nativeMap?: any): Promise<any>;
    animateCamera(options: AnimateCameraOptions, nativeMap?: any): Promise<any>;
    setOnMapClickListener(listener: (data: LatLng) => void, nativeMap?: any): Promise<any>;
    getViewport(nativeMap?: any): Promise<Viewport>;
    setViewport(options: SetViewportOptions, nativeMap?: any): Promise<any>;
    downloadOfflineRegion(options: DownloadOfflineRegionOptions): Promise<any>;
    listOfflineRegions(): Promise<OfflineRegion[]>;
    deleteOfflineRegion(options: DeleteOfflineRegionOptions): Promise<any>;
    addExtrusion(options: AddExtrusionOptions, nativeMap?: any): Promise<any>;
    addGeoJsonClustered(options: AddGeoJsonClusteredOptions, nativeMap?: any): Promise<any>;
}
