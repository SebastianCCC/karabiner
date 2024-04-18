import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // a = "applications"
    a: {
      b: app("Arc"),
      v: app("Visual Studio Code"),
      d: app("Discord"),
      l: app("Slack"),
      n: app("Notion"),
      t: app("Warp"),
      f: app("Finder"),
      s: app("Spotify"),
    },

    // r = "Raycast"
    r: {
      p: open("raycast://extensions/raycast/raycast/confetti"),
      c: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      f: open(
        "raycast://extensions/raycast/floating-notes/toggle-floating-notes-window"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
        check_for_updates_on_startup: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
