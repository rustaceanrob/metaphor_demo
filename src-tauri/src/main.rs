// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::{header::{HeaderMap, ACCEPT, CONTENT_TYPE, HeaderValue}, Client};
use std::{error::Error, env, fs};

async fn make_request(search: &str) -> Result<String, Box<dyn Error>> {
    let url = "https://api.metaphor.systems/search";
    let api_key = fs::read_to_string("src/secret.txt")?;

    let mut headers = HeaderMap::new();
    headers.insert(ACCEPT, HeaderValue::from_static("application/json"));
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
    headers.insert("x-api-key", HeaderValue::from_str(&api_key)?);
    let params = [("query", search)];
    
    // Create a reqwest client
    let client = Client::new();

    // Perform the POST request
    let response = client.post(url)
        .headers(headers).form(&params).send().await?;

    Ok(response.text().await?)
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn request(search: &str) -> Result<String, ()> {
    let response = make_request(search).await.expect("some search error");
    Ok(response)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
