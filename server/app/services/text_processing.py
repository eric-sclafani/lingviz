from typing import Iterator, List
import spacy
from spacy.tokens import Doc, Span


class TextProcessing:

    def __init__(self):
        pass

    # def init_spacy(self, model: str) -> Iterator[Doc] | None:
    #     try:
    #         nlp = spacy.load(model)
    #         pipe = nlp.pipe(self._docs)
    #     except OSError:
    #         raise OSError(f"Model name {model} not recognized")

    #     return pipe

    # @staticmethod
    # def get_tokens(doc: Doc) -> List[str]:
    #     return [token.text for token in doc]

    # @staticmethod
    # def get_pos_tags(doc: Doc) -> List[str]:
    #     return [token.pos_ for token in doc]

    # @staticmethod
    # def get_named_entities(doc: Doc) -> List[str]:
    #     return [token.label_ for token in doc.ents]

    # def get_sentences(self, doc: Doc) -> List[Span]:
    #     return [sent for sent in doc.sents]
