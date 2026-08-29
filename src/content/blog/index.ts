import type { BlogPost } from "@/lib/blog-types";
import kpromptKagentIntegration from "./kprompt-kagent-integration";
import kubernetesConfigmapVsSecretExplained from "./kubernetes-configmap-vs-secret-explained";
import aiRuntimeVsAiGatewayVsAgentPlatform from "./ai-runtime-vs-ai-gateway-vs-agent-platform";
import kpromptOnAzureAks from "./kprompt-on-azure-aks";
import agentgatewayAlternatives from "./agentgateway-alternatives";
import kpromptVsAgentgateway from "./kprompt-vs-agentgateway";
import kagentAlternatives from "./kagent-alternatives";
import kpromptOnAwsEks from "./kprompt-on-aws-eks";
import kpromptOnGoogleCloudGke from "./kprompt-on-google-cloud-gke";
import kubernetesLabelsAndSelectorsExplained from "./kubernetes-labels-and-selectors-explained";
import brownfieldKpromptIn15Minutes from "./brownfield-kprompt-in-15-minutes";
import kpromptMcpToolProvider from "./kprompt-mcp-tool-provider";
import kpromptHelmDeepDive from "./kprompt-helm-deep-dive";
import kpromptOpentelemetry from "./kprompt-opentelemetry";
import kpromptPrometheus from "./kprompt-prometheus";
import top100KubernetesPrompts from "./top-100-kubernetes-prompts";
import crashloopbackoffCheckoutKprompt from "./crashloopbackoff-checkout-kprompt";
import k9sVsKubernetes from "./k9s-vs-kubernetes";
import k9sAlternatives from "./k9s-alternatives";
import kubegptVsK8sgpt from "./kubegpt-vs-k8sgpt";
import kubectlAiAlternatives from "./kubectl-ai-alternatives";
import aiKubernetesPodDiagnose from "./ai-kubernetes-pod-diagnose";
import chatWithKubernetesCluster from "./chat-with-kubernetes-cluster";
import bestAiToolsKubernetesTroubleshooting from "./best-ai-tools-kubernetes-troubleshooting";
import aiRuntimeForKubernetes from "./ai-runtime-for-kubernetes";
import kpromptVsArk from "./kprompt-vs-ark";
import kpromptVsKagent from "./kprompt-vs-kagent";
import contextEngineeringNotPromptEngineering from "./context-engineering-not-prompt-engineering";
import whatIsKubernetesAi from "./what-is-kubernetes-ai";
import kubernetesImagepullbackoff from "./kubernetes-imagepullbackoff";
import kubectlVsK9s from "./kubectl-vs-k9s";
import kubernetesCrashloopbackoff from "./kubernetes-crashloopbackoff";
import observeVsInvestigate from "./observe-vs-investigate";
import observeAgentAlertFatigue from "./observe-agent-alert-fatigue";
import observeAgentKindDemo from "./observe-agent-kind-demo";
import kpromptV05ObserveAgent from "./kprompt-v0-5-observe-agent";
import introducingKprompt from "./introducing-kprompt";
import kubernetesAndAi from "./kubernetes-and-ai";
import kubernetesIntegrationsRoadmap from "./kubernetes-integrations-roadmap";
import kubernetesTroubleshootingGuide from "./kubernetes-troubleshooting-guide";
import kubernetesCiCdPlanGates from "./kubernetes-ci-cd-plan-gates";
import kubernetesLlmProvidersByok from "./kubernetes-llm-providers-byok";
import kubernetesSafetyPlanApprove from "./kubernetes-safety-plan-approve";
import kubectlAlternatives from "./kubectl-alternatives";
import kubernetesAiToolsComparison from "./kubernetes-ai-tools-comparison";
import kubernetesOomkilled from "./kubernetes-oomkilled";
import kubernetesErrorPromptPlaybook from "./kubernetes-error-prompt-playbook";
import kubernetesEdgeCasePrompts from "./kubernetes-edge-case-prompts";
import kubectlCheatSheetNaturalLanguage from "./kubectl-cheat-sheet-natural-language";
import intentCompilerNotChat from "./intent-compiler-not-chat";
import helmVsKubectlDay2 from "./helm-vs-kubectl-day-2";
import aiSreNotAiKubectl from "./ai-sre-not-ai-kubectl";
import kpromptVsKubectlAi from "./kprompt-vs-kubectl-ai";
import optimizeMyCluster from "./optimize-my-cluster";
import planresultJsonDeepDive from "./planresult-json-deep-dive";
import buildingAiSreInPublic from "./building-ai-sre-in-public";
import buildingAiSre01Why from "./building-ai-sre-01-why";
import buildingAiSre02IntentCompiler from "./building-ai-sre-02-intent-compiler";
import buildingAiSre03Planresult from "./building-ai-sre-03-planresult";
import buildingAiSre04Safety from "./building-ai-sre-04-safety";
import buildingAiSre05MultiContext from "./building-ai-sre-05-multi-context";
import buildingAiSre06InvestigationGraph from "./building-ai-sre-06-investigation-graph";
import buildingAiSre07Timeline from "./building-ai-sre-07-timeline";
import buildingAiSre08ClusterMemory from "./building-ai-sre-08-cluster-memory";
import buildingAiSre09KnowledgeGraph from "./building-ai-sre-09-knowledge-graph";
import buildingAiSre10AutonomousNotYet from "./building-ai-sre-10-autonomous-not-yet";
import whatIsAKubernetesDeployment from "./what-is-a-kubernetes-deployment";
import kubectlGetPodsExplained from "./kubectl-get-pods-explained";
import kubernetesPodsVsDeployments from "./kubernetes-pods-vs-deployments";
import whatIsAKubernetesService from "./what-is-a-kubernetes-service";
import kubernetesServiceVsDeployment from "./kubernetes-service-vs-deployment";
import kubernetesNamespacesExplained from "./kubernetes-namespaces-explained";

/** All blog posts in source order (newest-first convention in tree). */
export const BLOG_POSTS: BlogPost[] = [
  kpromptOpentelemetry,
  kpromptKagentIntegration,
  kubernetesConfigmapVsSecretExplained,
  aiRuntimeVsAiGatewayVsAgentPlatform,
  observeVsInvestigate,
  observeAgentAlertFatigue,
  kpromptOnAzureAks,
  agentgatewayAlternatives,
  kpromptVsAgentgateway,
  kagentAlternatives,
  kpromptOnAwsEks,
  kpromptOnGoogleCloudGke,
  kubernetesLabelsAndSelectorsExplained,
  brownfieldKpromptIn15Minutes,
  kpromptMcpToolProvider,
  kpromptPrometheus,
  kpromptHelmDeepDive,
  top100KubernetesPrompts,
  crashloopbackoffCheckoutKprompt,
  k9sVsKubernetes,
  k9sAlternatives,
  kubegptVsK8sgpt,
  kubectlAiAlternatives,
  aiKubernetesPodDiagnose,
  chatWithKubernetesCluster,
  bestAiToolsKubernetesTroubleshooting,
  aiRuntimeForKubernetes,
  kpromptVsArk,
  kpromptVsKagent,
  contextEngineeringNotPromptEngineering,
  whatIsKubernetesAi,
  kubernetesImagepullbackoff,
  kubectlVsK9s,
  kubernetesCrashloopbackoff,
  observeAgentKindDemo,
  kpromptV05ObserveAgent,
  introducingKprompt,
  kubernetesAndAi,
  kubernetesIntegrationsRoadmap,
  kubernetesTroubleshootingGuide,
  kubernetesCiCdPlanGates,
  kubernetesLlmProvidersByok,
  kubernetesSafetyPlanApprove,
  kubectlAlternatives,
  kubernetesAiToolsComparison,
  kubernetesOomkilled,
  kubernetesErrorPromptPlaybook,
  kubernetesEdgeCasePrompts,
  kubectlCheatSheetNaturalLanguage,
  intentCompilerNotChat,
  helmVsKubectlDay2,
  aiSreNotAiKubectl,
  kpromptVsKubectlAi,
  optimizeMyCluster,
  planresultJsonDeepDive,
  buildingAiSreInPublic,
  buildingAiSre01Why,
  buildingAiSre02IntentCompiler,
  buildingAiSre03Planresult,
  buildingAiSre04Safety,
  buildingAiSre05MultiContext,
  buildingAiSre06InvestigationGraph,
  buildingAiSre07Timeline,
  buildingAiSre08ClusterMemory,
  buildingAiSre09KnowledgeGraph,
  buildingAiSre10AutonomousNotYet,
  whatIsAKubernetesDeployment,
  kubectlGetPodsExplained,
  kubernetesPodsVsDeployments,
  whatIsAKubernetesService,
  kubernetesServiceVsDeployment,
  kubernetesNamespacesExplained,
];
