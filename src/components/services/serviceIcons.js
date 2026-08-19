import {
  TbCloud,
  TbDeviceLaptop,
  TbPalette,
  TbServer,
} from "react-icons/tb";

// Same pattern as skills/icons.js — constants.js names icons as
// strings so it stays pure data; this is the only place inside
// the services section that turns a name into a component.
const SERVICE_ICONS = {
  cloud: TbCloud,
  "device-laptop": TbDeviceLaptop,
  palette: TbPalette,
  server: TbServer,
};

export default SERVICE_ICONS;
