import {
  TbApi,
  TbArrowsRightLeft,
  TbBrandDocker,
  TbBrandGit,
  TbBrandGithub,
  TbBrandReact,
  TbBroadcast,
  TbCode,
  TbDatabase,
  TbDeviceLaptop,
  TbPalette,
  TbServer,
  TbWindmill,
} from "react-icons/tb";

// constants.js names icons as strings so it stays pure data; this is
// the only place that turns a name into a component.
const ICONS = {
  api: TbApi,
  "arrows-right-left": TbArrowsRightLeft,
  "brand-docker": TbBrandDocker,
  "brand-git": TbBrandGit,
  "brand-github": TbBrandGithub,
  "brand-react": TbBrandReact,
  broadcast: TbBroadcast,
  code: TbCode,
  database: TbDatabase,
  "device-laptop": TbDeviceLaptop,
  palette: TbPalette,
  server: TbServer,
  windmill: TbWindmill,
};

export default ICONS;
