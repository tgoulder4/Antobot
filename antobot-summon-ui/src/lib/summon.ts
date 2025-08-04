import { convertEuclideanToCartesian } from "@/conversions/euclideanToCartesian";
import { Message, Ros, Topic } from "roslib";
// import { toast } from "sonner"

//this is to be moved to a python flask server.
export async function summon(ros: Ros, latitude: number, longitude: number, altitude: number) {
    try {

        const botPosition = [10, 50, 2]
        // toast("Determined bot position (lat/long):" + botPosition);
        const botCartesianPosition = await convertEuclideanToCartesian(botPosition[0], botPosition[1], botPosition[2]);
        // toast("Bot position in cartesian coordinates:" + botCartesianPosition);
        const remoteCartesianRelativePosition = (await convertEuclideanToCartesian(latitude, longitude, altitude)).map((value: number, index: number) => value - botPosition[index]);
        // toast("Remote position in cartesian coordinates relative to bot:" + remoteCartesianRelativePosition);
        if ([botCartesianPosition, remoteCartesianRelativePosition].some((pos, i) => isNaN(pos[i]))) {
            throw new Error("Failed to convert coordinates to cartesian system");
        }
        //after above, bot is treated as the origin (0, 0, 0) and remoteCartesianRelativePosition is the remote's position relative to the bot
        const topicName = '/move_base_simple/goal';
        const messageType = 'geometry_msgs/PoseStamped';
        // toast("Publishing to topic:" + topicName + " with message type:" + messageType);

        const topic = new Topic({
            ros: ros,
            name: topicName,
            messageType: messageType
        });

        const message = new Message({
            header: {
                frame_id: 'map',
                stamp: { sec: 0, nsec: 0 }
            },
            pose: {
                position: {
                    x: remoteCartesianRelativePosition[0],
                    y: remoteCartesianRelativePosition[1],
                    z: remoteCartesianRelativePosition[2] || 0 // Default to 0 if not provided
                },
                orientation: {
                    x: 0,
                    y: 0,
                    z: 0,
                    w: 1
                }
            }
        });
        topic.publish(message);
        topic.on('error', (error) => {
            throw new Error(`Error connecting to robot: ${error}`);
        });
        // toast("Summon command sent with coordinates:" + JSON.stringify(message));
        return { success: true, message: "Robot summoned successfully" };
    } catch (error) {
        console.error("Error during summon operation:", error);
        return { success: false, message: error };
    }
}