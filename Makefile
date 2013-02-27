SHELL := /bin/bash

wiki = https://wiki.timgroup.com
sf_results = $(wiki)/management_study_group/strengths_finder_results
reports_to = $(wiki)/fgigli/reports_to

bs4_url = http://www.crummy.com/software/BeautifulSoup/bs4/download/4.1/
bs4_ver = beautifulsoup4-4.1.2

run: strength.json d3.v3.js less-1.3.3.js underscore-1.4.4.js
	./server

d3.v3.js:
	wget http://d3js.org/d3.v3.js

less-1.3.3.js:
	wget https://raw.github.com/cloudhead/less.js/master/dist/less-1.3.3.js

underscore-1.4.4.js:
	wget https://raw.github.com/documentcloud/underscore/1.4.4/underscore.js
	mv underscore.js underscore-1.4.4.js

strength.json: strength.csv reports_to.csv convert.py
	python convert.py

strength.csv: doku2csv.py username password bs4
	python doku2csv.py $(sf_results) > strength.csv

reports_to.csv: doku2csv.py username password bs4
	python doku2csv.py $(reports_to) > reports_to.csv

username:
	@read -p "Enter wiki username: " && echo $$REPLY > username

password:
	@read -p "Enter wiki password: " -s && echo $$REPLY > password

$(bs4_ver).tar.gz:
	wget $(bs4_url)/$(bs4_ver).tar.gz

$(bs4_ver): $(bs4_ver).tar.gz
	tar zxf $(bs4_ver).tar.gz

bs4: $(bs4_ver)
	cp -a $(bs4_ver)/bs4 bs4

.PHONY: clean

clean:
	rm -rf *.json *.csv *~ password username
