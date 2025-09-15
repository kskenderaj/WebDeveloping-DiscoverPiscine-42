# Check if arguments were passed
if [ $# -eq 0 ]; then
  echo "No arguments provided. Please provide folder names."
  exit 1
fi

# Loop through all arguments
for dir in "$@"; do
  # Create the new directory name by adding "ex" prefix
  new_dir="ex$dir"
  
  # Check if the directory already exists
  if [ -d "$new_dir" ]; then
    echo "Directory '$new_dir' already exists, skipping."
  else
    # Create the directory
    mkdir "$new_dir"
    echo "Directory '$new_dir' created successfully."
  fi
done

