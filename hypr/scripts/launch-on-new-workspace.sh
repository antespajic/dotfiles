#!/usr/bin/env bash
# launch-on-new-workspace.sh
# Usage: launch-on-new-workspace.sh <app_class> <command> [args...]
#
# If the app is already running, focus its window (switching to its workspace).
# If not, open it on a new empty workspace.

APP_CLASS="$1"
shift

# Check if the application is already running
if hyprctl clients -j | jq -e --arg class "$APP_CLASS" '.[] | select(.class == $class)' > /dev/null 2>&1; then
    # Focus the existing window (Hyprland will switch to its workspace automatically)
    hyprctl dispatch focuswindow "class:$APP_CLASS"
    exit 0
fi

# Check if the current workspace is empty
current_ws="$(hyprctl activeworkspace -j | jq -r '.id')"
window_count="$(hyprctl activeworkspace -j | jq -r '.windows')"

if [[ "$window_count" == "0" ]]; then
    target="$current_ws"
else
    # Not empty — dispatch to a new empty workspace
    hyprctl dispatch 'hl.dsp.focus({ workspace = "emptyn" })'
    target="$(hyprctl activeworkspace -j | jq -r '.id')"
fi

"$@" &
pid=$!

for _ in $(seq 1 60); do
    result="$(hyprctl clients -j | jq -r --argjson pid "$pid" '.[] | select(.pid == $pid) | [.address, .workspace.id] | @tsv')"

    if [[ -n "$result" ]]; then
        read -r addr ws <<< "$result"
        if [[ "$ws" != "$target" ]]; then
            hyprctl dispatch "hl.dsp.window.move({ window = \"address:$addr\", workspace = $target })"
        fi
        hyprctl dispatch "hl.dsp.focus({ workspace = $target })"
        hyprctl dispatch focuswindow "address:$addr"
        exit 0
    fi

    sleep 0.05
done

exit 1
