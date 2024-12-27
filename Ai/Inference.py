import pickle

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

def predict_next_difficulty(current_difficulty, total_attempts, total_correct):
    features = [[current_difficulty, total_attempts, total_correct]]
    return model.predict(features)[0]
