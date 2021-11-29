from sense_hat import SenseHat
import requests

sense = SenseHat()
sense.clear()

pressure = sense.get_pressure()
temp = sense.get_temperature()
humidity = sense.get_humidity()


print(pressure)
print(temp)
print(humidity)

requests.post('http://127.0.0.1/save_data', data = {'pressure': pressure, 'temp': temp, 'humidity': humidity})

if (response.status_code == 200):
    print("The request was a success!")
    # Code here will only run if the request is successful
elif (response.status_code == 404:
    print("Result not found!")
    # Code here will react to failed requests

print(response.headers[]) 


sense.clear((r, g, b))