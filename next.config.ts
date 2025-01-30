import type { NextConfig } from "next";
import fs from "fs";
import dotenv from "dotenv";

const env = dotenv.parse(fs.readFileSync(".env"));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: env,
};

export default nextConfig;
