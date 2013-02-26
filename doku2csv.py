#!/usr/bin/python

import urllib2
import sys
from bs4 import BeautifulSoup
import csv

writer = csv.writer(sys.stdout)

username = open("username").read().strip()
password = open("password").read().strip()

url = sys.argv[1] + "?do=login&u=%s&p=%s" % (username, password)

fp = urllib2.urlopen(url)
content = fp.read()
fp.close()

soup = BeautifulSoup(content)
page = soup.find("div", class_="page")
table = page.find("table")
rows = table.find_all("tr")

for row in rows:
    data = [
        cell.get_text().strip()
        for cell
        in row.find_all(["th", "td"])
        ]
    writer.writerow(data)

