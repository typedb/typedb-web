#!/bin/sh

# TypeDB Installation Script for Mac/Linux

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}$1${NC}"
}

print_info() {
    echo -e "${CYAN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

# Function to show installation messages
show_installation_messages() {
    echo
    print_status "TypeDB installed successfully!"
    echo
    print_info "Get started using the following commands:"
    echo
    echo "  View TypeDB Console CLI options:"
    echo "    typedb console --help"
    echo "  Run a local database server (you'll need to allow network access when prompted):"
    echo "    typedb server"
    echo "  Read the docs:"
    echo "    https://typedb.com/docs/home/get-started/"
    echo
}

# Detect OS and architecture
detect_platform() {
    local os=""
    local arch=""

    # Detect OS
    case "$(uname -s)" in
        Darwin)
            os="mac"
            ;;
        Linux)
            os="linux"
            ;;
        *)
            print_error "Unsupported operating system: $(uname -s)"
            exit 1
            ;;
    esac

    # Detect architecture
    case "$(uname -m)" in
        x86_64|amd64)
            arch="x86_64"
            ;;
        arm64|aarch64)
            arch="arm64"
            ;;
        *)
            print_error "Unsupported architecture: $(uname -m)"
            exit 1
            ;;
    esac

    echo "${os}-${arch}"
}

# Main installation function
install_typedb() {
    local platform=$(detect_platform)
    local os=$(echo $platform | cut -d'-' -f1)
    local arch=$(echo $platform | cut -d'-' -f2)

    print_status "Installing TypeDB for $os ($arch)..."

    # Construct download URL
    local download_url="https://repo.typedb.com/public/public-release/raw/names/typedb-all-${platform}/versions/latest/download"

    # Set installation directory
    local install_dir="$HOME/.local/typedb"

    # Create installation directory
    mkdir -p "$install_dir"

    # Download and extract
    print_info "Downloading TypeDB..."
    if command -v curl >/dev/null 2>&1; then
        curl -L "$download_url" -o "/tmp/typedb.tar.gz"
    elif command -v wget >/dev/null 2>&1; then
        wget "$download_url" -O "/tmp/typedb.tar.gz"
    else
        print_error "Neither curl nor wget found. Please install one of them."
        exit 1
    fi

    print_info "Extracting to $install_dir..."
    tar -xzf "/tmp/typedb.tar.gz" -C "$install_dir" --strip-components=1
    rm "/tmp/typedb.tar.gz"

    # Make executable
    chmod +x "$install_dir/typedb"

    # Add to PATH
    print_info "Adding to PATH..."

    # Determine shell config file
    local shell_config=""
    if [[ "$SHELL" == *"zsh"* ]] || [[ -f "$HOME/.zshrc" ]]; then
        shell_config="$HOME/.zshrc"
    elif [[ "$SHELL" == *"bash"* ]] || [[ -f "$HOME/.bashrc" ]]; then
        shell_config="$HOME/.bashrc"
    elif [[ -f "$HOME/.profile" ]]; then
        shell_config="$HOME/.profile"
    else
        print_warning "Could not determine shell config file. Please manually add $install_dir to your PATH."
        shell_config=""
    fi

    if [[ -n "$shell_config" ]]; then
        # Remove any existing TypeDB PATH entries
        sed -i.bak '/# TypeDB PATH/d' "$shell_config" 2>/dev/null || true
        sed -i.bak '\|\.typedb|d' "$shell_config" 2>/dev/null || true

        # Add new PATH entry
        echo "" >> "$shell_config"
        echo "# TypeDB PATH" >> "$shell_config"
        echo "export PATH=\"\$HOME/.typedb:\$PATH\"" >> "$shell_config"

        print_info "Added TypeDB to PATH in $shell_config"
    fi

    # Add to current session PATH
    export PATH="$install_dir:$PATH"

    show_installation_messages

    if [ -n "$shell_config" ]; then
        print_info "TypeDB has been added to your PATH for future terminal sessions."
    fi
}

# Run installation
install_typedb
