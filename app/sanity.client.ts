/* eslint-disable no-process-env */
import {createClient, type SanityClient} from 'src'

export function getClient(draftModeToken?: string): SanityClient {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2022-11-11',
    useCdn: false,
    // Since the process.env var doesn't have a NEXT_PUBLIC_ prefix the token will be `undefined` in the browser bundle.
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: 'published',
    studioUrl: '/studio',
    logger: console,
  })
  if (draftModeToken) {
    return client.withConfig({
      token: draftModeToken,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}
