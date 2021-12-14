# imports
from sense_hat import SenseHat
import requests
import time
from time import sleep
from uuid import getnode as get_mac
from getmac import get_mac_address as gma

waitTime = 5# defined waitTime Variable default to 5 secound wait

# create wait function that takes at color and the waittime variable
def wait(color, waitTime):
    i = 0 # create variable i for loop property
    while  i < waitTime * 2: # starting loop that's wait double the amount of waittime 
        if i % 2 == 0: # if i is a even number blink the color
            sense.clear((color)) # turns all LED's on
        else: # if i is not a even number don't blink
            sense.clear() # turns off all LED's
        sleep(0.5) # sleeps for half a second
        i += 1 # adds 1 to i


sense = SenseHat() # setting sense variable to be pointing at Sensehat Libray
sense.clear() # turns every LED off
mac = gma(interface="wlan0") 

# Starting a infinite loop
while True:

    try:
        # getting pressure, temp, humidity and mac(from wlan0 interface) from sensehat
        pressure = sense.get_pressure()
        temp = sense.get_temperature()
        humidity = sense.get_humidity()
        
    # if theres a NameError print it
    except NameError as err:
        print(err)
    # if theres another type of error or something else wrong print("Something went wrong")
    except:
        print("Something went wrong")
    
    # printing out the mesurements for testing
    print("Pressure is: %.6s Millibars" % pressure)
    print("Temperature is: %.5s C" % temp)
    print("Humidity is: %.5s %%rH" % humidity)
    print("Mac Adress:", mac, "\n")

    # Sending data to the server with data object contaning measurements and mac address in key: value format
    try:
        response = requests.post('http://10.42.0.1:3000/data/save_data', data = { 
            'air_pressure': pressure, 
            'temperature': temp, 
            'humidity': humidity, 
            'mac': mac 
        })
    except:
        red = 255, 0, 0 # defines red as a color
        wait(red, waitTime) # runs wait function with red and waitTime variable

    # if 200 httpstatus if recieved from the server blink green
    if (response.status_code == 200):
        green = 28, 252, 3 # defines green as a color
        wait(green, waitTime) # Runs wait function with waittime variable and color green for success

        waitTime = response.json()["waitTime"] # adds the waitTime response from server to waitTime variable here
        print("WaitTime: ", waitTime) # print out waitTime
        
    # if a 200 HttpStatus is not recieved    
    elif (response.status_code != 200):
        red = 255, 0, 0 # defines red as a color
        wait(red, waitTime) # runs wait function with red and waitTime variable