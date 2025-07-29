
#converting GPS to cartesian. will be done 
from math import cos,sin
import matlab.engine

#model earth as a perfect sphere
# take GPS lat long, set as 0,0 (local co-ord system)

R=6.378e06 #radius of the earth
def useTrigonometric(lat,lon):
        x=R*cos(lat)*sin(lon)
        y=R*cos(lat)*cos(lon)
        z=R*cos(lon)
        return (x,y,z)

def useGeodetic(lat,lon):
      #call the geodeticToECEF fn in matlab
      #initialisation
      eng = matlab.engine.start_matlab()
      cart = eng.geodetic2ecef()
      eng.quit()
      return cart
      
def convertEuclidianLatLonToCartesian(lat,lon):
      print("Converting lat "+str(lat) + " and long "+str(lon)+ " to Cartesian")
      # we could convert from polar co-ordinates to cartesian using simple trigonometry x=rcostheta y=rsintheta 
      # cartesian = useTrigonometric(lat,lon)
      cartesian = useGeodetic(lat,lon)
      print("----------> Resulting cartesian co-ord: "+str(cartesian))

      return cartesian
      # convert this euclidian to cartestian
