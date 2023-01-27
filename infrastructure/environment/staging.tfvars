####################
# Global variables #
####################
project = "vaticle-web-dev"
region = "europe-west2"
zone = "europe-west2-a"

#####################
# Cluster variables #
#####################
num_nodes = 3
machine_type = "e2-standard-2"
auto_repair = true
auto_upgrade = true

###########################
# Configuration variables #
###########################
credentials_file = "credentials/credentials.json"
ssh_private_key_file = "credentials/ssh-key.priv"
