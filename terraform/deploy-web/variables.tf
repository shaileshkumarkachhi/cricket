variable "project" {
  description = "Project name"
}

variable "project-id" {
  description = "Project ID"
}

variable "region" {
  description = "Geographic region this project will run in"
}

variable "zone" {
  description = "Zone within the region this project will run in"
}

variable "image" {
  default = ""
}