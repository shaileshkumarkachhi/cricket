provider "google" {
  project = var.project
  region  = var.region
  zone    = "${var.region}-${var.zone}"
}

terraform {
  required_version = ">= 0.12"
  backend "gcs" {
    bucket  = "ecs-web-malmo-tf-state-dev"
    prefix  = "terraform/state"
  }
}

resource "google_cloud_run_service" "ecs-web" {
  name     = "ecs-malmo-x1"
  location = var.region

  template {
    spec {
      service_account_name  = "241591684441-compute@developer.gserviceaccount.com"
      containers {
        image = var.image
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
