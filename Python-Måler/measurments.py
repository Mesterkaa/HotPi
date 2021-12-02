# imports
from sense_hat import SenseHat
import requests
import time
from time import sleep
from uuid import getnode as get_mac
from getmac import get_mac_address as gma

waitTime = 5


def wait(color, waitTime):
    i = 0
    red = color
    while  i < waitTime * 2: 
        if i % 2 == 0:
            sense.clear((red))
        else:
            sense.clear()
        sleep(0.5)
        i += 1
        print("i:", i)



# Looping
while True:
    # getting pressure, temp, humidity and mac from sensehat
    sense = SenseHat()
    sense.clear()

    try:
        pressure = sense.get_pressure()
        temp = sense.get_temperature()
        humidity = sense.get_humidity()
        mac = gma(interface="wlan0")
    except NameError as err:
        print(err)
    except:
        print("Something went wrong")
    
    # printing out the mesurements
    print("Pressure is: %.6s Millibars" % pressure)
    print("Temperature is: %.5s C" % temp)
    print("Humidity is: %.5s %%rH" % humidity)
    print("Mac Adress:", mac, "\n")

    # Sending data to the server
    response = requests.post('http://10.42.0.1:3000/data/save_data', data = { 
        'air_pressure': pressure, 
        'temperature': temp, 
        'humidity': humidity, 
        'mac': mac 
    })

    # a little HTTP Error handling
    if (response.status_code == 200):
        green = 28, 252, 3
        wait(green, waitTime)

        waitTime = response.json()["waitTime"]
        print("WaitTime: ", waitTime)
        
        
    elif (response.status_code != 200):
        red = 255, 0, 0
        wait(red, waitTime)

    waitTime = response.json()["waitTime"]
    print("WaitTime: ", waitTime)