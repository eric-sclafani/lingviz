import spacy
from models.document import Document
from spacy.cli.download import download


def load_nlp(model: str):
    """
    Attempts to load given spaCy model and apply custom extentions.
    Will try to download model if not found on system
    """
    try:
        spacy.prefer_gpu()  # type: ignore
        nlp = spacy.load(model)
    except OSError:
        print(
            f"spaCy model '{model}' not detected in current environment. Downloading..."
        )
        download(model)
        nlp = spacy.load(model)
    nlp.max_length = 10000000
    print(f"spaCy model loaded: {model}")
    return nlp


def main():
    testing_docs = [
        "This is a small sentence to test my code. Here is another sentence for testing lol.",
        "Again, another useful sentence. This one has over twenty words to test for tokenizing and such. I love watching Vinny's steams because he is very funny.",
        "The stupid brown fox jumped in front of the stinky dog named Cujo.",
    ]
    nlp = load_nlp("en_core_web_sm")
    pipe = nlp.pipe(testing_docs, batch_size=1000, n_process=2)


if __name__ == "__main__":
    main()
