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
        MINGW* | MSYS* | CYGWIN*)
            os="windows"
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

    while [ $# -ge 1 ]; do
        case "$1" in
            -v|--version)
                VERSION="$2"
                shift
                ;;
        esac
        shift
    done

    local ext
    case "$os" in
        linux) ext="tar.gz";;
        mac) ext="zip";;
        windows) ext="zip";;
    esac

    local ver
    local item
    if [ "$VERSION" != "" ]; then
        ver="$VERSION"
        item="typedb-all-${platform}-${ver}.${ext}"
    else
        ver="latest"
        item="download"
    fi

    print_status "Installing TypeDB ${ver} for $os ($arch)..."

    # Set installation directory
    local install_dir="$HOME/.typedb"

    # Check for existing installation with data BEFORE downloading
    if [ -d "$install_dir" ]; then
        print_warning "Existing TypeDB installation found."

        # Check if there's a data directory that might contain databases
        local data_path="$install_dir/server/data"
        if [ -d "$data_path" ]; then
            local data_file_count=$(find "$data_path" -type f 2>/dev/null | wc -l)
            if [ "$data_file_count" -gt 0 ]; then
                echo
                print_error "ERROR: Existing TypeDB data directory found at:"
                echo "  $data_path"
                echo
                print_warning "This installer cannot safely upgrade an installation with existing databases."
                echo
                print_warning "To proceed safely:"
                echo "  1. Export your databases using TypeDB's export feature. Choose a path outside the TypeDB directory. If you have customized your config file, consider backing it up too."
                echo "     See: https://typedb.com/docs/maintenance-operation/database-export-import/"
                echo "  2. Stop any running TypeDB server instances"
                echo "  3. Delete the TypeDB installation directory:"
                echo "     rm -rf '$install_dir'"
                echo "  4. Run this installer again"
                echo "  5. Import your databases back using TypeDB's import feature"
                echo
                exit 1
            fi
        fi

        # No data found, safe to remove
        print_info "Removing existing installation..."
        if ! rm -rf "$install_dir"; then
            echo
            print_error "ERROR: Failed to remove existing TypeDB installation."
            print_warning "This usually means TypeDB is currently running."
            echo
            print_warning "Please stop any running TypeDB processes and try again:"
            echo "  1. Close any TypeDB server instances"
            echo "  2. Check for 'typedb' processes: ps aux | grep typedb"
            echo "  3. Run this installer again"
            echo
            exit 1
        fi
    fi

    # Create installation directory
    mkdir -p "$install_dir"

    # Construct download URL
    local download_url="https://repo.typedb.com/public/public-release/raw/names/typedb-all-${platform}/versions/${ver}/${item}"

    # Download and extract
    print_info "Downloading TypeDB..."
    if command -v curl >/dev/null 2>&1; then
        curl --fail -L "$download_url" -o "/tmp/typedb.${ext}"
    elif command -v wget >/dev/null 2>&1; then
        wget "$download_url" -O "/tmp/typedb.${ext}"
    else
        print_error "Neither curl nor wget found. Please install one of them."
        exit 1
    fi

    print_info "Extracting to $install_dir..."
    local temp_extract_dir="/tmp/typedb_extract_$$"
    mkdir -p "$temp_extract_dir"

    if [ "$os" = "windows" ]; then
      unzip "/tmp/typedb.${ext}" -d "$temp_extract_dir"
    else
      tar -xzf "/tmp/typedb.${ext}" -C "$temp_extract_dir"
    fi

    # Find the extracted folder to get version info
    local extracted_folder=$(find "$temp_extract_dir" -mindepth 1 -maxdepth 1 -type d -name "typedb-all-*" | head -n 1)
    local version_string=$(basename "$extracted_folder" | sed "s/typedb-all-${platform}-//")

    # Move contents to install directory
    mv "$extracted_folder"/* "$install_dir/"

    # Clean up
    rm -rf "$temp_extract_dir"
    rm "/tmp/typedb.${ext}"

    # Make executable
    if [ "$os" = "windows" ]; then
      chmod +x "$install_dir/typedb.bat"
    else
      chmod +x "$install_dir/typedb"
    fi

    # Add to PATH
    print_info "Adding to PATH..."

    # Determine shell config file
    local shell_config=""
    case "$SHELL" in
        *zsh*)
            shell_config="$HOME/.zshrc"
            ;;
        *bash*)
            shell_config="$HOME/.bashrc"
            ;;
        *)
            if [ -f "$HOME/.zshrc" ]; then
                shell_config="$HOME/.zshrc"
            elif [ -f "$HOME/.bashrc" ]; then
                shell_config="$HOME/.bashrc"
            elif [ -f "$HOME/.profile" ]; then
                shell_config="$HOME/.profile"
            else
                print_warning "Could not determine shell config file. Please manually add $install_dir to your PATH."
                shell_config=""
            fi
            ;;
    esac

    if [ -n "$shell_config" ]; then
        # Remove any existing TypeDB PATH entries
        sed -i.bak '/# TypeDB PATH/d' "$shell_config" 2>/dev/null || true
        sed -i.bak '\|\.typedb|d' "$shell_config" 2>/dev/null || true

        # Add new PATH entry
        echo "" >> "$shell_config"
        echo "# TypeDB PATH" >> "$shell_config"
        echo "export PATH=\"\$HOME/.typedb:\$PATH\"" >> "$shell_config"
        if [ "$os" = "windows" ]; then
          echo "alias typedb='\"\$HOME/.typedb/typedb.bat\"'" >> "$shell_config"
        fi

        print_info "Added TypeDB to PATH in $shell_config"
    fi

    echo
    print_status "TypeDB installed successfully!"
    echo
    print_info "Installation directory: $install_dir"
    print_info "Installed version: $version_string"
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

# Run installation
install_typedb $@
