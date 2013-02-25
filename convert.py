#!/usr/bin/env python

import csv
from collections import defaultdict
import re
import json

per_strength = {}
per_person = defaultdict(list)
reports_to = []

def clean(value):
    return re.sub("[12345\(\) ]", "", value).strip()

# read
with open("strength_wiki.csv", "r") as src:
    for row in csv.reader(src):
        per_strength[clean(row[0])] = [clean(x) for x in row[1:] if x != ""]

root = None
with open("reports_to.csv", "r") as src:
    for row in csv.reader(src):
        name = clean(row[0])
        reports = clean(row[1])
        if not reports:
            root = name
        else:
            reports_to.append( (name, reports) )

# rotate
for strength, people in per_strength.items():
    for person in people:
        per_person[person].append(strength)

# write
def find_children(name):
    return [ child for child, parent in reports_to if parent == name ]

def recursive_write(name):
  return {
      "name": name,
      "strengths": sorted(per_person[name]),
      "children": [ recursive_write(child) for child in find_children(name) ]
      }

with open("strength.json", "w") as dst:
    json.dump(recursive_write(root), dst)
