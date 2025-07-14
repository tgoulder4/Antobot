from EuclidianToCartesian import convertEuclidianLatLonToCartesian
import time

def getLatLonFromGPS():
    return {'lat':120,'lon':150}

def getECEF():
    latLon = getLatLonFromGPS()
    xyz=convertEuclidianLatLonToCartesian(latLon['lat'],latLon['lon'])
    print('returning xyz: '+str(xyz))
    return {'x':xyz[0],'y':xyz[1],'z':xyz[2]}

def getCoveredBoundsRelativeToOrigin(origin):
    print("Getting bounds relative to origin...")
    time.sleep(2)
    return {'xMax':200-origin['x'],'xMin':100-origin['x'],'yMax':100-origin['y'],'yMin':100-origin['y'],'zMax':1000-origin['z'],'zMmin':750-origin['z']}

def checkWithinBounds(bounds,origin):
    print("Checking the origin of summon is within bounds...")
    reason=None
    #check max
    if (origin['x'] < bounds['xMin'] or origin['x'] > bounds['xMax']):
        reason='x'
        return reason
    elif (origin['y'] < bounds['yMin'] or origin['y'] > bounds['yMax']):
        reason = "y"
        return reason

    if reason:
        return reason + " is out of bounds"
    else:
         return True

def planPathAndAct(origin,target,staticMap):
    print("Planning path...")
    time.sleep(1) #mock implementation
    print("Moving along path...")
    time.sleep(1) #mock implementation
    

def main():
    #on summon press
    origin = getECEF()
    bounds = getCoveredBoundsRelativeToOrigin(origin)
    print("Origin is "+str(origin) + ", relative bounds are "+str(bounds))

    isWithinBounds = checkWithinBounds(bounds,origin)
    
    if isWithinBounds==True:
        #get current lat long
        print("Position is within bounds. Getting current lat and long...")
        time.sleep(2)
        currentLatLong = [10,20]
        print("Getting origin...")
        origin=convertEuclidianLatLonToCartesian(currentLatLong[0],currentLatLong[1])

        #takes origin, target, staticmap
        planPathAndAct(origin,[None,None,None],'')
        print('Finished!')
    else:
        print("Position is out of bounds!")

main()
        
# needs trialling with mock co-ordinates.