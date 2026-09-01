import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
  slug: "kubernetes-configmap-vs-secret-explained",
  title:
    "Kubernetes ConfigMap vs Secret: what beginners need to know",
  description:
    "ConfigMap vs Secret in Kubernetes: when to use each, env vars and volume mounts, kubectl get/describe, common beginner mistakes, and optional kprompt examples.",
  publishedAt: "2026-08-24",
  author: EMIRE_BARIS,
  tags: ["kubernetes", "beginner", "kubectl", "devops"],
  keywords: [
    "kubernetes configmap vs secret",
    "what is a configmap kubernetes",
    "kubernetes secret beginner",
    "mount configmap to pod",
    "kubernetes env from configmap",
    "configmap vs secret difference",
    "kubectl get configmap",
    "kubernetes beginner guide",
  ],
  blocks: [
    {
      type: "p",
      text: "You know Deployments run your app and labels connect Deployments to Services — see labels and selectors explained if you need a refresher. The next question: where does configuration live? Kubernetes stores non-sensitive settings in ConfigMaps and sensitive values in Secrets.",
      links: [
        {
          label: "labels and selectors explained",
          href: "/blog/kubernetes-labels-and-selectors-explained",
        },
      ],
    },
    {
      type: "p",
      text: "This guide explains ConfigMap vs Secret, how Pods consume them, the kubectl commands that make misconfigurations visible, and the mistakes that cause CrashLoopBackOff on startup.",
      links: [
        {
          label: "Kubernetes ConfigMap documentation",
          href: "https://kubernetes.io/docs/concepts/configuration/configmap/",
        },
      ],
    },
    {
      type: "h2",
      text: "The one-sentence version",
    },
    {
      type: "ul",
      items: [
        "ConfigMap — non-sensitive key/value config (URLs, feature flags, config files).",
        "Secret — sensitive data (passwords, tokens, TLS certs) — base64 in etcd is not encryption.",
        "Pods read both via environment variables or mounted files — wrong key names fail fast at startup.",
      ],
    },
    {
      type: "h2",
      text: "ConfigMap vs Secret (side by side)",
    },
    {
      type: "table",
      headers: ["", "ConfigMap", "Secret"],
      rows: [
        ["Use for", "App settings, JSON/YAML files, non-secret env", "Passwords, API keys, TLS material"],
        ["Kind", "v1 ConfigMap", "v1 Secret"],
        ["Data field", "data: or binaryData:", "data: (base64-encoded values)"],
        ["In logs/describe", "Values often visible", "Values hidden in kubectl get (still protect RBAC)"],
        ["Typical mistake", "Storing passwords in a ConfigMap", "Committing Secret YAML to Git in plain text"],
      ],
    },
    {
      type: "h2",
      text: "What is a ConfigMap?",
    },
    {
      type: "p",
      text: "A ConfigMap holds configuration data as key/value pairs or file contents. It does not run anything — you reference it from a Pod or Deployment template.",
    },
    {
      type: "code",
      caption: "Minimal ConfigMap YAML",
      code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
  namespace: staging
data:
  LOG_LEVEL: info
  APP_ENV: staging
  config.json: |
    {"timeoutSeconds": 30, "featureX": true}`,
    },
    {
      type: "h2",
      text: "What is a Secret?",
    },
    {
      type: "p",
      text: "A Secret stores sensitive bytes. Kubernetes encodes values as base64 in the API — that protects casual glances, not a determined attacker with etcd access. Use RBAC, external secret managers, and never paste production secrets into tickets or chat.",
    },
    {
      type: "code",
      caption: "Minimal Secret YAML (demo only — use sealed-secrets or ESO in prod)",
      code: `apiVersion: v1
kind: Secret
metadata:
  name: api-secret
  namespace: staging
type: Opaque
stringData:          # plain text on apply; API stores base64
  DB_PASSWORD: "change-me"
  API_TOKEN: "demo-token"`,
    },
    {
      type: "h2",
      text: "How Pods consume ConfigMaps and Secrets",
    },
    {
      type: "p",
      text: "Two common patterns: inject as environment variables, or mount as files under a volume. Deployments reference ConfigMap/Secret names in the Pod template — the same place you set container image and labels.",
      links: [
        {
          label: "What is a Deployment",
          href: "/blog/what-is-a-kubernetes-deployment",
        },
      ],
    },
    {
      type: "code",
      caption: "Env vars from ConfigMap and Secret",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: staging
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myapp:1.0
          env:
            - name: LOG_LEVEL
              valueFrom:
                configMapKeyRef:
                  name: api-config
                  key: LOG_LEVEL
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: api-secret
                  key: DB_PASSWORD`,
    },
    {
      type: "code",
      caption: "Mount ConfigMap as files",
      code: `          volumeMounts:
            - name: config-vol
              mountPath: /etc/app/config.json
              subPath: config.json
      volumes:
        - name: config-vol
          configMap:
            name: api-config`,
    },
    {
      type: "h2",
      text: "kubectl commands that stick",
    },
    {
      type: "code",
      caption: "Inspect ConfigMaps and Secrets",
      code: `kubectl get configmaps -n staging
kubectl describe configmap api-config -n staging

kubectl get secrets -n staging
kubectl describe secret api-secret -n staging

# See which env a Pod actually got
kubectl get pod -l app=api -n staging -o yaml | grep -A20 "env:"
kubectl exec -it deploy/api -n staging -- env | grep LOG_LEVEL`,
    },
    {
      type: "h2",
      text: "When a bad config breaks your Pod",
    },
    {
      type: "p",
      text: "Missing ConfigMap key, wrong Secret name, or a typo in configMapKeyRef.key often produces CrashLoopBackOff with a short log: file not found or required env unset. That is configuration archaeology — not a mystery bug. For the full restart loop ladder, see the CrashLoopBackOff guide.",
      links: [
        {
          label: "CrashLoopBackOff guide",
          href: "/blog/kubernetes-crashloopbackoff",
        },
        {
          label: "kubectl get pods explained",
          href: "/blog/kubectl-get-pods-explained",
        },
      ],
    },
    {
      type: "h2",
      text: "Updating config: what beginners miss",
    },
    {
      type: "ul",
      items: [
        "Changing a ConfigMap does not always restart running Pods — apps may cache old values until rollout restart",
        "kubectl apply a fixed ConfigMap then kubectl rollout restart deployment/api — common fix pattern",
        "subPath mounts do not auto-update when the ConfigMap changes — plan for restart",
        "Secrets referenced by env vars require Pod recreate to pick up new values",
      ],
    },
    {
      type: "code",
      caption: "Rollout after config change",
      code: `kubectl apply -f api-config.yaml
kubectl rollout restart deployment/api -n staging
kubectl rollout status deployment/api -n staging`,
    },
    {
      type: "h2",
      text: "Common beginner mistakes",
    },
    {
      type: "ul",
      items: [
        "Storing DB passwords in a ConfigMap because it is easier than a Secret",
        "Secret in Git with stringData in plain text — use sealed-secrets, SOPS, or a secret manager",
        "ConfigMap in namespace staging but Deployment in default — get finds nothing",
        "Wrong key name in configMapKeyRef — Pod starts, app exits immediately",
        "Assuming base64 on a Secret means encrypted at rest without etcd encryption enabled",
      ],
    },
    {
      type: "h2",
      text: "Same checks in natural language (optional)",
    },
    {
      type: "p",
      text: "kprompt can list and describe ConfigMaps and Secrets as reads. Mutations still show a plan and ask for approval on a TTY.",
      links: [
        { label: "Quickstart", href: "/docs/quickstart" },
        {
          label: "kubectl cheat sheet",
          href: "/blog/kubectl-cheat-sheet-natural-language",
        },
      ],
    },
    {
      type: "code",
      caption: "Soft kprompt examples",
      code: `kprompt "list configmaps in staging"
kprompt "describe configmap api-config in staging"
kprompt "describe secret api-secret in staging"
kprompt "describe pod for deployment api in staging"`,
    },
    {
      type: "h2",
      text: "What to learn next",
    },
    {
      type: "p",
      text: "ConfigMaps and Secrets feed your Deployment. Next, read kubectl describe explained when Pods misbehave, then resource requests and limits before you hit OOMKilled in production.",
      links: [
        {
          label: "kubectl describe explained",
          href: "/blog/kubectl-describe-explained-beginners",
        },
        {
          label: "labels and selectors explained",
          href: "/blog/kubernetes-labels-and-selectors-explained",
        },
        {
          label: "What is a Deployment",
          href: "/blog/what-is-a-kubernetes-deployment",
        },
        {
          label: "kubectl get pods explained",
          href: "/blog/kubectl-get-pods-explained",
        },
        {
          label: "Kubernetes OOMKilled guide",
          href: "/blog/kubernetes-oomkilled",
        },
        {
          label: "CrashLoopBackOff guide",
          href: "/blog/kubernetes-crashloopbackoff",
        },
      ],
    },
  ],
};

export default post;