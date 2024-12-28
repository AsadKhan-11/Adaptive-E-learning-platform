import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

data = pd.read_csv("Dataset.csv")


X = data[['current_difficulty', 'total_attempts', 'total_correct']]
y = data['next_difficulty']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy * 100:.2f}%")


model = RandomForestClassifier()
model.fit(X, y)


with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model has been saved as 'model.pkl'.")
