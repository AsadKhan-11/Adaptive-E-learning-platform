import os
import pickle
import pandas as pd
import sys


model_path = "model.pkl"

if not os.path.exists(model_path):
    print("Error: Model file 'model.pkl' does not exist.")
    print("Please train the model first and save it as 'model.pkl'.")
else:
    with open('model.pkl', 'rb') as f:
     model = pickle.load(f)

     current_difficulty = int(sys.argv[1])
     total_attempts = int(sys.argv[2])
     total_correct = int(sys.argv[3])

    def predict_next_difficulty(current_difficulty, total_attempts, total_correct):
         features = pd.DataFrame([[current_difficulty, total_attempts, total_correct]], 
                            columns=["current_difficulty", "total_attempts", "total_correct"])
         return model.predict(features)[0]

current_difficulty = 3
total_attempts = 10
total_correct = 3

next_difficulty = predict_next_difficulty(current_difficulty, total_attempts, total_correct)
print(f"Predicted next difficulty: {next_difficulty}")


