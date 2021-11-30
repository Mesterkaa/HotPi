# imports
from sense_hat import SenseHat
# import requests
import time
from uuid import getnode as get_mac


# Looping
while True:
    mac = get_mac()
    print("Mac Adress:", hex(mac))
    
    print("Sleeping in 5 seconds")
    time.sleep(5)

    sense = SenseHat()
    sense.clear()

    # getting pressure, temp and humidity from sensehat
    try:
        pressure = sense.get_pressure()
        temp = sense.get_temperature()
        humidity = sense.get_humidity()
    except NameError:
        print("Naming error")
    except:
        print("Something went wrong")
    
    # printing out the mesurements
    print("Pressure is: %.6s Millibars" % pressure)
    print("Temperature is: %.5s C" % temp)
    print("Humidity is: %.5s %%rH \n" % humidity)


    # Sending data to the server
    # requests.post('http://127.0.0.1/save_data', data = { 'pressure': pressure, 'temp': temp, 'humidity': humidity })


    # # a little HTTP Error handling
    # if (response.status_code == 200):
    #     print("The request was a success!")
    #     # Code here will only run if the request is successful
    # elif (response.status_code == 404):
    #     print("Result not found!")
    #     # Code here will react to failed requests

    # # print out http response
    # print(response.headers[:]) 