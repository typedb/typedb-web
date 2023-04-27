extern crate core;

use std::env;
use std::net::SocketAddr;
use std::path::{Path, PathBuf};
use std::process::Command;

use axum::body;
use axum::body::{Body, Full};
use axum::extract::Query;
use axum::handler::Handler;
use axum::http::{header, StatusCode, Uri};
use axum::response::Response;
use axum::Router;
use axum::routing::get;
use clap::Parser;
use reqwest::Url;
use tower_http::cors::{Any, CorsLayer};
use Environment::{Local, Production, Staging};

use crate::args::Args;
use crate::config::{Config, Environment};

mod args;
mod config;

const SANITY_URL: &str = "https://xndl14mc.api.sanity.io/";
const WEBSITE_BASEDIR_VAR: &str = "WEBSITE_BASEDIR";
const ADDRESS_VAR: &str = "SERVER_ADDRESS";

struct Server {
    config: Config,
}

impl Server {
    async fn new(config: Config) -> Self {
        Self { config }
    }

    async fn serve(self: &Self) -> () {
        println!("server.serve(): started");
        axum::Server::bind(&env::var(ADDRESS_VAR).unwrap().parse().unwrap())
            .serve(self.router().into_make_service())
            .await.unwrap();
        println!("server.serve() stopped.")
    }

    fn router(&self) -> Router<Body> {
        println!("server.router(): started creating new router");

        let config_clone = self.config.clone();
        let mut router = Router::new()
            .route("/api/content", get(|| Server::api_content(config_clone)))
            .fallback(Server::fallback_handler.into_service());

        if let Local = self.config.env {
            router = router.layer(CorsLayer::new().allow_origin(Any));
        }

        println!("server.router(): created new router");
        router
    }

    async fn fallback_handler(uri: Uri) -> (StatusCode, Response) {
        let website_basedir = env::var(WEBSITE_BASEDIR_VAR).unwrap();
        let mut file_path = Self::get_file_path(&uri, website_basedir.as_str());
        let mut file_read = std::fs::read(&file_path);
        if !file_read.is_ok() {
            file_path = Self::get_html_file_path(&uri, website_basedir.as_str());
            file_read = std::fs::read(&file_path);
        }
        let response = if file_read.is_ok() {
            let mime = mime_guess::from_path(&file_path).first_or_text_plain();
            let file_content = file_read.unwrap();
            Response::builder()
                .header(header::CONTENT_TYPE, mime.as_ref())
                .body(body::boxed(Full::from(file_content))).unwrap()
        } else {
            let index_path = Self::get_index_html_path(website_basedir.as_str());
            let index_read = std::fs::read(&index_path).unwrap(); // TODO: panic and exit
            Response::builder().body(body::boxed(Full::from(index_read))).unwrap()
        };
        (StatusCode::OK, response)
    }

    fn get_file_path(uri: &Uri, website_basedir: &str) -> PathBuf {
        Path::new(website_basedir).join(uri.path().trim_start_matches("/"))
    }

    fn get_html_file_path(uri: &Uri, website_basedir: &str) -> PathBuf {
        Path::new(website_basedir).join(uri.path().trim_start_matches("/").to_owned() + ".html")
    }

    fn get_index_html_path(website_basedir: &str) -> PathBuf {
        Path::new(website_basedir).join("index.html")
    }

    async fn api_content(config: Config) -> Response<String> {
        match config.env {
            Production => {
                let params = [("query", "*[!(_id in path('drafts.**')) && !(_type match 'system.**')]")];
                todo!()
            }
            _ => {
                let full_sanity_url = format!("{}/v2021-10-21/data/query/production", SANITY_URL);
                let params = [("query", "*[!(_type match 'system.**')]")];
                let url = Url::parse_with_params(&full_sanity_url, params).unwrap();
                let client = reqwest::Client::new();
                let sanity_res = client.get(url)
                    .header(header::AUTHORIZATION, format!("Bearer {}", env::var("SANITY_TOKEN").unwrap()))
                    .send().await.unwrap();
                Response::builder()
                    .header(header::CONTENT_TYPE, "application/json")
                    .body(sanity_res.text().await.unwrap())
                    .unwrap()
            }
        }
    }
}

#[tokio::main]
async fn main() {
    let config = Args::parse().config();
    env::set_var(WEBSITE_BASEDIR_VAR, if let Production = config.env { "website/dist/static" } else { "website/dist/dynamic" });
    env::set_var(ADDRESS_VAR, if let Local = config.env { "0.0.0.0:8080" } else { "0.0.0.0:80" });

    if let Production = config.env {
        tokio::spawn(async move {
            let scully_output = Command::new("npx").arg("scully").arg("--scanRoutes").arg("--noPrompt")
                .current_dir("website")
                .env("OUT_DIR", "./dist/static")
                .output()
                .expect("Failed to execute command 'npx scully'");

            println!("'npx scully' status: {}", scully_output.status);
            println!("'npx scully' stdout: {}", String::from_utf8_lossy(&scully_output.stdout));
            println!("'npx scully' stderr: {}", String::from_utf8_lossy(&scully_output.stderr));
        });
    }

    println!(
        "Starting TypeDB Web server on '{}' (workdir = {})...",
        env::var(ADDRESS_VAR).unwrap(),
        env::current_dir().unwrap().as_path().display(),
    );

    let server = Server::new(config).await;
    println!("Server started.");
    server.serve().await;
    println!("server stopped.");
}
