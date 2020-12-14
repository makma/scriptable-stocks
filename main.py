import requests
from bs4 import BeautifulSoup
import os
import json
import datetime

loosers_url = 'https://finance.yahoo.com/losers/'
loosers_response = requests.get(loosers_url)
loosers_page = BeautifulSoup(loosers_response.text, 'html.parser')
loosers_table = loosers_page.find('tbody')
looser_rows = loosers_table.find_all('tr')

result_json_content = {}
result_json_content['timestamp'] = datetime.datetime.now().strftime('%c')
result_json_content['loosers'] = []

for looser_row in looser_rows:
  cells = looser_row.find_all('td')
  ticker = cells[0].find('a').string
  name = cells[1].text
  change = cells[4].find('span').string
  result_json_content['loosers'].append({
    'ticker': ticker,
    'name': name,
    'change': change
  })

loosers_json_filename = 'docs/result.json'
if os.path.exists(loosers_json_filename):
  os.remove(loosers_json_filename)

with open(loosers_json_filename, 'a') as loosers_json_file:
  json.dump(result_json_content, loosers_json_file)
