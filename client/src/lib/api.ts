import { GraphQLClient, gql } from 'graphql-request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const endpoint =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/graphql'

export const graphqlClient = new GraphQLClient(endpoint)

export type Workspace = {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export type Project = {
  id: string
  name: string
  slug: string
  workspaceId: string
  createdAt: string
  updatedAt: string
}

export type Environment = {
  id: string
  name: string
  key: string
  color: string | null
  projectId: string
}

export type MonitorState = 'HEALTHY' | 'DEGRADED' | 'DOWN'

export type Monitor = {
  id: string
  name: string
  targetUrl: string
  method: string
  expectedStatus: number
  intervalSeconds: number
  timeoutSeconds: number
  isActive: boolean
  serviceName: string
  environmentName: string
  latestState: MonitorState
  latestLatencyMs: number | null
  updatedAt: string
}

export type OverviewMetric = {
  label: string
  value: string
  detail: string
}

export type OverviewSnapshot = {
  workspaceName: string
  projectName: string
  productionMonitorCount: number
  monitors: Monitor[]
  metrics: OverviewMetric[]
}

const OVERVIEW_SNAPSHOT_QUERY = gql`
  query OverviewSnapshot($workspaceSlug: String) {
    overviewSnapshot(workspaceSlug: $workspaceSlug) {
      workspaceName
      projectName
      productionMonitorCount
      metrics {
        label
        value
        detail
      }
      monitors {
        id
        name
        targetUrl
        method
        intervalSeconds
        serviceName
        environmentName
        latestState
        latestLatencyMs
      }
    }
  }
`

const MONITORS_QUERY = gql`
  query Monitors($projectSlug: String, $environmentKey: String) {
    monitors(projectSlug: $projectSlug, environmentKey: $environmentKey) {
      id
      name
      targetUrl
      method
      expectedStatus
      intervalSeconds
      timeoutSeconds
      isActive
      serviceName
      environmentName
      latestState
      latestLatencyMs
      updatedAt
    }
  }
`

const WORKSPACES_QUERY = gql`
  query Workspaces {
    workspaces {
      id
      name
      slug
    }
  }
`

const PROJECTS_QUERY = gql`
  query Projects($workspaceSlug: String) {
    projects(workspaceSlug: $workspaceSlug) {
      id
      name
      slug
      workspaceId
    }
  }
`

export function useOverviewSnapshot(workspaceSlug?: string) {
  return useQuery({
    queryKey: ['overviewSnapshot', workspaceSlug ?? null],
    queryFn: async () => {
      const data = await graphqlClient.request<{
        overviewSnapshot: OverviewSnapshot
      }>(OVERVIEW_SNAPSHOT_QUERY, { workspaceSlug })
      return data.overviewSnapshot
    },
  })
}

export function useMonitors(projectSlug?: string, environmentKey?: string) {
  return useQuery({
    queryKey: ['monitors', projectSlug ?? null, environmentKey ?? null],
    queryFn: async () => {
      const data = await graphqlClient.request<{ monitors: Monitor[] }>(
        MONITORS_QUERY,
        { projectSlug, environmentKey },
      )
      return data.monitors
    },
  })
}

export function useWorkspaces() {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const data = await graphqlClient.request<{ workspaces: Workspace[] }>(
        WORKSPACES_QUERY,
      )
      return data.workspaces
    },
  })
}

export function useProjects(workspaceSlug?: string) {
  return useQuery({
    queryKey: ['projects', workspaceSlug ?? null],
    queryFn: async () => {
      const data = await graphqlClient.request<{ projects: Project[] }>(
        PROJECTS_QUERY,
        { workspaceSlug },
      )
      return data.projects
    },
  })
}

// --- Mutations -------------------------------------------------------------

export type CreateWorkspaceInput = {
  name: string
  slug?: string
}

export type CreateProjectInput = {
  workspaceId: string
  name: string
  slug?: string
}

export type CreateEnvironmentInput = {
  projectId: string
  name: string
  key?: string
  color?: string
}

export type CreateServiceInput = {
  projectId: string
  name: string
  slug?: string
  description?: string
}

export type CreateMonitorInput = {
  serviceId: string
  environmentId: string
  name: string
  targetUrl: string
  method?: string
  expectedStatus?: number
  expectedKeyword?: string
  intervalSeconds?: number
  timeoutSeconds?: number
}

export type UpdateMonitorInput = {
  id: string
  name?: string
  targetUrl?: string
  method?: string
  expectedStatus?: number
  expectedKeyword?: string
  intervalSeconds?: number
  timeoutSeconds?: number
  isActive?: boolean
}

const MONITOR_FIELDS = `
  id
  name
  targetUrl
  method
  expectedStatus
  intervalSeconds
  timeoutSeconds
  isActive
  serviceName
  environmentName
  latestState
  latestLatencyMs
  updatedAt
`

const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) { id name slug }
  }
`

const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) { id name slug workspaceId }
  }
`

const CREATE_ENVIRONMENT = gql`
  mutation CreateEnvironment($input: CreateEnvironmentInput!) {
    createEnvironment(input: $input) { id name key color projectId }
  }
`

const CREATE_SERVICE = gql`
  mutation CreateService($input: CreateServiceInput!) {
    createService(input: $input) { id name slug description projectId }
  }
`

const CREATE_MONITOR = gql`
  mutation CreateMonitor($input: CreateMonitorInput!) {
    createMonitor(input: $input) { ${MONITOR_FIELDS} }
  }
`

const UPDATE_MONITOR = gql`
  mutation UpdateMonitor($input: UpdateMonitorInput!) {
    updateMonitor(input: $input) { ${MONITOR_FIELDS} }
  }
`

const DELETE_MONITOR = gql`
  mutation DeleteMonitor($id: String!) {
    deleteMonitor(id: $id)
  }
`

export function useCreateWorkspace() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateWorkspaceInput) => {
      const data = await graphqlClient.request<{ createWorkspace: Workspace }>(
        CREATE_WORKSPACE,
        { input },
      )
      return data.createWorkspace
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    },
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      const data = await graphqlClient.request<{ createProject: Project }>(
        CREATE_PROJECT,
        { input },
      )
      return data.createProject
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useCreateEnvironment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateEnvironmentInput) => {
      const data = await graphqlClient.request<{
        createEnvironment: Environment
      }>(CREATE_ENVIRONMENT, { input })
      return data.createEnvironment
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['environments'] })
    },
  })
}

export function useCreateService() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateServiceInput) => {
      const data = await graphqlClient.request<{ createService: unknown }>(
        CREATE_SERVICE,
        { input },
      )
      return data.createService
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })
}

function useMonitorsRefresh() {
  const queryClient = useQueryClient()
  return () => {
    void queryClient.invalidateQueries({ queryKey: ['monitors'] })
    void queryClient.invalidateQueries({ queryKey: ['overviewSnapshot'] })
  }
}

export function useCreateMonitor() {
  const refresh = useMonitorsRefresh()
  return useMutation({
    mutationFn: async (input: CreateMonitorInput) => {
      const data = await graphqlClient.request<{ createMonitor: Monitor }>(
        CREATE_MONITOR,
        { input },
      )
      return data.createMonitor
    },
    onSuccess: refresh,
  })
}

export function useUpdateMonitor() {
  const refresh = useMonitorsRefresh()
  return useMutation({
    mutationFn: async (input: UpdateMonitorInput) => {
      const data = await graphqlClient.request<{ updateMonitor: Monitor }>(
        UPDATE_MONITOR,
        { input },
      )
      return data.updateMonitor
    },
    onSuccess: refresh,
  })
}

export function useDeleteMonitor() {
  const refresh = useMonitorsRefresh()
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlClient.request<{ deleteMonitor: boolean }>(
        DELETE_MONITOR,
        { id },
      )
      return data.deleteMonitor
    },
    onSuccess: refresh,
  })
}

// --- Deployments -----------------------------------------------------------

export type DeploymentStatus =
  | 'IN_PROGRESS'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'ROLLED_BACK'

export type Deployment = {
  id: string
  version: string
  status: DeploymentStatus
  description: string | null
  deployedBy: string | null
  deployedAt: string
  environmentName: string
  serviceName: string | null
}

export type RecordDeploymentInput = {
  environmentId: string
  serviceId?: string
  version: string
  status?: DeploymentStatus
  description?: string
  deployedBy?: string
}

const DEPLOYMENTS_QUERY = gql`
  query Deployments(
    $environmentKey: String
    $projectSlug: String
    $limit: Int
  ) {
    deployments(
      environmentKey: $environmentKey
      projectSlug: $projectSlug
      limit: $limit
    ) {
      id
      version
      status
      description
      deployedBy
      deployedAt
      environmentName
      serviceName
    }
  }
`

const RECORD_DEPLOYMENT = gql`
  mutation RecordDeployment($input: RecordDeploymentInput!) {
    recordDeployment(input: $input) {
      id
      version
      status
      environmentName
      serviceName
      deployedAt
    }
  }
`

export function useDeployments(limit?: number) {
  return useQuery({
    queryKey: ['deployments', limit ?? null],
    queryFn: async () => {
      const data = await graphqlClient.request<{ deployments: Deployment[] }>(
        DEPLOYMENTS_QUERY,
        { limit },
      )
      return data.deployments
    },
  })
}

export function useRecordDeployment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: RecordDeploymentInput) => {
      const data = await graphqlClient.request<{
        recordDeployment: Deployment
      }>(RECORD_DEPLOYMENT, { input })
      return data.recordDeployment
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['deployments'] })
    },
  })
}
