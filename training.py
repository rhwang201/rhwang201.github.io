#!/usr/bin/python

from datetime import date

today = date.today()
year = str(today.year)
month = str(today.month)
day = str(today.day)

file_name = year + '-' + month.zfill(2) + '-' + day.zfill(2) + '-ss.markdown'

f = open(file_name, 'w')

template = """---
layout: post
title:  'Training'
categories: training
tags: squat press chinup
---

Squat       :   230x5x3

Press       :   130x5x5

Chinup      :   42.5x5x5

### Notes
"""

f.write(template)
