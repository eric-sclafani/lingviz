import spacy
from spacy.tokens import Doc
from spacy.language import Language
from spacy.cli.download import download
from models.document import Document
from typing import Iterable


class TextProcessor:
    documents: Iterable[Document]
    raw_docs: Iterable[str]
    raw_ids: Iterable[str]

    def process_raw_documents(self):
        nlp = self._load_nlp()

        text_id_pairs = zip(self.raw_docs, self.raw_ids)
        spacy_docs = list(nlp.pipe(text_id_pairs, as_tuples=True))
        self.documents = [Document(d, i) for d, i in spacy_docs]

    def _load_nlp(self, model="en_core_web_sm") -> Language:
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
