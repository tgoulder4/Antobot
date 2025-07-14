from plyer import battery, cpu, gps

def main():
    test=gps.start(1000, 5)
    print(str(gps.start(1000, 5)))

main()