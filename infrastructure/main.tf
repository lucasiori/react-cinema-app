provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket  = "lucas-app-cinema-tf-states"
    key     = "app-cinema.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManageBy    = "Terraform"
    Owner       = "Lucas Iori"
  }
}