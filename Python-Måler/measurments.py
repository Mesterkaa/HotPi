# imports
from sense_hat import SenseHat
import requests
import time
from uuid import getnode as get_mac


# Looping
while True:
    # getting pressure, temp, humidity and mac from sensehat
    sense = SenseHat()
    sense.clear()

    try:
        pressure = sense.get_pressure()
        temp = sense.get_temperature()
        humidity = sense.get_humidity()
        mac = get_mac()
    except NameError as err:
        print(err)
    except:
        print("Something went wrong")
    
    # printing out the mesurements
    print("Pressure is: %.6s Millibars" % pressure)
    print("Temperature is: %.5s C" % temp)
    print("Humidity is: %.5s %%rH \n" % humidity)
    print("Mac Adress:", hex(mac))


    # Sending data to the server
    response = requests.post('http://10.42.0.1:3000/data/save_data', data = { 
        'pressure': pressure, 
        'temp': temp, 
        'humidity': humidity, 
        'macaddress': mac 
    })

    # a little HTTP Error handling
    if (response.status_code == 200):
        print("The request was a success!")
        # Code here will only run if the request is successful

    elif (response.status_code == 404):
        print("Result not found!")
        # Code here will react to failed requests
    
    # print out http response
    print(response.json()["waitTime"])



    # should take sleep number from response of response
    print("Sleeping in 5 seconds")
    time.sleep(5)