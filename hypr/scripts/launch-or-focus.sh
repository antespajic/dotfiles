#!/bin/bash
# Save as ~/.config/hypr/scripts/launch-or-focus.sh

APP_CLASS="$1"
APP_COMMAND="$2"

# Check if the application is already running
if hyprctl clients | grep -q "class: $APP_CLASS"; then
    # Focus the existing window
    hyprctl dispatch focuswindow "class:$APP_CLASS"
else
    # Launch the application
    $APP_COMMAND &
fi
