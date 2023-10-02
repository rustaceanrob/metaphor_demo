### Hello!

For the folks at Metaphor, thank you for the interview! This is a simple desktop app that uses Metaphor as a browser. My app amounts to a simple search because I wanted to honor the time constraint, but the next feature would be an automatic query of similar pages for the top result(s). The app is built with a framework called Tauri that allows devs to write cross OS desktop apps with web frontends and Rust backends.

### src/

The source folder contains a simple React, Tailwind and Vite frontend. I threw in some animations if you would like to have a video demo! 

### src-tauri/

This is the API logic written in Rust, the hottest programming language on the block. I like Rust for a number of reason, but mostly for the killer complier and type safety. I handled the HTTPS requests with a package called `reqwests` and forward the plaintext string to the frontend. 

### Screenshots

<img width="1189" alt="Screenshot 2023-10-01 at 5 17 01 PM" src="https://github.com/rustaceanrob/metaphor_demo/assets/102320249/e5059ab3-37f9-4d45-b415-d66251f1b15b">

<img width="1194" alt="Screenshot 2023-10-01 at 5 17 23 PM" src="https://github.com/rustaceanrob/metaphor_demo/assets/102320249/f43e26da-a44b-4f10-ac60-1cfdffa5b797">

<img width="1195" alt="Screenshot 2023-10-01 at 5 14 29 PM" src="https://github.com/rustaceanrob/metaphor_demo/assets/102320249/fa1ed11c-f44e-47a1-a98b-c087503b8412">

