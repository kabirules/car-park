import { View, Property } from "tns-core-modules/ui/core/view";
import { Color } from "tns-core-modules/color/color";
export declare enum MapStyle {
    DARK,
    OUTDOORS,
    LIGHT,
    SATELLITE,
    HYBRID,
    SATELLITE_STREETS,
    EMERALD,
    STREETS,
    TRAFFIC_DAY,
    TRAFFIC_NIGHT,
}
export interface LatLng {
    lat: number;
    lng: number;
}
export interface AddPolygonOptions {
    points: LatLng[];
    fillColor?: string | Color;
    strokeColor?: string | Color;
}
export interface SetCenterOptions extends LatLng {
    animated?: boolean;
}
export interface AddPolylineOptions {
    id?: any;
    width?: number;
    color?: string | Color;
    opacity?: number;
    points: LatLng[];
}
export interface MapboxMarker extends LatLng {
    id?: any;
    title?: string;
    subtitle?: string;
    icon?: string;
    iconPath?: string;
    onTap?: Function;
    onCalloutTap?: Function;
}
export interface SetZoomLevelOptions {
    level: number;
    animated: boolean;
}
export interface SetTiltOptions {
    tilt: number;
    duration: number;
}
export interface ShowOptionsMargins {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
export interface Bounds {
    north: number;
    east: number;
    south: number;
    west: number;
}
export interface Viewport {
    bounds: Bounds;
    zoomLevel: number;
}
export interface SetViewportOptions {
    bounds: Bounds;
    animated?: boolean;
}
export interface DeleteOfflineRegionOptions {
    name: string;
}
export interface MapboxCluster {
    points: number;
    color: string;
}
export interface AddGeoJsonClusteredOptions {
    name: string;
    data: string;
    clusterMaxZoom?: number;
    clusterRadius?: number;
    clusters?: Array<MapboxCluster>;
}
export interface AddExtrusionOptions {
}
export interface OfflineRegion {
    name: string;
    bounds: Bounds;
    minZoom: number;
    maxZoom: number;
    style: MapStyle;
}
export interface DownloadProgress {
    name: string;
    completed: number;
    expected: number;
    percentage: number;
    complete: boolean;
    completedSize?: number;
}
export interface DownloadOfflineRegionOptions extends OfflineRegion {
    onProgress?: (data: DownloadProgress) => void;
    accessToken?: string;
}
export interface ShowOptions {
    accessToken: string;
    style?: MapStyle;
    margins?: ShowOptionsMargins;
    center?: LatLng;
    zoomLevel?: number;
    showUserLocation?: boolean;
    hideLogo?: boolean;
    hideAttribution?: boolean;
    hideCompass?: boolean;
    disableRotation?: boolean;
    disableScroll?: boolean;
    disableZoom?: boolean;
    disableTilt?: boolean;
    markers?: MapboxMarker[];
}
export interface ShowResult {
    ios: any;
    android: any;
}
export interface AnimateCameraOptions {
    target: LatLng;
    zoomLevel?: number;
    altitude?: number;
    bearing?: number;
    tilt?: number;
    duration?: number;
}
export interface MapboxCommonApi {
    requestFineLocationPermission(): Promise<boolean>;
    hasFineLocationPermission(): Promise<boolean>;
}
export interface MapboxApi {
    show(options: ShowOptions): Promise<ShowResult>;
    hide(): Promise<any>;
    unhide(): Promise<any>;
    destroy(nativeMap?: any): Promise<any>;
    setMapStyle(style: string | MapStyle, nativeMap?: any): Promise<any>;
    addMarkers(markers: MapboxMarker[], nativeMap?: any): Promise<any>;
    removeMarkers(options?: any, nativeMap?: any): Promise<any>;
    setCenter(options: SetCenterOptions, nativeMap?: any): Promise<any>;
    getCenter(nativeMap?: any): Promise<LatLng>;
    setZoomLevel(options: SetZoomLevelOptions, nativeMap?: any): Promise<any>;
    getZoomLevel(nativeMap?: any): Promise<number>;
    setTilt(options: SetTiltOptions, nativeMap?: any): Promise<any>;
    getTilt(nativeMap?: any): Promise<number>;
    addPolygon(options: AddPolygonOptions, nativeMap?: any): Promise<any>;
    addPolyline(options: AddPolylineOptions, nativeMap?: any): Promise<any>;
    removePolylines(ids?: Array<any>, nativeMap?: any): Promise<any>;
    animateCamera(options: AnimateCameraOptions, nativeMap?: any): Promise<any>;
    setOnMapClickListener(listener: (data: LatLng) => void, nativeMap?: any): Promise<any>;
    requestFineLocationPermission(): Promise<any>;
    hasFineLocationPermission(): Promise<boolean>;
    getViewport(nativeMap?: any): Promise<Viewport>;
    setViewport(options: SetViewportOptions, nativeMap?: any): Promise<any>;
    downloadOfflineRegion(options: DownloadOfflineRegionOptions): Promise<any>;
    listOfflineRegions(): Promise<Array<OfflineRegion>>;
    deleteOfflineRegion(options: DeleteOfflineRegionOptions): Promise<any>;
    addGeoJsonClustered(options: AddGeoJsonClusteredOptions): Promise<any>;
}
export declare abstract class MapboxCommon implements MapboxCommonApi {
    static defaults: {
        style: string;
        mapStyle: string;
        margins: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        zoomLevel: number;
        showUserLocation: boolean;
        hideLogo: boolean;
        hideAttribution: boolean;
        hideCompass: boolean;
        disableRotation: boolean;
        disableScroll: boolean;
        disableZoom: boolean;
        disableTilt: boolean;
        delay: number;
    };
    static merge(obj1: {}, obj2: {}): any;
    requestFineLocationPermission(): Promise<boolean>;
    hasFineLocationPermission(): Promise<boolean>;
}
export interface MapboxViewApi {
    addMarkers(markers: MapboxMarker[]): Promise<any>;
    removeMarkers(options?: any): Promise<any>;
    setOnMapClickListener(listener: (data: LatLng) => void): Promise<any>;
    getViewport(): Promise<Viewport>;
    setViewport(options: SetViewportOptions): Promise<any>;
    setMapStyle(style: string | MapStyle): Promise<any>;
    getCenter(): Promise<LatLng>;
    setCenter(options: SetCenterOptions): Promise<any>;
    getZoomLevel(): Promise<number>;
    setZoomLevel(options: SetZoomLevelOptions): Promise<any>;
    getTilt(): Promise<number>;
    setTilt(options: SetTiltOptions): Promise<any>;
    addPolygon(options: AddPolygonOptions): Promise<any>;
    addPolyline(options: AddPolylineOptions): Promise<any>;
    removePolylines(ids?: Array<any>): Promise<any>;
    animateCamera(options: AnimateCameraOptions): Promise<any>;
    destroy(): Promise<any>;
}
export declare abstract class MapboxViewCommonBase extends View implements MapboxViewApi {
    protected mapbox: MapboxApi;
    abstract getNativeMapView(): any;
    addMarkers(markers: MapboxMarker[]): Promise<any>;
    removeMarkers(options?: any): Promise<any>;
    setOnMapClickListener(listener: (data: LatLng) => void): Promise<any>;
    getViewport(): Promise<Viewport>;
    setViewport(options: SetViewportOptions): Promise<any>;
    setMapStyle(style: string | MapStyle): Promise<any>;
    getCenter(): Promise<LatLng>;
    setCenter(options: SetCenterOptions): Promise<any>;
    getZoomLevel(): Promise<number>;
    setZoomLevel(options: SetZoomLevelOptions): Promise<any>;
    getTilt(): Promise<number>;
    setTilt(options: SetTiltOptions): Promise<any>;
    addPolygon(options: AddPolygonOptions): Promise<any>;
    addPolyline(options: AddPolylineOptions): Promise<any>;
    removePolylines(ids?: Array<any>): Promise<any>;
    animateCamera(options: AnimateCameraOptions): Promise<any>;
    destroy(): Promise<any>;
}
export declare const zoomLevelProperty: Property<MapboxViewCommonBase, number>;
export declare const accessTokenProperty: Property<MapboxViewCommonBase, string>;
export declare const mapStyleProperty: Property<MapboxViewCommonBase, string>;
export declare const latitudeProperty: Property<MapboxViewCommonBase, number>;
export declare const longitudeProperty: Property<MapboxViewCommonBase, number>;
export declare const showUserLocationProperty: Property<MapboxViewCommonBase, boolean>;
export declare const hideLogoProperty: Property<MapboxViewCommonBase, boolean>;
export declare const hideAttributionProperty: Property<MapboxViewCommonBase, boolean>;
export declare const hideCompassProperty: Property<MapboxViewCommonBase, boolean>;
export declare const disableZoomProperty: Property<MapboxViewCommonBase, boolean>;
export declare const disableRotationProperty: Property<MapboxViewCommonBase, boolean>;
export declare const disableScrollProperty: Property<MapboxViewCommonBase, boolean>;
export declare const disableTiltProperty: Property<MapboxViewCommonBase, boolean>;
export declare const delayProperty: Property<MapboxViewCommonBase, number>;
export declare abstract class MapboxViewBase extends MapboxViewCommonBase {
    static mapReadyEvent: string;
    static locationPermissionGrantedEvent: string;
    protected config: any;
    ios: any;
    android: any;
}
