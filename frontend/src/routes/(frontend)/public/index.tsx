import { component$ } from '@builder.io/qwik'
import { MastodonStatus } from '~/types'
import * as timelines from 'wildebeest/functions/api/v1/timelines/public'
import Status from '~/components/Status'
import { loader$ } from '@builder.io/qwik-city'
import StickyHeader from '~/components/StickyHeader/StickyHeader'

export const statusesLoader = loader$<{ DATABASE: D1Database; domain: string }, Promise<MastodonStatus[]>>(
	async ({ platform }) => {
		// TODO: use the "trending" API endpoint here.
		const response = await timelines.handleRequest(platform.domain, platform.DATABASE)
		const results = await response.text()
		// Manually parse the JSON to ensure that Qwik finds the resulting objects serializable.
		return JSON.parse(results) as MastodonStatus[]
	}
)

export default component$(() => {
	const statuses = statusesLoader.use()

	return (
		<>
			<StickyHeader>
				<div class="xl:rounded-t bg-wildebeest-700 p-4 flex items-center text-white">
					<i class="fa fa-globe fa-fw mr-3" />
					<span>Federated timeline</span>
				</div>
			</StickyHeader>
			{statuses.value.map((status) => (
				<Status status={status} />
			))}
		</>
	)
})