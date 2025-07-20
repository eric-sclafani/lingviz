from spacy.tokens import Span, Doc
from dataclasses import dataclass
from typing import List, Set
from functools import cached_property
import numpy as np


@dataclass
class NamedEntity:
    text: str
    label: str


@dataclass
class Document:
    spacy_doc: Doc
    doc_id: str

    def __str__(self):
        return self.spacy_doc.text

    @cached_property
    def tokens(self) -> List[str]:
        return [token.text for token in self.spacy_doc]

    @cached_property
    def types(self) -> Set[str]:
        return set(self.tokens)

    @cached_property
    def vector(self) -> np.ndarray:
        return np.array(self.spacy_doc.vector)

    @cached_property
    def sentences(self) -> List[Span]:
        return list(self.spacy_doc.sents)

    @cached_property
    def named_entities(self) -> List[NamedEntity]:
        return [NamedEntity(ent.text, ent.label_) for ent in self.spacy_doc.ents]
