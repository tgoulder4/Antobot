declare module '@/conversions/euclideanToCartesian' {
    export function convertEuclideanToCartesian(latitude: number, longitude: number, altitude: number): Promise<number[]>;
}