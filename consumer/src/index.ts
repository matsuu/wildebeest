type Env = {}

export default {
	async queue(batch: MessageBatch, env: Env, ctx: ExecutionContext) {
		for (const message of batch.messages) {
			console.log('Received', message)
		}
	},
}
