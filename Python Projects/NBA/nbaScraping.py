# Packages to needed to scrape the data 
import pandas as pd
import requests 
pd.set_option('display.max_columns', None) # This will let us see all the columns in a wide DataFrame
import time
import numpy as np

#I'll do two versions of web scraping first will be using season data to predict playoff winners and from the rookies potential future all stars
# And second will be playoffs data (first two rounds to predict finals mvp )

r= requests.get(url="https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2023-24&SeasonType=Regular%20Season&StatCategory=PTS").json()
