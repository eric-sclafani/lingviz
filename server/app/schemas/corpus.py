from pydantic import BaseModel


class Corpus(BaseModel):
    total_docs: int
    total_sentences: int
    total_tokens: int
    total_types: int

    avg_tokens_per_doc: int
    median_tokens_per_doc: int
    range_num_tokens: int
