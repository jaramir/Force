#!/usr/bin/env python

import csv
from collections import defaultdict
import re
import json

per_strength = {}
per_person = defaultdict(list)
reports_to = {}

def clean(value):
    return re.sub("[12345\(\) ]", "", value).strip()

# read
with open("strength_wiki.csv", "r") as src:
    for row in csv.reader(src):
        per_strength[clean(row[0])] = [clean(x) for x in row[1:] if x != ""]

with open("reports_to.csv", "r") as src:
    for row in csv.reader(src):
        reports_to[clean(row[0])] = clean(row[1])

# rotate
for strength, people in per_strength.items():
    for person in people:
        per_person[person].append(strength)

# write
data = []
for person, strengths in sorted(per_person.items()):
    data.append( {
            "name": person,
            "reports_to": reports_to[person],
            "strengths": sorted(strengths)
            } )

with open("strength.json", "w") as dst:
    json.dump(data, dst)
