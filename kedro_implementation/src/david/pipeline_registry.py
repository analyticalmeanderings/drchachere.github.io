
"""Project pipelines."""
from typing import Dict

from kedro.pipeline import Pipeline

from david.pipelines import data_processing as dp
from david.pipelines import data_science as ds
from david.pipelines import data_visuals as dv


def register_pipelines() -> Dict[str, Pipeline]:
    """Register the project's pipelines.

    Returns:
        A mapping from a pipeline name to a ``Pipeline`` object.
    """
    data_processing_pipeline = dp.create_pipeline()
    data_science_pipeline = ds.create_pipeline()
    data_visuals_pipeline = dv.create_pipeline()

    return {
        "__default__": data_processing_pipeline+data_science_pipeline+data_visuals_pipeline,
        "dp": data_processing_pipeline,
        "ds": data_science_pipeline,
        "dv": data_visuals_pipeline,
    }
