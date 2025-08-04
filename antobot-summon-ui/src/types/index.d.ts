declare module '@/conversions/euclideanToCartesian' {
    export function convertEuclideanToCartesian(latitude: number, longitude: number, altitude: number): Promise<number[]>;
}
declare module 'plotly.js-dist' {
    export * from 'plotly.js';
}