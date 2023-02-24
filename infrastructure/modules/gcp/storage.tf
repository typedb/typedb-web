resource "google_compute_disk" "strapi_db_persistent_volume" {
  name = "typedb-web-strapi-db"
  project = var.project
  size = 20
  type = "pd-balanced"
  zone = var.zone
}

resource "google_compute_resource_policy" "daily_backup_30d_retention" {
  name = "daily-backup-30d-retention"
  description = "Take a daily application-consistent snapshot of the attached disk with a 30-day retention period"
  project = var.project
  region = var.region
  snapshot_schedule_policy {
    schedule {
      daily_schedule {
        days_in_cycle = 1
        start_time = "06:00"
      }
    }
    retention_policy {
      max_retention_days = 30
      on_source_disk_delete = "KEEP_AUTO_SNAPSHOTS"
    }
    snapshot_properties {
      storage_locations = [var.region]
    }
  }
}

resource "google_compute_disk_resource_policy_attachment" "strapi_db_daily_backup_policy" {
  disk = google_compute_disk.strapi_db_persistent_volume.name
  name = google_compute_resource_policy.daily_backup_30d_retention.name
  project = var.project
  zone = var.zone
}
