#!/usr/bin/env python

import csv
from collections import defaultdict
import re
import json

per_strength = {}
per_person = defaultdict(list)

# read
with open("strength_wiki.csv", "r") as src:
    for row in csv.reader(src):
        per_strength[row[0].strip()] = [re.sub("[12345\(\) ]", "", x).strip() for x in row[1:] if x != ""]

# rotate
for strength, people in per_strength.items():
    for person in people:
        per_person[person].append(strength)

# write
data = []
for person, strengths in sorted(per_person.items()):
    data.append( {
            "name": person,
            "strengths": sorted(strengths)
            } )

with open("strength.json", "w") as dst:
    json.dump(data, dst)
