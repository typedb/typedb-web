use clap::Parser;
use crate::config::Config;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
pub(super) struct Args {
    #[arg(short, long)]
    address: String,
}

impl Args {
    pub(super) fn config(self: &Self) -> Config {
        Config {
            address: self.address.parse().expect(Self::invalid_server_address(&self.address).as_str()),
        }
    }

    fn invalid_server_address(address: &String) -> String {
        return format!("Invalid server address: '{}'", address);
    }
}
