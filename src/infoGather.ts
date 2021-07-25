import axios from "axios";
import jsdom from "jsdom";

interface RustResponse {
  hostname: string;
  ip: string;
  port: string;
  map: string;
  online_state: 1 | 0;
  checked: Date;
  players_max: number;
  players_cur: number;
  players_avg: number;
  players_maxman: number;
  players_max_forever: number;
  players_max_forever_date: Date;
  bots: number;
  rating: number;
  entities: number;
  version: number;
  seed: string;
  size: string;
  uptime: number;
  fps: number;
  fps_avg: number;
  url: string;
  image: string;
  os: string;
  mem: string;
  country: string;
  country_full: string;
  server_mode: string;
  wipe_cycle: string;
}

export const formatMapUrl = (size: string, seed: string) => {
  return `https://rustmaps.com/map/${size}_${seed}`;
};
export const getMapUrl = async (
  seed: string,
  size: string
): Promise<string> => {
  const res: any = await axios.get(formatMapUrl(size, seed));
  const parsed = new jsdom.JSDOM(res.data);
  const url =
    parsed.window.document.getElementById("map-image")?.style.backgroundImage;
  if (url === undefined) {
    return "Could not find map URL.";
  }

  return url.substr(4, url.length - 5);
};

export const getServerInfo = async (): Promise<RustResponse> => {
  const data = await axios.get("https://api.rust-servers.info/info/5724");
  return data.data;
};

// getMapUrl("1601246308", "4500");
