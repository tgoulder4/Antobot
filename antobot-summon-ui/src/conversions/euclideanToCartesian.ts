
// import projector from 'ecef-projector';
// import { toast } from "sonner";

export async function convertEuclideanToCartesian(lat: number, long: number, alt: number) {
    console.log("Converting Euclidean coordinates to Cartesian:" + { lat, long });
    // const xyz = await projector.project(lat, long, alt);
    // console.log("Converted Cartesian coordinates:" + xyz);
    // the z co-ordinate is sometimes NaN?
    // return xyz;
    return { x: lat, y: long, z: alt }; // Mock conversion for testing
}