from kedro.pipeline import Pipeline, node

from .nodes import (

)

def create_pipeline(**kwargs):
    return Pipeline(
        [
            node(
                func=add_features_o,
                inputs="train",
                outputs=["train_with_features"],
                name="add_features_o_node",
            ),
        ]
    )