import os
import pickle
import sys
import pandas as pd


model_path = "C:/Users/ak478/Desktop/FYP/Adaptive E-learning/Ai/model.pkl"

if not os.path.exists(model_path):
    print("Error: Model file 'model.pkl' does not exist.")
    print("Please train the model first and save it as 'model.pkl'.")
    sys.exit(1)  
else:
    
    def predict_next_difficulty(current_difficulty, total_attempts, total_correct):
        features = pd.DataFrame([{
        "current_difficulty": current_difficulty,
        "total_attempts": total_attempts,
        "total_correct": total_correct,
    }])
        with open(model_path, 'rb') as f:
         model = pickle.load(f)
         return model.predict(features)[0]

    if __name__ == "__main__":
        current_difficulty = int(sys.argv[1])
        total_attempts = int(sys.argv[2])
        total_correct = int(sys.argv[3])
        
        next_difficulty = predict_next_difficulty(
        current_difficulty, total_attempts, total_correct
           )
        print(next_difficulty)

      