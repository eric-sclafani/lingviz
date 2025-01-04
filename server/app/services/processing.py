"""
This module contains functions for performing text operations over text data
"""

from typing import Iterable, Iterator, List
import spacy
from spacy.tokens import Doc, Span

from schemas.corpus import Corpus


def create_nlp_pipe(model: str, docs: Iterable[str]) -> Iterator[Doc] | None:
    try:
        nlp = spacy.load(model)
        pipe = nlp.pipe(docs)
    except OSError:
        raise OSError(f"Model name '{model}' not recognized")

    return pipe


def get_tokens(doc: Doc) -> List[str]:
    return [token.text for token in doc]


def get_pos_tags(doc: Doc) -> List[str]:
    return [token.pos_ for token in doc]


def get_named_entities(doc: Doc) -> List[str]:
    return [token.label_ for token in doc.ents]


def get_sentences(doc: Doc) -> List[Span]:
    return [sent for sent in doc.sents]


# def create_corpus(pipe: Iterator[Doc]) -> Corpus:

#     tokens = 0
#     types = 0

#     for doc in pipe:
#         tokens += len(doc)


#     return Corpus(

#     )
