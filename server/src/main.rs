extern crate core;

use std::env;
use std::path::{Path, PathBuf};

use axum::body;
use axum::body::{Body, Full};
use axum::handler::Handler;
use axum::http::{header, StatusCode, Uri};
use axum::response::Response;
use axum::Router;
use clap::Parser;

use crate::args::Args;
use crate::config::Config;

mod args;
mod config;

const WEBSITE_BASEDIR: &str = "website";

struct Server {
    config: Config,
}

impl Server {
    async fn new(config: Config) -> Self {
        Self { config }
    }

    async fn serve(self: &Self) -> () {
        let sanity_token = env::var("SANITY_TOKEN").unwrap_or_else(|_| panic!("The environment variable 'SANITY_TOKEN' must be set"));
        println!("server.serve(): started");
        axum::Server::bind(&self.config.address)
            .serve(self.router().into_make_service())
            .await.unwrap();
        println!("server.serve() stopped.")
    }

    fn router(&self) -> Router<Body> {
        println!("server.router(): started creating new router");

        let router = Router::new()
            .fallback(Server::fallback_handler.into_service());

        println!("server.router(): created new router");
        router
    }

    async fn fallback_handler(uri: Uri) -> (StatusCode, Response) {
        let file_path = Self::get_file_path(&uri);
        let file_read = std::fs::read(&file_path);
        let response = if file_read.is_ok() {
            let mime = mime_guess::from_path(&file_path).first_or_text_plain();
            let file_content = file_read.unwrap();
            Response::builder()
                .header(header::CONTENT_TYPE, mime.as_ref())
                .body(body::boxed(Full::from(file_content))).unwrap()
        } else {
            let index_path = Self::get_index_html_path();
            let index_read = std::fs::read(&index_path).unwrap(); // TODO: panic and exit
            Response::builder().body(body::boxed(Full::from(index_read))).unwrap()
        };
        (StatusCode::OK, response)
    }

    fn get_file_path(uri: &Uri) -> PathBuf {
        Path::new(WEBSITE_BASEDIR).join(uri.path().trim_start_matches("/"))
    }

    fn get_index_html_path() -> PathBuf {
        Path::new(WEBSITE_BASEDIR).join("index.html")
    }
}

#[tokio::main]
async fn main() {
    let config = Args::parse().config();
    println!(
        "TypeDB Web server started on '{}' (workdir = {})...",
        env::current_dir().unwrap().as_path().display(),
        config.address
    );

    let server = Server::new(config).await;
    println!("Server started.");
    server.serve().await;
    println!("server stopped.");
}
