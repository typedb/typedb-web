use serde::Deserialize;

#[derive(Deserialize)]
pub(super) struct SanityQuery {
    pub query: String,
}
