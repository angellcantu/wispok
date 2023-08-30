# Running the application

set -x;

# Check if the node_modules folder exist
DIR="./node_modules"

if [ ! -d "$DIR" ]; then
    echo "The $DIR not exist";
    echo "Installing the necessary dependencies";
    npm install
else
    echo "The project is starting";
fi

npm start

echo "Everything OK" || echo "Error while executing last command";

set -x;