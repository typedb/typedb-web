use clap::ValueEnum;

#[derive(Clone)]
pub(crate) struct Config {
    pub env: Environment,
}

#[derive(ValueEnum, Clone)]
pub(crate) enum Environment {
    Local,
    Staging,
    Production,
}
