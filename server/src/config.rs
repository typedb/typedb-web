use std::net::SocketAddr;

pub(crate) struct Config {
    pub env: String,
    pub address: SocketAddr,
    pub sanity_url: SocketAddr,
}
