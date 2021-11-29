# imports
from sense_hat import SenseHat
import requests

sense = SenseHat()
sense.clear()

#looping
while True:  
    # getting pressure, temp and humidity from sensehat
    pressure = sense.get_pressure()
    temp = sense.get_temperature()
    humidity = sense.get_humidity()

    # printing out the mesurements
    print(pressure)
    print(temp)
    print(humidity)

    sense.show_message("Temperature is: %.4s" % temp)
    sense.show_message("Pressure is: %.4s" % pressure)
    sense.show_message("Humidity is: %.4s" % humidity)

    # Sending data to the server
    requests.post('http://127.0.0.1/save_data', data = { 'pressure': pressure, 'temp': temp, 'humidity': humidity })

    # a little HTTP Error handling
    if (response.status_code == 200):
        print("The request was a success!")
        # Code here will only run if the request is successful
    elif (response.status_code == 404:
        print("Result not found!")
        # Code here will react to failed requests

    # print out http response
    print(response.headers[]) 

    # clearing sensehat
    sense.clear((pressure, temp, humidity))