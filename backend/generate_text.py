

from transformers import pipeline


generator = pipeline("text2text-generation", model="google/flan-t5-base")


generator = pipeline("text-generation", model="tiiuae/falcon-rw-1b")

import sys


prompt = sys.argv[1] if len(sys.argv) > 1 else "Your optimized prompt here."


result = generator(prompt, max_new_tokens=150, num_return_sequences=1)

generated_text = result[0]["generated_text"]

start_index = generated_text.find("SEO-friendly Name:")
if start_index != -1:
    cleaned_result = generated_text[start_index:]
else:
    cleaned_result = generated_text

print(cleaned_result)
