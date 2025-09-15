find . -maxdepth 1 \( -type f -o -type d \) | wc -l | awk '{$1=$1};1'

