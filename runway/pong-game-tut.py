from kivy.app import App
from kivy.uix.widget import Widget

class PongGame(Widget): #inheritance - PongGame is inherited via Widget
    pass

class PongApp(App):
    def build(self):
        return PongGame()
    

if __name__=='__main__': #the script may be imported by another module, therefore counts as 'running' it. So it needs to be checked to see if it is main
    PongApp().run()