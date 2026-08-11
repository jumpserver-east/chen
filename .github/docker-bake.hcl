variable "TAG" {
  default = "dev"
}
target "ce" {
  context    = "./source"
  dockerfile = "Dockerfile"
  args = {
    VERSION = "${TAG}"
  }
  cache-from = ["type=gha,scope=chen-ce"]
  cache-to   = ["type=gha,mode=max,scope=chen-ce"]
}

target "ee" {
  context    = "./source"
  dockerfile = "Dockerfile-ee"
  args = {
    VERSION = "${TAG}"
  }
  contexts = {
    "jumpserver/chen:${TAG}-ce" = "target:ce"
  }
  tags = ["ghcr.io/jumpserver-east/chen:${TAG}"]
  labels = {
    "org.opencontainers.image.version" = "${TAG}"
    "org.jumpserver.edition"           = "ee"
  }
  cache-from = ["type=gha,scope=chen-ee"]
  cache-to   = ["type=gha,mode=max,scope=chen-ee"]
}
