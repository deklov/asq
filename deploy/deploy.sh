#!/usr/bin/env bash
# Build the image for the current commit, push it to the cluster registry and roll it out.
set -euo pipefail
export KUBECONFIG="${KUBECONFIG:-$HOME/.kube/config}"
cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain)" ]; then
  echo "Commit your changes first: the image tag names the commit." >&2
  exit 1
fi

# The tag names the last commit outside k8s/, so committing a tag change doesn't make a new image.
tag="git-$(git log -1 --format=%h --abbrev=10 -- . ':!k8s')"
image="localhost:5000/asq:$tag"

# Tags are immutable: an image already pushed for this commit is reused, never overwritten.
if curl -sf -o /dev/null -H 'Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.v2+json' \
    "http://localhost:5000/v2/asq/manifests/$tag"; then
  echo "$image is already in the cluster registry; not rebuilding"
else
  docker build -t "$image" .
  docker push -q "$image"
fi
sed -i "s/newTag: .*/newTag: $tag/" k8s/kustomization.yaml
kubectl apply -k k8s
kubectl -n asq rollout status deploy/asq
echo "Deployed $tag at http://computer.local:8082"
