#!/usr/bin/env python

import csv
from collections import defaultdict

per_strength = {}
per_person = defaultdict(list)
legend = [
    "Name",
    "Strength1",
    "Strength2",
    "Strength3",
    "Strength4",
    "Strength5"
    ]

# read
with open("strength_wiki.csv", "r") as src:
    for row in csv.reader(src):
        per_strength[row[0]] = [x for x in row[1:] if x != ""]

# rotate
for strength, people in per_strength.items():
    for person in people:
        per_person[person].append(strength)

# write
with open("strength.csv", "w") as dst:
    writer = csv.writer(dst)
    writer.writerow(legend)
    for person, strength in sorted(per_person.items()):
        writer.writerow([person] + sorted(strength))
