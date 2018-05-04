#!/usr/bin/env python
from smbus2 import SMBusWrapper
import statistics
import requests

machineID = "CMGZGQ5mPAc4gRxLw"
secret = "password"
url = "https://washndash.meteorapp.com/api"

addr = 0x69
reg1 = 0x20
reg2 = 0x21
reg3 = 0x22
reg4 = 0x23
reg5 = 0x24

data = []

def read_gyro(bus, reg):
    msb = bus.read_byte_data(addr, reg+1)
    lsb = bus.read_byte_data(addr, reg)
    val = (msb<<8) | lsb
    if (val < -(2**15 - 1)):
      val += 2**16
    if (val > (2**15 - 1)):
      val -= 2**16
    return val

state = "off"

with SMBusWrapper(1) as bus:
  bus.write_byte_data(addr, reg1, 0b1111)
  bus.write_byte_data(addr, reg2, 0b0)
  bus.write_byte_data(addr, reg3, 0b1000)

  bus.write_byte_data(addr, reg4, 0b110000)

  x0 = read_gyro(bus, 0x28)
  y0 = read_gyro(bus, 0x2A)
  z0 = read_gyro(bus, 0x2C)

  print(x0)
  print(y0)
  print(z0)

  while(True):
    y = read_gyro(bus, 0x28)

#    b = (x + y + z)/3
    b = y

    data.append(b)
    if (len(data) > 999):
      sigma = statistics.stdev(data)
      if(sigma > 30):
        if state == "off":
          state = "on"
          print("on")
          requests.post(url, headers={"machineid":machineID, "secret":secret, "time":"20"})
      else:
        if(sigma <= 30):
          if state == "on":
            state = "off"
            print("off")
            requests.post(url, headers={"machineid":machineID, "secret":secret, "time":"0"})
      data = []

