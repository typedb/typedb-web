use std::net::SocketAddr;
use clap::ValueEnum;

#[derive(Clone)]
pub(crate) struct Config {
    pub env: Environment,
    pub address: SocketAddr,
    pub sanity_url: String,
}

#[derive(ValueEnum, Clone)]
pub(crate) enum Environment {
    Staging,
    Production,
}
