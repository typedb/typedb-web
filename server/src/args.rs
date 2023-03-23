use clap::Parser;
use crate::config::{Config, Environment};

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
pub(super) struct Args {
    #[arg(long = "env", value_enum)]
    env: Environment,
}

impl Args {
    pub(super) fn config(self: &Self) -> Config {
        Config {
            env: self.env.clone(),
        }
    }
}
