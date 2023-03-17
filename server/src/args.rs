use clap::Parser;
use crate::config::Config;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
pub(super) struct Args {
    #[arg(short, long)]
    env: String,
    #[arg(short, long)]
    address: String,
    #[arg(long = "sanity-url")]
    sanity_url: String,
}

impl Args {
    pub(super) fn config(self: &Self) -> Config {
        Config {
            env: self.env.clone(),
            address: self.address.parse().expect(Self::invalid_address(&self.address).as_str()),
            sanity_url: self.sanity_url.parse().expect(Self::invalid_address(&self.sanity_url).as_str()),
        }
    }

    fn invalid_address(address: &String) -> String {
        return format!("Invalid address: '{}'", address);
    }
}
