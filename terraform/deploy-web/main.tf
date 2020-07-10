provider "google" {
  project = var.project
  region  = var.region
  zone    = "${var.region}-${var.zone}"
}

terraform {
  required_version = ">= 0.12"
  backend "gcs" {
    bucket  = "ecs-web-tf-state-dev"
    prefix  = "terraform/state"
  }
}

resource "google_cloud_run_service" "ecs-web" {
  name     = "malmohus-ecs-dream-x1"
  location = var.region

  template {
    spec {
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
