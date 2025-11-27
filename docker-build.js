import readline from "readline";
import { execSync } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Masukkan VITE_API_URL: ", function (url) {
  // Trim spasi dan hapus trailing slash
  url = (url || "").trim().replace(/\/+$/, "");

  // Kalau kosong, pakai default
  if (!url) {
    console.log("URL kosong, pakai default: https://api-musicspotdownloader.rohidtzz.me");
    url = "https://api-musicspotdownloader.rohidtzz.me";
  }

  console.log("Final URL:", url);

  const cmd =
    `docker build -t frontend-spotifydownloader-frontend:latest --build-arg VITE_API_URL="${url}" .`;

  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    console.error("Build gagal:", err);
  }

  rl.close();
});
