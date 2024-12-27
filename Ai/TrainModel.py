import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

data = pd.read_csv("dataset.csv")


X = data[['current_difficulty', 'total_attempts', 'total_correct']]
y = data['next_difficulty']


model = RandomForestClassifier()
model.fit(X, y)


with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
