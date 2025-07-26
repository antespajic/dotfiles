source /usr/share/cachyos-fish-config/cachyos-config.fish

if status is-interactive
    set ZELLIJ_AUTO_EXIT true
    eval (zellij setup --generate-auto-start fish | string collect)
end

set -gx EDITOR helix

fish_add_path /home/antes/.spicetify
