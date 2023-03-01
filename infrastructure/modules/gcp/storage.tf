resource "google_storage_bucket" "strapi_backup" {
  name = "${var.project}-strapi-backup"
  project = var.project
  location = var.region
  storage_class = "STANDARD"
  uniform_bucket_level_access = true
  public_access_prevention = "enforced"
  versioning {
    enabled = false
  }
  retention_policy {
    retention_period = 31557600 # 1 year in seconds
    is_locked = false # Prevent users accidentally deleting files, but allow us to unset the policy in case we intend to delete them
  }
}
